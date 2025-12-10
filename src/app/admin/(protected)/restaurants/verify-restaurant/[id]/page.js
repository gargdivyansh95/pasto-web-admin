"use client";
import { VerifyRestaurant } from "@/modules";
import { useParams } from "next/navigation";
import React from "react";

const VerifyRestaurantPage = () => {

  const params = useParams();
  const id = params?.id;

  return (
    <VerifyRestaurant restaurantId={id} />
  );
};

export default VerifyRestaurantPage;