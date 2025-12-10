"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
// import { CustomButton, CustomToast, DetailCard, Loader, Navbar } from "@/components";
import Link from "next/link";
import Image from "next/image";
import NoImage from "../../../assets/images/no-image.jpg";
import { DetailCard } from "./components";
import { restaurantsActions } from "./restaurants.action";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

// import {
//   getRestaurantById,
//   getRestaurantDocuments,
//   handleApproveDocs,
// } from "@/firebaseServices/restaurantService";

// import { getItem } from "@/utilities/authUtils";

export const VerifyRestaurant = ({ restaurantId }) => {
    console.log(restaurantId, 'restaurantId')

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [restaurant, setRestaurant] = useState({});

    const fetchRestaurantById = () => {
        dispatch(restaurantsActions.fetchRestaurantById(
            { restaurantId },
            (response) => {
                if (response.success === true) {
                    console.log(response, 'rrrrrrrrrrrrrr')
                    setRestaurant(response.data);
                }
            },
            (error) => {
                toast.error(error.error || "Fetch Restaurants API failed");
                // setLoading(false);
                // setLoadingMore(false);
            }
        )
        );
    };

    useEffect(() => {
        fetchRestaurantById();
    }, [dispatch]);



    //   const docTypes = {
    //     fssai: "FSSAI Certificate",
    //     businessRegistration: "Business Registration Certificate",
    //     gst: "GST Certificate",
    //   };

    //   const USER = getItem("user");
    //   const { addToast } = CustomToast();

    //   const [restaurant, setRestaurant] = useState([]);
    //   const [restaurantDocs, setRestaurantDocs] = useState(null);
    //   const [rejectedDocs, setRejectedDocs] = useState([]);
    //   const [loading, setLoading] = useState(true);
    //   const [docValidations, setDocValidations] = useState({});

    //   useEffect(() => {
    //     fetchRestaurant();
    //     fetchRestaurantDocuments();

    //     setDocValidations({
    //       fssai: { isValid: true, reason: "" },
    //       businessRegistration: { isValid: true, reason: "" },
    //       gst: { isValid: true, reason: "" },
    //     });
    //   }, []);

    //   const fetchRestaurant = async () => {
    //     try {
    //       const data = await getRestaurantById(restaurantId);
    //       setRestaurant(data);
    //     } catch (err) {
    //       console.error(err);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   const fetchRestaurantDocuments = async () => {
    //     try {
    //       const data = await getRestaurantDocuments({ restaurantId });
    //       const latestDocs = {};
    //       const rejectedDocs = [];

    //       const grouped = data.reduce((acc, doc) => {
    //         if (!acc[doc.docType]) acc[doc.docType] = [];
    //         acc[doc.docType].push(doc);
    //         return acc;
    //       }, {});

    //       Object.keys(grouped).forEach((type) => {
    //         const docs = grouped[type];
    //         let latest = docs[0];

    //         docs.forEach((doc) => {
    //           if (doc.createdAt.seconds > latest.createdAt.seconds) {
    //             latest = doc;
    //           }
    //         });

    //         if (latest.status === 2) rejectedDocs.push(latest);
    //         else latestDocs[type] = latest;

    //         docs.forEach((doc) => {
    //           if (doc.status === 2 && doc !== latest) rejectedDocs.push(doc);
    //         });
    //       });

    //       setRestaurantDocs(latestDocs);
    //       setRejectedDocs(rejectedDocs);
    //     } catch (err) {
    //       console.error(err);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

        const getAddress = (d) =>
            `${d?.address}, ${d?.area}, ${d?.city}, ${d?.state}, ${d?.pincode}`;

      const getOpeningTime = (d) => `${d?.startTime} - ${d?.endTime}`;

    //   const handleValidationChange = (key, isValid) => {
    //     setDocValidations((prev) => ({
    //       ...prev,
    //       [key]: { ...prev[key], isValid, reason: isValid ? "" : prev[key]?.reason },
    //     }));
    //   };

    //   const handleReasonChange = (key, reason) => {
    //     setDocValidations((prev) => ({
    //       ...prev,
    //       [key]: { ...prev[key], reason },
    //     }));
    //   };

    //   const handleApprove = async () => {
    //     try {
    //       for (const [key, validation] of Object.entries(docValidations)) {
    //         if (!validation.isValid && !validation.reason.trim()) {
    //           addToast({
    //             message: `Please enter a reason for rejecting ${key.toUpperCase()}`,
    //             status: "error",
    //           });
    //           return;
    //         }
    //       }

    //       const allDocsValid = Object.values(docValidations).every((v) => v.isValid);

    //       for (const [key, doc] of Object.entries(restaurantDocs)) {
    //         const validation = docValidations[key];

    //         const updatedData = {
    //           status: validation.isValid ? 3 : 2,
    //           reason: validation.isValid ? null : validation.reason,
    //           processedBy: USER.email,
    //         };

    //         await handleApproveDocs(doc.id, updatedData, restaurantId, allDocsValid);
    //       }

    //       addToast({ message: "Documents processed successfully!", status: "success" });
    //     } catch (err) {
    //       console.error(err);
    //       addToast({ message: "Failed to process documents.", status: "error" });
    //     }
    //   };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 mt-2">Restaurant Verify</h1>

            <div className="grid grid-cols-12 mt-8 gap-6">
                <div className="col-span-7">
                    <h2 className="text-xl font-bold">Restaurant Details</h2>
                    <Card className="mt-3 py-4 px-4">
                        <CardContent className="px-0">
                            <Image
                                src={restaurant?.restaurantLogo || NoImage}
                                width={140}
                                height={140}
                                alt="Restaurant"
                                className="rounded-md border"
                            />
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
                            <div className="mt-8">
                                <h2 className="text-xl font-bold">Rejected Documents</h2>

                                {/* {rejectedDocs.length > 0 ? (
                  rejectedDocs.map((doc, i) => (
                    <div key={i} className="p-4 bg-muted mt-4 rounded-md">
                      <p className="font-semibold">Document: {doc.docType.toUpperCase()}</p>
                      <p>Reason: {doc.reason}</p>

                      <Link
                        href={doc.docUrl}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        View Document
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="mt-4 text-gray-700">No rejected documents found.</p>
                )} */}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Section */}
                {/* <div className="col-span-5">
          <h2 className="text-2xl font-bold">Restaurant Documents</h2>

          <Tabs defaultValue="fssai" className="mt-6 w-full">
            <TabsList className="flex justify-center">
              {Object.entries(docTypes).map(([key, label]) => (
                <TabsTrigger key={key} value={key}>
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(docTypes).map(([key, label]) => {
              const doc = restaurantDocs?.[key];
              const validation = docValidations[key];

              return (
                <TabsContent key={key} value={key} className="mt-6">
                  {doc ? (
                    <>
                      <div className="flex items-center gap-3">
                        <p className="font-medium">Is this document valid?</p>

                        <Switch
                          checked={validation.isValid}
                          onCheckedChange={(val) =>
                            handleValidationChange(key, val)
                          }
                        />

                        <span>{validation.isValid ? "Yes" : "No"}</span>
                      </div>

                      {!validation.isValid && (
                        <Input
                          placeholder="Enter reason for rejection"
                          className="mt-3"
                          value={validation.reason}
                          onChange={(e) =>
                            handleReasonChange(key, e.target.value)
                          }
                        />
                      )}

                      {doc.status === 3 && (
                        <p className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm">
                          Approved
                        </p>
                      )}

                      <div className="mt-4">
                        {doc.docUrl.endsWith(".pdf") ? (
                          <iframe
                            src={doc.docUrl}
                            width="100%"
                            height="600"
                            className="rounded-md border"
                          />
                        ) : (
                          <a href={doc.docUrl} target="_blank">
                            <Image
                              src={doc.docUrl}
                              width={500}
                              height={600}
                              alt={label}
                              className="rounded-md border"
                            />
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
        </div> */}
            </div>

            <div className="flex justify-end mt-10">
                <Button className="bg-green-600 text-white">
                    Submit
                </Button>
            </div>
        </div>
    );
}
