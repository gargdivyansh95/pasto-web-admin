import { NextResponse } from "next/server";
import { adminDb } from "@/firebaseAdmin";

export async function GET(request) {
    try {
        const baseCollection = adminDb.collection("restaurants");

        const [pendingAgg, completedAgg, rejectedAgg, activeAgg, inactiveAgg] =
            await Promise.all([
                baseCollection.where("documentsVerified", "==", null).count().get(),
                baseCollection.where("documentsVerified", "==", true).count().get(),
                baseCollection.where("documentsVerified", "==", false).count().get(),
                baseCollection.where("status", "==", "ACTIVE").count().get(),
                baseCollection.where("status", "==", "INACTIVE").count().get()
            ]);

        const pendingCount = pendingAgg.data().count;
        const completedCount = completedAgg.data().count;
        const rejectedCount = rejectedAgg.data().count;
        const activeCount = activeAgg.data().count;
        const inActiveCount = inactiveAgg.data().count;
        const totalCount = pendingCount + completedCount + rejectedCount;

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
        console.error("Dashboard Count API Error:", error);
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