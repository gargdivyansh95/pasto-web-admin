"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { dashboardActions } from "./dashboard.action";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

export const Dashboard = () => {

    const dispatch = useDispatch();
    const [restaurantCounts, setRestaurantCounts] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchRestaurantCounts = () => {
        dispatch(dashboardActions.fetchRestaurantCounts(
            {},
            (response) => {
                if (response.success === true) {
                    console.log(response, 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
                    setRestaurantCounts(response.data);
                    setLoading(false);
                }
            },
            (error) => {
                toast.error(error.error || "Dashboard API failed");
                setLoading(false);
            }
        )
        );
    };

    useEffect(() => {
        fetchRestaurantCounts();
    }, [dispatch]);

    const cards = [
        { title: "Total Restaurants", value: restaurantCounts.totalCount, color: "bg-[#36B28B] text-white" },
        { title: "Pending Restaurants", value: restaurantCounts.pendingCount, color: "bg-[#B0B0E7]" },
        { title: "Approved Restaurants", value: restaurantCounts.completedCount, color: "bg-[#D0F4D8]" },
        { title: "Rejected Restaurants", value: restaurantCounts.rejectedCount, color: "bg-[#A2C7FF]" },
        { title: "Active Restaurants", value: restaurantCounts.activeCount, color: "bg-[#00C7BE] text-white" },
        { title: "Inactive Restaurants", value: restaurantCounts.inActiveCount, color: "bg-[#FF3B30] text-white" },
    ];

    return (
        <div className="flex">
            {/* SIDEBAR */}
            {/* <AppSidebar /> */}

            {/* MAIN CONTENT */}
            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-28 w-full rounded-xl" />
                        ))
                        : cards.map((item, i) => (
                            <Card
                                key={i}
                                className={`shadow-md border-none text-center text-lg py-6 ${item.color}`}
                            >
                                <CardHeader>
                                    <CardTitle>{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold">{item.value || 0}</p>
                                </CardContent>
                            </Card>
                        ))}
                </div>
            </div>
        </div>
    );
}
