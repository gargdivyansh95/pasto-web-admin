"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import NoImage from "../../../assets/images/no-image.jpg";
import { DetailCard } from "./components";
import { restaurantsActions } from "./restaurants.action";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyRestaurantSchema } from "@/validations";
import { Skeleton } from "@/components/ui/skeleton";

export const VerifyRestaurant = ({ restaurantId }) => {

    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(VerifyRestaurantSchema),
        defaultValues: {
            fssai: { isValid: true, reason: "" },
            businessRegistration: { isValid: true, reason: "" },
            gst: { isValid: true, reason: "" },
        }
    });

    const docTypes = {
        fssai: "FSSAI Certificate",
        businessRegistration: "Business Registration Certificate",
        gst: "GST Certificate",
    };

    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [restaurant, setRestaurant] = useState({});
    const [restaurantDocs, setRestaurantDocs] = useState(null);
    const [rejectedDocs, setRejectedDocs] = useState([]);

    const fetchRestaurantById = () => {
        dispatch(restaurantsActions.fetchRestaurantById(
            { restaurantId },
            (response) => {
                if (response.success === true) {
                    setRestaurant(response.data);
                }
            },
            (error) => {
                toast.error(error.error || "Fetch Restaurants API failed");
            }
        )
        );
    };

    const fetchRestaurantDocuments = () => {
        dispatch(restaurantsActions.fetchRestaurantDocuments(
            { restaurantId },
            (response) => {
                if (response.success === true) {
                    const latestDocs = {};
                    const rejectDocs = [];

                    // group by docType
                    const grouped = response?.data.reduce((acc, doc) => {
                        if (!acc[doc.docType]) acc[doc.docType] = [];
                        acc[doc.docType].push(doc);
                        return acc;
                    }, {});

                    // make every group of doctype
                    Object.keys(grouped).forEach((type) => {
                        const docs = grouped[type];

                        // latest createdAt select
                        let latest = docs[0];
                        docs.forEach((doc) => {
                            if (doc.createdAt._seconds > latest.createdAt._seconds) {
                                latest = doc;
                            }
                        });

                        if (latest.status === 2) {
                            rejectDocs.push(latest);
                        } else {
                            latestDocs[type] = latest;
                        }
                        docs.forEach((doc) => {
                            if (doc.status === 2 && doc !== latest) {
                                rejectDocs.push(doc);
                            }
                        });
                    });
                    setRestaurantDocs(latestDocs);
                    setRejectedDocs(rejectDocs);
                }
            },
            (error) => {
                toast.error(error.error || "Fetch Restaurants API failed");
            }
        )
        );
    };

    useEffect(() => {
        fetchRestaurantById();
        fetchRestaurantDocuments();
    }, [dispatch]);

    const getAddress = (d) => `${d?.address}, ${d?.area}, ${d?.city}, ${d?.state}, ${d?.pincode}`;

    const getOpeningTime = (d) => `${d?.startTime} - ${d?.endTime}`;

    const onSubmit = (data) => {
        const allDocsValid = Object.values(data).every(v => v.isValid);
        for (const [key, doc] of Object.entries(restaurantDocs)) {
            const validation = data[key];
            if (!validation) continue;
            const updatedData = {
                status: validation.isValid ? 3 : 2,
                reason: validation.isValid ? null : validation.reason,
                processedBy: authState?.user?.email,
            };
            const payload = {
                docId: doc.id,
                data: updatedData,
                restaurantId: restaurantId,
                allDocsValid: allDocsValid,
            }
            setIsSubmitting(true);
            dispatch(restaurantsActions.updateRestaurantDocuments(
                payload,
                (response) => {
                    if (response.success === true) {
                        toast.success(response.message);
                        setIsSubmitting(false);
                        fetchRestaurantDocuments();
                    }
                },
                (error) => {
                    toast.error(error.error || "Update Restaurant Document API failed");
                    setIsSubmitting(false);
                }
            ));
        }
    };

    return (
        <form>
            <h1 className="text-3xl font-bold mb-6 mt-2">Restaurant Verify</h1>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-7 mr-14">
                    <Card className="mt-0 py-4 px-4 gap-4">
                        <CardHeader className="px-0 gap-0">
                            <CardTitle className="text-xl font-bold">Restaurant Details</CardTitle>
                        </CardHeader>
                        <CardContent className="px-0">
                            {!restaurant?.restaurantName ? (
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
                                    <Image src={restaurant?.restaurantLogo || NoImage} width={140} height={140} alt="Restaurant" className="rounded-md border" />
                                    <DetailCard label="Owner Name" value={restaurant?.ownerName} />
                                    <DetailCard label="Restaurant Name" value={restaurant?.restaurantName} />
                                    <DetailCard label="Primary Number" value={restaurant?.user?.phoneNumber} />
                                    <DetailCard label="Secondary Number" value={restaurant?.contactNumbers?.map((n) => n.number).join(", ")} />
                                    <DetailCard label="Address" value={getAddress(restaurant?.addressDetails)} />
                                    <DetailCard label="Opening Time" value={getOpeningTime(restaurant?.openingHours)} />
                                    <DetailCard label="Food Type" value={restaurant?.foodTypeServe?.map((food) => food.label).join(", ")} />
                                    <DetailCard label="Cuisines" value={restaurant?.cuisines?.map(item => item.label).join(', ')} />
                                    <DetailCard label="Restaurant Type" value={restaurant?.restaurantType?.map(item => item.label).join(', ')} />
                                    <DetailCard label="Delievery Range" value={restaurant?.deliveryRange?.label} />
                                    <DetailCard label="Delievery Rules" value={restaurant?.deliveryRules?.map(item => `${item?.range?.label} : ₹${item?.price}`).join(', ')} />
                                    <DetailCard label="Status" value={restaurant.status} />
                                </>
                            )}

                        </CardContent>
                    </Card>
                    <Card className="mt-6 py-4 px-4 gap-1">
                        <CardHeader className="px-0 gap-0">
                            <CardTitle className="text-xl font-bold">Rejected Documents</CardTitle>
                        </CardHeader>
                        <CardContent className="px-0">
                            {rejectedDocs.length > 0 ? (
                                rejectedDocs.map((doc, i) => (
                                    <div key={i} className="p-4 bg-muted mt-4 rounded-md">
                                        <p className="font-semibold">Document: {doc.docType.toUpperCase()}</p>
                                        <p>Reason: {doc.reason}</p>
                                        <Link href={doc.docUrl} target="_blank" className="text-blue-600 underline">
                                            View Document
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p className="mt-4 text-gray-700">No rejected documents found.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-5">
                    <h2 className="text-xl font-bold">Restaurant Documents</h2>
                    <Tabs defaultValue="fssai" className="mt-6 w-full">
                        <TabsList className="flex justify-center gap-6 h-12">
                            {Object.entries(docTypes).map(([key, label]) => (
                                <TabsTrigger className="data-[state=active]:bg-brand-green data-[state=active]:text-white text-base cursor-pointer" key={key} value={key}>
                                    {label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {Object.entries(docTypes).map(([key, label]) => {
                            const doc = restaurantDocs?.[key];
                            const validation = watch(key);
                            return (
                                <TabsContent key={key} value={key} className="mt-4">
                                    {!restaurantDocs ? (
                                        <div className="space-y-4">
                                            <Skeleton className="h-6 w-40" />
                                            <Skeleton className="h-10 w-full" />
                                            <Skeleton className="h-96 w-full rounded-md" />
                                        </div>
                                    ) : doc ? (
                                        <>
                                            <div className="flex items-center gap-3">
                                                <p className="font-medium">Is this document valid?</p>
                                                <Switch checked={validation.isValid} disabled={doc.status === 3} className="cursor-pointer"
                                                    onCheckedChange={(v) => {
                                                        setValue(`${key}.isValid`, v);
                                                        if (v === true) setValue(`${key}.reason`, "");
                                                    }}
                                                />
                                                <span>{validation.isValid ? "Yes" : "No"}</span>
                                            </div>
                                            {!validation.isValid && (
                                                <div className="mt-3">
                                                    <Input placeholder="Enter reason for rejection" {...register(`${key}.reason`)} />
                                                    {errors?.[key]?.reason && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors[key].reason.message}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                            {doc.status === 3 && (
                                                <div className="flex">
                                                    <p className="mt-2 bg-brand-green text-white px-3 py-1 rounded text-xs">
                                                        Approved
                                                    </p>
                                                </div>
                                            )}
                                            <div className="mt-4">
                                                {doc.docUrl.endsWith(".pdf") ? (
                                                    <iframe src={doc.docUrl} width="100%" height="600" className="rounded-md border" />
                                                ) : (
                                                    <a href={doc.docUrl} target="_blank">
                                                        <Image src={doc.docUrl} width={600} height={600} alt={label} className="w-full rounded-md border" />
                                                    </a>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <p>No document uploaded for {label}.</p>
                                    )}
                                </TabsContent>
                            );
                        })}
                    </Tabs>
                </div>
            </div>
            <div className="flex justify-end mt-1 mb-5">
                <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white py-6 text-base font-semibold rounded-lg disabled:opacity-50 cursor-pointer w-50"
                    type="submit" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
}
