import { NextResponse } from "next/server";
import { adminDb } from "@/firebaseAdmin";

export async function GET(request, { params }) {
    try {
        const { id: orderId } = await params;
        
        // Validate orderId
        if (!orderId || typeof orderId !== 'string') {
            return NextResponse.json(
                { success: false, message: "Invalid order ID" },
                { status: 400 }
            );
        }
        
        // Get order document
        const orderDoc = await adminDb.collection('orders').doc(orderId).get();
        
        if (!orderDoc.exists) {
            return NextResponse.json(
                { success: false, message: "Order not found" },
                { status: 404 }
            );
        }
        
        const orderData = orderDoc.data();
        
        // Helper function to safely get reference data
        const getRefData = async (ref) => {
            if (!ref || typeof ref.get !== 'function') return null;
            try {
                const snap = await ref.get();
                return snap.exists ? { id: snap.id, ...snap.data() } : null;
            } catch (error) {
                console.warn('Failed to fetch reference:', error.message);
                return null;
            }
        };
        
        // Fetch all related data in parallel
        // const [
        //     statusData,
        // ] = await Promise.all([
        //     orderData.orderStatus?.status && typeof orderData.orderStatus.status.get === 'function'
        //         ? getRefData(orderData.orderStatus.status)
        //         : Promise.resolve(null),
        // ]);

        const statusData = orderData.orderStatus?.status?.get ? await getRefData(orderData.orderStatus.status) : null;
        
        // Process order items if they have references
        let orderItems = orderData.orderItems || [];
        if (Array.isArray(orderItems) && orderItems.length > 0) {
            orderItems = await Promise.all(
                orderItems.map(async (item) => {
                    if (item.menuItemId && typeof item.menuItemId.get === 'function') {
                        const menuItemData = await getRefData(item.menuItemId);
                        return {
                            ...item,
                            menuItem: menuItemData
                        };
                    }
                    return item;
                })
            );
        }
        
        return NextResponse.json({
            success: true,
            data: {
                orderId: orderDoc.id,
                ...orderData,
                orderStatus: statusData ? {
                    ...orderData.orderStatus,
                    status: statusData
                } : orderData.orderStatus,
                orderItems: orderItems
            }
        });
    } catch (error) {
        console.error("Get Order By ID API Error:", error);
        return NextResponse.json(
            { 
                success: false, 
                message: "Internal Server Error", 
                error: error.message 
            },
            { status: 500 }
        );
    }
}
