"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { ordersActions } from "./orders.action";
import { OrderTable } from "./components";
import { TableSkeleton } from "@/shared";

export const Orders = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const [tabIndex, setTabIndex] = useState("customer");
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [ordersList, setOrdersList] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const getStatusByTab = (index) => {
        if (index === 'customer') return false
        if (index === 'self') return true
        return null
    }

    const fetchOrdersList = (status, lastDocId) => {
        dispatch(ordersActions.fetchOrders(
            {status, lastDocId},
            (response) => {
                if (response.success === true) {
                    setOrdersList(prev => {
                    const newOrders = response.data?.orders || [];
                    return lastDocId
                        ? {
                            orders: [...(prev.orders || []), ...newOrders],
                        }
                        : {
                            orders: newOrders,
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
        fetchOrdersList(getStatusByTab(tabIndex), null);
    }, [dispatch, tabIndex]);

    const handleLoadMore = () => {
        if (!hasMore) return;
        setLoadingMore(true);
        fetchOrdersList(getStatusByTab(tabIndex), lastDoc);
    };

    const handleView = (orderId) => {
        router.push(`/admin/orders/order-details/${orderId}`);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 mt-2">Orders</h1>
            <Tabs value={tabIndex} onValueChange={setTabIndex} className="w-full">
                <TabsList className="flex justify-center gap-6 h-12">
                    <TabsTrigger className="data-[state=active]:bg-brand-green data-[state=active]:text-white text-base cursor-pointer" value="customer">Customer Orders</TabsTrigger>
                    <TabsTrigger className="data-[state=active]:bg-brand-green data-[state=active]:text-white text-base cursor-pointer" value="self">Restaurants Self Orders</TabsTrigger>
                </TabsList>
                <TabsContent value="customer" className="mt-5">
                    {loading ? (
                        <TableSkeleton />
                    ) : (
                        <OrderTable
                            ordersList={ordersList?.orders || []}
                            onClick={handleView}
                        />
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
                <TabsContent value="self" className="mt-5">
                    {loading ? (
                        <TableSkeleton />
                    ) : (
                        <OrderTable
                            ordersList={ordersList?.orders || []}
                            onClick={handleView}
                        />
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
