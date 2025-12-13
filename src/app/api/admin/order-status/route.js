import { NextResponse } from "next/server";
import { adminDb } from "@/firebaseAdmin";

export async function GET(request) {
    try {
        // Get all order statuses - sorted by label
        const querySnapshot = await adminDb.collection('order_status')
            .orderBy('label', 'asc')
            .get();
        
        if (querySnapshot.empty) {
            return NextResponse.json({
                success: true,
                data: []
            });
        }
        
        // Map documents to array
        const statuses = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        return NextResponse.json({
            success: true,
            data: statuses
        });
    } catch (error) {
        console.error("Get Order Statuses API Error:", error);
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