"use client";
import { OrderDetails } from "@/modules";
import { useParams } from "next/navigation";
import React from "react";

const OrderDetailsPage = () => {

  const params = useParams();
  const id = params?.id;

  return (
    <OrderDetails orderId={id} />
  );
};

export default OrderDetailsPage;