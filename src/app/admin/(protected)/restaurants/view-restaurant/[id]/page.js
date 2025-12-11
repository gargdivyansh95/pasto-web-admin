"use client";
import { ViewRestaurant } from "@/modules";
import { useParams } from "next/navigation";
import React from "react";

const ViewRestaurantPage = () => {

  const params = useParams();
  const id = params?.id;

  return (
    <ViewRestaurant restaurantId={id} />
  );
};

export default ViewRestaurantPage;