"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { RestaurantTable, RestaurantTableSkeleton } from "./components";
import { restaurantsActions } from "./restaurants.action";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

export const Restaurants = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const [tabIndex, setTabIndex] = useState("pending");
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [restaurantList, setRestaurantList] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const getStatusByTab = (index) => {
        if (index === 'pending') return null
        if (index === 'approved') return true
        if (index === 'rejected') return false
        return null
    }

    const fetchRestaurantList = (status, lastDocId) => {
        dispatch(restaurantsActions.fetchRestaurants(
            {status, lastDocId},
            (response) => {
                if (response.success === true) {
                    setRestaurantList(prev => {
                    const newRestaurants = response.data?.restaurants || [];
                    return lastDocId
                        ? {
                            restaurants: [...(prev.restaurants || []), ...newRestaurants],
                            // hasMore: response.data?.hasMore
                        }
                        : {
                            restaurants: newRestaurants,
                            // hasMore: response.data?.hasMore
                        };
                });
                    setHasMore(response.data?.hasMore);
                    setLastDoc(response.data?.lastVisible);
                    setLoading(false);
                    setLoadingMore(false);
                }
            },
            (error) => {
                toast.error(error.error || "Fetch Restaurants API failed");
                setLoading(false);
                setLoadingMore(false);
            }
        )
        );
    };

    useEffect(() => {
        fetchRestaurantList(getStatusByTab(tabIndex), null);
    }, [dispatch, tabIndex]);

    const handleLoadMore = () => {
        if (!hasMore) return;
        setLoadingMore(true);
        fetchRestaurantList(getStatusByTab(tabIndex), lastDoc);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 mt-2">Restaurants</h1>
            <Tabs value={tabIndex} onValueChange={setTabIndex} className="w-full">
                <TabsList className="flex justify-center gap-6 h-12">
                    <TabsTrigger className="data-[state=active]:bg-brand-green data-[state=active]:text-white text-base cursor-pointer" value="pending">Pending Restaurants</TabsTrigger>
                    <TabsTrigger className="data-[state=active]:bg-brand-green data-[state=active]:text-white text-base cursor-pointer" value="approved">Approved Restaurants</TabsTrigger>
                    <TabsTrigger className="data-[state=active]:bg-brand-green data-[state=active]:text-white text-base cursor-pointer" value="rejected">Rejected Restaurants</TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="mt-5">
                    {loading ? (
                        <RestaurantTableSkeleton />
                    ) : (
                        <RestaurantTable restaurantList={restaurantList?.restaurants || []} />
                    )}
                    {!loading && hasMore && (
                        <div className="flex justify-center mt-6">
                            <Button
                                className="px-4 py-2 bg-brand-green text-white rounded hover:bg-brand-green-hover cursor-pointer"
                                onClick={handleLoadMore}
                            >
                                {loadingMore ? "Loading..." : "Load More"}
                            </Button>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="approved" className="mt-5">
                    {loading ? (
                        <RestaurantTableSkeleton />
                    ) : (
                        <RestaurantTable restaurantList={restaurantList?.restaurants || []} />
                    )}
                    {!loading && hasMore && (
                        <div className="flex justify-center mt-6">
                            <Button
                                className="px-4 py-2 bg-brand-green text-white rounded hover:bg-brand-green-hover cursor-pointer"
                                onClick={handleLoadMore}
                            >
                                {loadingMore ? "Loading..." : "Load More"}
                            </Button>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="rejected" className="mt-5">
                    {loading ? (
                        <RestaurantTableSkeleton />
                    ) : (
                        <RestaurantTable restaurantList={restaurantList?.restaurants || []} />
                    )}
                    {!loading && hasMore && (
                        <div className="flex justify-center mt-6">
                            <Button
                                className="px-4 py-2 bg-brand-green text-white rounded hover:bg-brand-green-hover cursor-pointer"
                                onClick={handleLoadMore}
                            >
                                {loadingMore ? "Loading..." : "Load More"}
                            </Button>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
