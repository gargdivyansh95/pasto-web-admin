"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import NoImage from "../../../assets/images/no-image.jpg";
import VegIcon from "../../../assets/images/veg.svg";
import NonVegIcon from "../../../assets/images/non-veg.svg";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { ordersActions } from "./orders.action";
import { DetailCard } from "../restaurants/components";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { formatDate, formatTime, getOrderStatus } from "@/utilities";
import { Badge } from "@/components/ui/badge";

export const OrderDetails = ({ orderId }) => {

    const dispatch = useDispatch();
    const [orderDetails, setOrderDetails] = useState({});

    const fetchRestaurantById = () => {
        dispatch(ordersActions.fetchOrderById(
            { orderId },
            (response) => {
                if (response.success === true) {
                    console.log(response)
                    setOrderDetails(response.data);
                }
            },
            (error) => {
                toast.error(error.error || "Fetch Order Details API failed");
            }
        )
        );
    };

    useEffect(() => {
        fetchRestaurantById();
    }, [dispatch]);

    const getAddress = (add) => {
        return `${add?.address}, ${add?.area}, ${add?.city}, ${add?.state}, ${add?.pincode}`;
    }

    const status = getOrderStatus(orderDetails?.orderStatus?.status?.id);

    return (
        <form>
            <h1 className="text-3xl font-bold mb-6 mt-2">Order Details</h1>
            <div className="grid grid-cols-12 gap-10 mb-8">
                <div className="col-span-6">
                    <Card className="mt-0 py-4 px-4 gap-4 relative">
                        <Badge className={`text-white text-sm font-medium absolute top-0 right-0 rounded-none rounded-tr-xl rounded-bl-xl bg-brand-green`}>
                            {orderDetails?.isSelfOrder ? "Self Order" : "Order By Customer"}
                        </Badge>
                        {orderDetails?.isSelfOrder ?
                            <Badge className={`text-white text-sm font-medium absolute top-0 left-0 rounded-none rounded-tl-xl rounded-br-xl ${orderDetails?.isPaid ? "bg-[#34C759]" : "bg-brand-red"}`}>
                                {orderDetails?.isPaid ? "Paid" : "Not Paid"}
                            </Badge>
                            :
                            <Badge className={`text-white text-sm font-medium absolute top-0 left-0 rounded-none rounded-tl-xl rounded-br-xl ${orderDetails?.isSelfPickup ? "bg-[#00C7BE]" : "bg-[#34C759]"}`}>
                                {orderDetails?.isSelfPickup ? 'Self Pickup Order' : 'Door Step Order'}
                            </Badge>
                        }
                        <CardHeader className="px-0 gap-0 pt-6">
                            <CardTitle className="text-xl font-bold">Order Item Details</CardTitle>
                        </CardHeader>
                        <CardContent className="px-0">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <h1 className="text-base font-medium">Order Id:</h1>
                                    <h1 className="text-base font-semibold text-brand-orange">{orderDetails?.orderId}</h1>
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <h1 className="text-base font-medium">Order Status:</h1>
                                    <Badge className={`text-white text-sm font-medium rounded`} style={{ backgroundColor: status?.color }}>
                                        {status?.title}
                                    </Badge>
                                    {/* <h1 className="text-white px-2 py-1 text-sm font-medium rounded " style={{ backgroundColor: status?.color }}>{status?.title}</h1> */}
                                </div>
                            </div>
                            {!orderDetails?.restaurantName ? (
                                <div className="space-y-4">
                                    {
                                        Array.from({ length: 6 }).map((_, i) => (
                                            <Skeleton key={i} className="h-8 w-100" />
                                        ))
                                    }
                                </div>
                            ) : (
                                <>
                                    {orderDetails?.orderItems?.map((item, index) => {
                                        return (
                                            <div key={index} className="border p-3 rounded-md mb-4">
                                                <div className="flex items-center gap-4">
                                                    <Image src={item?.itemImage || NoImage} width={140} height={140} alt="Restaurant" className="rounded-md border" />
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <Image src={item?.isVeg ? VegIcon : NonVegIcon} width={16} height={16} alt="logo" />
                                                            <h1 className={`text-base font-semibold ${item?.isVeg ? "text-brand-green" : "text-brand-red"}`}>
                                                                {item?.isVeg ? "Veg" : "Non Veg"}
                                                            </h1>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <h1 className="text-base font-medium">Item Name:</h1>
                                                            <h1 className="text-base font-semibold text-brand-orange">{item?.itemName}</h1>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <h1 className="text-base font-medium">Item Description:</h1>
                                                            <h1 className="text-base font-semibold text-brand-orange">{item?.itemDescription}</h1>
                                                        </div>
                                                        {!orderDetails?.isSelfOrder &&
                                                            <div className="flex items-center gap-2">
                                                                <h1 className="text-base font-medium">Self Pickup:</h1>
                                                                <h1 className="text-base font-semibold text-brand-orange">{orderDetails?.isSelfPickup ? "Yes" : "No"}</h1>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <ScrollArea className="w-full rounded-md border mt-3">
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead className="text-base font-semibold text-brand-green">Option Size</TableHead>
                                                                <TableHead className="text-base font-semibold text-brand-green">Quantity</TableHead>
                                                                <TableHead className="text-base font-semibold text-brand-green">Per Qty Price</TableHead>
                                                                <TableHead className="text-base font-semibold text-brand-green">Total Price</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {item?.optionSize?.map((ele, idx) => {
                                                                return (
                                                                    <TableRow key={idx}>
                                                                        <TableCell className="text-base font-medium text-dark">{ele?.label}</TableCell>
                                                                        <TableCell className="text-base font-medium text-dark">{ele?.quantity}</TableCell>
                                                                        <TableCell className="text-base font-medium text-dark">₹{ele?.price}</TableCell>
                                                                        <TableCell className="text-base font-medium text-dark">₹{ele?.totalPrice}</TableCell>
                                                                    </TableRow>
                                                                )
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                </ScrollArea>
                                            </div>
                                        )
                                    })}
                                    <DetailCard label="Cooking Instructions" value={orderDetails?.cookingInstructions ? orderDetails?.cookingInstructions : "N/A"} />
                                    <DetailCard label="Total Amount" value={`₹${orderDetails?.totalAmount}`} />
                                    <div className="mt-6">
                                        <h1 className="text-base font-semibold">Order Status Timeline</h1>
                                        <DetailCard label="Order Date" value={formatDate(orderDetails?.createdAt)} />
                                        <DetailCard label="Accepted At" value={formatTime(orderDetails?.orderStatus?.acceptedAt)} />
                                        <DetailCard
                                            label={orderDetails?.isSelfPickup || orderDetails?.isSelfOrder ? "Ready For Pickup At" : "Out for Delivery At"}
                                            value={orderDetails?.isSelfPickup || orderDetails?.isSelfOrder ? formatTime(orderDetails?.orderStatus?.readyForPickupAt) : formatTime(orderDetails?.orderStatus?.outForDeliveryAt)}
                                        />
                                        <DetailCard label="Delivered At" value={formatTime(orderDetails?.orderStatus?.deliveredAt)} />
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-6">
                    <Card className="mt-0 py-4 px-4 gap-4">
                        <CardHeader className="px-0 gap-0">
                            <CardTitle className="text-xl font-bold">Restaurant & Customer Details</CardTitle>
                        </CardHeader>
                        <CardContent className="px-0">
                            {!orderDetails?.restaurantName ? (
                                <div className="space-y-4">
                                    <Skeleton className="h-36 w-36 rounded-md" />
                                    {
                                        Array.from({ length: 6 }).map((_, i) => (
                                            <Skeleton key={i} className="h-8 w-100" />
                                        ))
                                    }
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-4">
                                        <Image src={orderDetails?.restaurantLogo || NoImage} width={140} height={140} alt="Restaurant" className="rounded-md border" />
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <h1 className="text-base font-medium">Restaurant Id:</h1>
                                                <h1 className="text-base font-semibold text-brand-orange">{orderDetails?.restaurantId}</h1>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h1 className="text-base font-medium">Restaurant Name:</h1>
                                                <h1 className="text-base font-semibold text-brand-orange">{orderDetails?.restaurantName}</h1>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h1 className="text-base font-medium">Restaurant Contact Number:</h1>
                                                <h1 className="text-base font-semibold text-brand-orange">{orderDetails?.restaurantNumber}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <DetailCard label="Restaurant Address" value={getAddress(orderDetails?.restaurantAddress)} />
                                    <DetailCard label="Customer Name" value={orderDetails?.userDetails?.name ? orderDetails?.userDetails?.name : "N/A"} />
                                    <DetailCard label="Customer Contact Number" value={orderDetails?.userDetails?.phoneNumber ? orderDetails?.userDetails?.phoneNumber : "N/A"} />
                                    <DetailCard label="Customer Address" value={orderDetails?.deliveryAddress ? orderDetails?.deliveryAddress : "N/A"} />
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
