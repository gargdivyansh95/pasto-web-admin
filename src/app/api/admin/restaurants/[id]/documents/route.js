import { NextResponse } from "next/server";
import { adminDb } from "@/firebaseAdmin";

export async function GET(request, { params }) {
    try {
        const { id: restaurantId } = await params;
        
        const querySnapshot = await adminDb.collection('restaurants_documents')
            .where('restaurantId', '==', restaurantId)
            .get();
        
        if (querySnapshot.empty) {
            return NextResponse.json({
                success: true,
                data: []
            });
        }
        
        const documents = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        return NextResponse.json({
            success: true,
            data: documents
        });
    } catch (error) {
        console.error("Get Restaurant Documents API Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}