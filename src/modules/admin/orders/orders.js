/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { ordersActions } from "./orders.action";
import { OrderFilters, OrderTable } from "./components";
import { TableSkeleton } from "@/shared";
import { ORDER_STATUS } from "@/constants/enums";

export const Orders = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { orderStatusList } = useSelector((state) => state.orders);
    const [tabIndex, setTabIndex] = useState("customer");
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [ordersList, setOrdersList] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const excludedIdsForCustomerOrder = [ORDER_STATUS.ONGOING_ORDER, ORDER_STATUS.CANCELLED_ORDER];
    const excludedIdsForSelfOrder = [ORDER_STATUS.ONGOING_ORDER, ORDER_STATUS.CANCELLED_ORDER, ORDER_STATUS.NEW_ORDER, ORDER_STATUS.OUT_FOR_DELIVERY, ORDER_STATUS.READY_FOR_PICKUP];
    const filterStatusForCustomerOrder = orderStatusList?.filter(item => !excludedIdsForCustomerOrder.includes(item.id));
    const filterStatusForSelfOrder = orderStatusList?.filter(item => !excludedIdsForSelfOrder.includes(item.id));
    const filterStatus = tabIndex === 'customer' ? filterStatusForCustomerOrder : filterStatusForSelfOrder;
    const filterCategories = [
        {
            id: 'all',
            label: 'All Orders',
            name: 'all orders',
        },
        ...(filterStatus || []),
    ];
    const [selectedStatus, setSelectedStatus] = useState(filterCategories[0]);
    const [searchText, setSearchText] = useState('');

    const getStatusByTab = (index) => {
        if (index === 'customer') return false
        if (index === 'self') return true
        return null
    }

    const fetchOrderStatuses = () => {
        dispatch(ordersActions.fetchOrderStatuses(
            {},
            (response) => {
                if (response.success) {
                    console.log(response.data, 'response')
                }
                setLoading(false);
            },
            (error) => {
                toast.error(error.error || "Failed to fetch order statuses");
                setLoading(false);
            }
        ));
    };

    const fetchOrdersList = (isSelfOrder, statusId, lastDocId) => {
        if (!lastDocId) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }
        dispatch(ordersActions.fetchOrders(
            { isSelfOrder, statusId, lastDocId },
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
        fetchOrderStatuses();
    }, [dispatch]);

    // Load orders when tab changes
    useEffect(() => {
        // Reset state
        setOrdersList([]);
        setLastDoc(null);
        setSearchText(''); 
        setSelectedStatus(filterCategories[0]);

        // Fetch orders with default "all" status
        fetchOrdersList(getStatusByTab(tabIndex), filterCategories[0]?.id, null);
    }, [tabIndex]);

    const handleStatusChange = (value) => {
        const selected = filterCategories.find(item => item.id === value);
        setSelectedStatus(selected);

        // Reset and fetch with new status
        setOrdersList([]);
        setSearchText('');
        setLastDoc(null);
        fetchOrdersList(getStatusByTab(tabIndex), selected?.id, null);
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const filteredOrders = useMemo(() => {
        if (!searchText) return ordersList?.orders || [];
        const text = searchText.toLowerCase();
        return (ordersList?.orders || []).filter(order => {
            return (
                order?.orderId?.toLowerCase().includes(text) ||
                order?.userDetails?.name?.toLowerCase().includes(text) ||
                order?.restaurantName?.toString().includes(text) ||
                order?.userDetails?.phoneNumber?.toString().includes(text) ||
                order?.orderStatus?.status?.label?.toLowerCase().includes(text)
            );
        });
    }, [ordersList, searchText]);

    const handleLoadMore = () => {
        if (!hasMore || loadingMore) return;
        fetchOrdersList(getStatusByTab(tabIndex), selectedStatus?.id, lastDoc);
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
                <TabsContent value="customer" className="mt-3">
                    <OrderFilters
                        filterCategories={filterCategories}
                        selectedStatus={selectedStatus}
                        searchText={searchText}
                        onSearch={handleSearch}
                        onStatusChange={handleStatusChange}
                    />
                    {loading ? (
                        <TableSkeleton />
                    ) : (
                        <OrderTable
                            ordersList={filteredOrders || []}
                            isSelfOrder={false}
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
                <TabsContent value="self" className="mt-3">
                    <OrderFilters
                        filterCategories={filterCategories}
                        selectedStatus={selectedStatus}
                        searchText={searchText}
                        onSearch={handleSearch}
                        onStatusChange={handleStatusChange}
                    />
                    {loading ? (
                        <TableSkeleton />
                    ) : (
                        <OrderTable
                            ordersList={filteredOrders || []}
                            isSelfOrder={true}
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
