// app/api/admin/orders/route.js
import { NextResponse } from "next/server";
import { adminDb } from "@/firebaseAdmin";
import { PAGESIZE } from "@/constants/constants";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const isSelfOrder = searchParams.get('isSelfOrder'); // true, false, or null
        const isSelfPickup = searchParams.get('isSelfPickup'); // true, false, or null
        const isPaid = searchParams.get('isPaid'); // true, false, or null
        const lastDocId = searchParams.get('lastDocId');
        const pageSize = parseInt(searchParams.get('pageSize') || PAGESIZE);

        const ordersRef = adminDb.collection('orders');
        
        // Base query - start with collection
        let baseQuery = ordersRef;
        
        // Apply filters if provided
        if (isSelfOrder !== null && isSelfOrder !== undefined && isSelfOrder !== 'all') {
            const isSelfOrderBool = isSelfOrder === 'true';
            baseQuery = baseQuery.where('isSelfOrder', '==', isSelfOrderBool);
        }
        
        if (isSelfPickup !== null && isSelfPickup !== undefined && isSelfPickup !== 'all') {
            const isSelfPickupBool = isSelfPickup === 'true';
            baseQuery = baseQuery.where('isSelfPickup', '==', isSelfPickupBool);
        }
        
        if (isPaid !== null && isPaid !== undefined && isPaid !== 'all') {
            const isPaidBool = isPaid === 'true';
            baseQuery = baseQuery.where('isPaid', '==', isPaidBool);
        }
        
        // Get total count (parallel)
        const countPromise = baseQuery.count().get();
        
        // Build paginated query with ordering
        let dataQuery = baseQuery.orderBy('createdAt', 'desc').limit(pageSize);
        
        if (lastDocId) {
            const lastDocRef = await ordersRef.doc(lastDocId).get();
            if (lastDocRef.exists) {
                dataQuery = baseQuery
                    .orderBy('createdAt', 'desc')
                    .startAfter(lastDocRef)
                    .limit(pageSize);
            }
        }
        
        // Execute both queries in parallel
        const [countSnapshot, querySnapshot] = await Promise.all([
            countPromise,
            dataQuery.get()
        ]);
        
        const totalCount = countSnapshot.data().count;
        
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
        
        // Get orders with related data (parallel processing)
        const orders = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
                const orderData = doc.data();
                
                // Fetch order status reference if it exists
                let statusData = null;
                if (orderData.orderStatus?.status && typeof orderData.orderStatus.status.get === 'function') {
                    statusData = await getRefData(orderData.orderStatus.status);
                }
                
                // Fetch payment mode reference if it exists
                // let paymentModeData = null;
                // if (orderData.paymentMode?.paymentMode && typeof orderData.paymentMode.paymentMode.get === 'function') {
                //     paymentModeData = await getRefData(orderData.paymentMode.paymentMode);
                // }
                
                // Build order object
                const order = {
                    orderId: doc.id,
                    ...orderData,
                };
                
                // Update orderStatus with resolved data
                if (statusData) {
                    order.orderStatus = {
                        ...orderData.orderStatus,
                        status: statusData
                    };
                }
                
                // Update paymentMode with resolved data
                // if (paymentModeData) {
                //     order.paymentMode = {
                //         ...orderData.paymentMode,
                //         paymentMode: paymentModeData
                //     };
                // }
                
                return order;
            })
        );
        
        const lastVisible = querySnapshot.docs.length > 0 
            ? querySnapshot.docs[querySnapshot.docs.length - 1].id 
            : null;
        
        return NextResponse.json({
            success: true,
            data: {
                orders,
                lastVisible,
                totalCount,
                hasMore: querySnapshot.docs.length === pageSize
            }
        });
    } catch (error) {
        console.error("Get Orders API Error:", error);
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


// ==========================================
// GET ORDER BY ID
// app/api/admin/orders/[id]/route.js
// ==========================================

// import { NextResponse } from "next/server";
// import { adminDb } from "@/firebaseAdmin";

// export async function GET(request, { params }) {
//     try {
//         const { id: orderId } = await params;
        
//         // Validate orderId
//         if (!orderId || typeof orderId !== 'string') {
//             return NextResponse.json(
//                 { success: false, message: "Invalid order ID" },
//                 { status: 400 }
//             );
//         }
        
//         // Get order document
//         const orderDoc = await adminDb.collection('orders').doc(orderId).get();
        
//         if (!orderDoc.exists) {
//             return NextResponse.json(
//                 { success: false, message: "Order not found" },
//                 { status: 404 }
//             );
//         }
        
//         const orderData = orderDoc.data();
        
//         // Helper function to safely get reference data
//         const getRefData = async (ref) => {
//             if (!ref || typeof ref.get !== 'function') return null;
//             try {
//                 const snap = await ref.get();
//                 return snap.exists ? { id: snap.id, ...snap.data() } : null;
//             } catch (error) {
//                 console.warn('Failed to fetch reference:', error.message);
//                 return null;
//             }
//         };
        
//         // Fetch all related data in parallel
//         const [
//             restaurantData,
//             userData,
//             statusData,
//             addressData
//         ] = await Promise.all([
//             // Restaurant data
//             orderData.restaurantId && typeof orderData.restaurantId.get === 'function'
//                 ? getRefData(orderData.restaurantId)
//                 : Promise.resolve(null),
            
//             // User data
//             orderData.userId && typeof orderData.userId.get === 'function'
//                 ? getRefData(orderData.userId)
//                 : Promise.resolve(null),
            
//             // Order status
//             orderData.orderStatus?.status && typeof orderData.orderStatus.status.get === 'function'
//                 ? getRefData(orderData.orderStatus.status)
//                 : Promise.resolve(null),
            
//             // Delivery address
//             orderData.deliveryAddress && typeof orderData.deliveryAddress.get === 'function'
//                 ? getRefData(orderData.deliveryAddress)
//                 : Promise.resolve(null),
//         ]);
        
//         // Process order items if they have references
//         let orderItems = orderData.orderItems || [];
//         if (Array.isArray(orderItems) && orderItems.length > 0) {
//             orderItems = await Promise.all(
//                 orderItems.map(async (item) => {
//                     if (item.menuItemId && typeof item.menuItemId.get === 'function') {
//                         const menuItemData = await getRefData(item.menuItemId);
//                         return {
//                             ...item,
//                             menuItem: menuItemData
//                         };
//                     }
//                     return item;
//                 })
//             );
//         }
        
//         return NextResponse.json({
//             success: true,
//             data: {
//                 orderId: orderDoc.id,
//                 ...orderData,
//                 restaurant: restaurantData,
//                 user: userData,
//                 orderStatus: statusData ? {
//                     ...orderData.orderStatus,
//                     status: statusData
//                 } : orderData.orderStatus,
//                 deliveryAddress: addressData,
//                 orderItems: orderItems
//             }
//         });
//     } catch (error) {
//         console.error("Get Order By ID API Error:", error);
//         return NextResponse.json(
//             { 
//                 success: false, 
//                 message: "Internal Server Error", 
//                 error: error.message 
//             },
//             { status: 500 }
//         );
//     }
// }


// ==========================================
// UPDATE ORDER STATUS
// app/api/admin/orders/[id]/status/route.js
// ==========================================

// import { NextResponse } from "next/server";
// import { adminDb } from "@/firebaseAdmin";
// import admin from "firebase-admin";

// export async function PATCH(request, { params }) {
//     try {
//         const { id: orderId } = await params;
//         const body = await request.json();
//         const { status, statusRef } = body;
        
//         if (!orderId) {
//             return NextResponse.json(
//                 { success: false, message: "Order ID is required" },
//                 { status: 400 }
//             );
//         }
        
//         if (!status && !statusRef) {
//             return NextResponse.json(
//                 { success: false, message: "Status or statusRef is required" },
//                 { status: 400 }
//             );
//         }
        
//         const updateData = {
//             updatedAt: admin.firestore.FieldValue.serverTimestamp()
//         };
        
//         // If status string is provided
//         if (status) {
//             updateData.status = status;
//         }
        
//         // If status reference is provided (for orderStatus.status)
//         if (statusRef) {
//             updateData['orderStatus.status'] = adminDb.doc(statusRef);
//             updateData['orderStatus.updatedAt'] = admin.firestore.FieldValue.serverTimestamp();
//         }
        
//         await adminDb.collection('orders').doc(orderId).update(updateData);
        
//         return NextResponse.json({
//             success: true,
//             message: "Order status updated successfully"
//         });
//     } catch (error) {
//         console.error("Update Order Status API Error:", error);
//         return NextResponse.json(
//             { 
//                 success: false, 
//                 message: "Internal Server Error", 
//                 error: error.message 
//             },
//             { status: 500 }
//         );
//     }
// }