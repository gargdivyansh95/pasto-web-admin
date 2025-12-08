"use client";
import React from "react";
import Image from "next/image";
import NearbyImage from "../../../../assets/images/nearby.svg";
import CustomizeImage from "../../../../assets/images/customize.svg";
import PaymentImage from "../../../../assets/images/payment.svg";
import SafeImage from "../../../../assets/images/safe.svg";

const worksData = [
  {
    id: 1,
    image: NearbyImage,
    title: "Find Restaurants Nearby",
    description: "Discover affordable options \nnear you.",
    bg: "#B34D031A",
  },
  {
    id: 2,
    image: CustomizeImage,
    title: "Customise Your Order",
    description: "Choose dishes and add \ncustomisations",
    bg: "#FFA0041A",
  },
  {
    id: 3,
    image: PaymentImage,
    title: "Pay Seamlessly",
    description: "Hassle-free payment directly \nto the restaurant.",
    bg: "#FF0E041A",
  },
  {
    id: 4,
    image: SafeImage,
    title: "Quick Delivery/ Self Pickup",
    description: "Get your food fresh \nand fast!",
    bg: "#B30A031A",
  },
];

const HowItWorks = () => {
  return (
    <div className="mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-[32px] font-semibold text-center mb-5">
          How It Works
        </h2>
        <div className="grid grid-cols-12 gap-4 md:gap-6 mt-12">
          {worksData.map((item) => (
            <div
              key={item.id}
              className="col-span-12 sm:col-span-6 lg:col-span-3"
            >
              <div className="text-center bg-white rounded-2xl p-4 shadow-sm">
                <div
                  className="w-[100px] h-[100px] rounded-lg flex items-center justify-center mx-auto"
                  style={{ backgroundColor: item.bg }}
                >
                  <Image src={item.image} alt={item.title} />
                </div>
                <h4 className="text-[20px] font-semibold text-black mt-5 mb-2">
                  {item.title}
                </h4>
                <p className="text-[16px] font-medium text-brand-gray whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
