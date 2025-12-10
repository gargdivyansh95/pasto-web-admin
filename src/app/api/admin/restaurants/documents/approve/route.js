import { NextResponse } from "next/server";
import { adminDb } from "@/firebaseAdmin";
import admin from "firebase-admin";

export async function POST(request) {
    try {
        const body = await request.json();
        const { docId, data, restaurantId, allDocsValid } = body;
        
        if (!docId || !restaurantId || allDocsValid === undefined) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }
        
        const batch = adminDb.batch();
        
        // Update document
        const docRef = adminDb.collection('restaurants_documents').doc(docId);
        batch.update(docRef, {
            ...data,
            processedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        
        // Update restaurant
        const restaurantRef = adminDb.collection('restaurants').doc(restaurantId);
        batch.update(restaurantRef, {
            documentsVerified: allDocsValid,
            isOnline: allDocsValid ? false : null,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        
        // Commit batch (atomic operation)
        await batch.commit();
        
        return NextResponse.json({
            success: true,
            message: "Document updated successfully"
        });
    } catch (error) {
        console.error("Approve Document API Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}