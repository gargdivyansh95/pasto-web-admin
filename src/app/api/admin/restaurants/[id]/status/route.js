import { NextResponse } from "next/server";
import { adminDb } from "@/firebaseAdmin";
import admin from "firebase-admin";

export async function PATCH(request, { params }) {
    try {
        const { id: restaurantId } = await params;
        const body = await request.json();
        const { status } = body;
        
        if (!status || !['ACTIVE', 'INACTIVE'].includes(status)) {
            return NextResponse.json(
                { success: false, message: "Invalid status. Must be ACTIVE or INACTIVE" },
                { status: 400 }
            );
        }
        
        await adminDb.collection('restaurants').doc(restaurantId).update({
            status: status,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        
        return NextResponse.json({
            success: true,
            message: `Restaurant status changed to ${status} successfully`
        });
    } catch (error) {
        console.error("Change Status API Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}