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

export default function RestaurantTable({ restaurantList, isPending, handleVerify }) {

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
                        <TableHead className="text-base font-semibold text-brand-orange">Owner Name</TableHead>
                        <TableHead className="text-base font-semibold text-brand-orange">Restaurant Name</TableHead>
                        <TableHead className="text-base font-semibold text-brand-orange">Primary Number</TableHead>
                        <TableHead className="text-base font-semibold text-brand-orange">Secondary Number</TableHead>
                        <TableHead className="text-base font-semibold text-brand-orange">Address</TableHead>
                        <TableHead className="text-base font-semibold text-brand-orange">Onboarding Status</TableHead>
                        <TableHead className="text-base font-semibold text-brand-orange">Status</TableHead>
                        <TableHead className="text-base font-semibold text-brand-orange">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {restaurantList.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item?.ownerName}</TableCell>
                            <TableCell>{item?.restaurantName}</TableCell>
                            <TableCell>{item?.user?.phoneNumber}</TableCell>
                            <TableCell>
                                {item?.contactNumbers?.length > 0 ? item.contactNumbers.map((n) => n.number).join(", ") : "N/A"}
                            </TableCell>
                            <TableCell>{getAddress(item?.addressDetails)}</TableCell>
                            <TableCell>
                                {item?.user?.achievement === 2 ? "Restaurant Menu Pending" : "Completed"}
                            </TableCell>
                            <TableCell>
                                <Button className={`text-white cursor-pointer ${item?.status === "ACTIVE" ? "bg-brand-green hover:bg-brand-green-hover" : "bg-brand-red hover:bg-brand-red-hover"}`}
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
                            <TableCell>
                                <Button className="cursor-pointer text-white hover:text-white bg-brand-orange hover:bg-brand-orange-hover"
                                    variant="outline"
                                    disabled={isPending ? item?.user?.achievement !== 3 : false}
                                    onClick={isPending ? () => handleVerify(item.restaurantId) : null}
                                >
                                    {isPending ? "Verify" : "View"}
                                </Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );
}
