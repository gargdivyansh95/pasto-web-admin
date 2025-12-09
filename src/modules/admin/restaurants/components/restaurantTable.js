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

export default function RestaurantTable({ restaurantList }) {

    const getAddress = (data) => {
        return `${data?.address}, ${data?.area}, ${data?.city}, ${data?.state}, ${data?.pincode}`;
    };

    if (!restaurantList || restaurantList.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <h2 className="text-2xl font-semibold text-muted-foreground">
                    No Restaurants Found
                </h2>
            </div>
        );
    }

    return (
        <ScrollArea className="w-full rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Owner Name</TableHead>
                        <TableHead>Restaurant Name</TableHead>
                        <TableHead>Primary Number</TableHead>
                        <TableHead>Secondary Number</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Onboarding Status</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {restaurantList.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item?.ownerName}</TableCell>

                            <TableCell>{item?.restaurantName}</TableCell>

                            <TableCell>{item?.user?.phoneNumber}</TableCell>

                            <TableCell>
                                {item?.contactNumbers?.length > 0
                                    ? item.contactNumbers.map((n) => n.number).join(", ")
                                    : "N/A"}
                            </TableCell>

                            <TableCell>{getAddress(item?.addressDetails)}</TableCell>

                            <TableCell>
                                {item?.user?.achievement === 2
                                    ? "Restaurant Menu Pending"
                                    : "Completed"}
                            </TableCell>

                            {/* STATUS BUTTON */}
                            <TableCell>
                                <Button
                                    variant={item?.status === "ACTIVE" ? "default" : "destructive"}
                                //   onClick={() =>
                                //     handleActive(
                                //       item.restaurantId,
                                //       item?.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                                //     )
                                //   }
                                >
                                    {item?.status}
                                </Button>
                            </TableCell>

                            {/* VERIFY BUTTON */}
                            <TableCell>
                                <Button
                                    variant="outline"
                                    disabled={item?.user?.achievement !== 3}
                                //   onClick={() => handleVerify(item.restaurantId)}
                                >
                                    Verify
                                </Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );
}
