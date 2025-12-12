"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate, formatTime, getOrderStatus } from "@/utilities";

export default function OrderTable({ ordersList, onClick }) {

    if (!ordersList || ordersList.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <h2 className="text-2xl font-semibold text-muted-foreground">
                    No Orders Found
                </h2>
            </div>
        );
    }

    return (
        <ScrollArea className="w-full rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-base font-semibold text-brand-orange">Order Id</TableHead>
                        <TableHead className="text-base font-semibold text-brand-orange">Order From</TableHead>
                        <TableHead className="text-base font-semibold text-brand-orange">Restaurant Name</TableHead>
                        <TableHead className="text-base font-semibold text-brand-orange">Customer Number</TableHead>
                        <TableHead className="text-base font-semibold text-brand-orange">Order Date</TableHead>
                        <TableHead className="text-base font-semibold text-brand-orange">Order Time</TableHead>
                        <TableHead className="text-base font-semibold text-brand-orange">Order Status</TableHead>
                        <TableHead className="text-base font-semibold text-brand-orange">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {ordersList.map((item, index) => {
                        const status = getOrderStatus(item?.orderStatus?.status?.id);
                        return (
                            <TableRow key={index}>
                            <TableCell>{item?.orderId}</TableCell>
                            <TableCell>{item?.userDetails?.name ? item?.userDetails?.name : ''}</TableCell>
                            <TableCell>{item?.restaurantName ? item?.restaurantName : ''}</TableCell>
                            <TableCell>{item?.userDetails?.phoneNumber ? item?.userDetails?.phoneNumber : ''}</TableCell>
                            <TableCell>{formatDate(item?.createdAt)}</TableCell>
                            <TableCell>{formatTime(item?.createdAt)}</TableCell>
                            <TableCell>
                                <p className="text-white px-2 py-1 rounded w-fit" style={{ backgroundColor: status?.color }}>{status?.title}</p>
                            </TableCell>
                            <TableCell>
                                <Button className="cursor-pointer text-white hover:text-white bg-brand-orange hover:bg-brand-orange-hover"
                                    variant="outline"
                                    onClick={() => onClick(item.orderId)}
                                >
                                    View
                                </Button>
                            </TableCell>

                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </ScrollArea>
    );
}
