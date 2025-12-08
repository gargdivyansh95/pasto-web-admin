import { NextResponse } from "next/server";
import {
    collection,
    query,
    where,
    getCountFromServer
} from "firebase/firestore";
import { adminDb } from "@/firebaseAdmin";

export async function GET(request) {
    try {
        const baseCollection = adminDb.collection("restaurants");

        // Pending
        const pendingAgg = await baseCollection
            .where("documentsVerified", "==", null)
            .count()
            .get();
        const pendingCount = pendingAgg.data().count;

        // Completed
        const completedAgg = await baseCollection
            .where("documentsVerified", "==", true)
            .count()
            .get();
        const completedCount = completedAgg.data().count;

        // Rejected
        const rejectedAgg = await baseCollection
            .where("documentsVerified", "==", false)
            .count()
            .get();
        const rejectedCount = rejectedAgg.data().count;

        const totalCount = pendingCount + completedCount + rejectedCount;

        // ACTIVE
        const activeAgg = await baseCollection
            .where("status", "==", "ACTIVE")
            .count()
            .get();
        const activeCount = activeAgg.data().count;

        // INACTIVE
        const inactiveAgg = await baseCollection
            .where("status", "==", "INACTIVE")
            .count()
            .get();
        const inActiveCount = inactiveAgg.data().count;

        return NextResponse.json(
            {
                success: true,
                data: {
                    totalCount,
                    pendingCount,
                    completedCount,
                    rejectedCount,
                    activeCount,
                    inActiveCount,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Dashboard API Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
