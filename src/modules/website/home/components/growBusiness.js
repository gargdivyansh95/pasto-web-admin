"use client";

import React from "react";
import Image from "next/image";
import PartnerImage from "../../../../assets/images/partner-image.svg";

const featuresData = [
  {
    title: "Zero Commission for First Month",
    description: "Enjoy all the benefits without any \nupfront costs.",
  },
  {
    title: "Full Control of Pricing",
    description: "Set your own prices, offers, and \ndiscounts.",
  },
  {
    title: "Receive Faster Payments",
    description: "Receive your payments on time, Directly \nFrom your Customer",
  },
  {
    title: "Real-Time Insights",
    description: "Track your sales, orders, and \nearnings with ease.",
  },
];

const GrowBusiness = () => {
  return (
    <div className="mt-[120px] md:mt-[80px]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-[32px] font-semibold text-black text-center mb-5">
          Partner with us to grow your{" "}
          <span className="text-brand-orange font-bold">Business</span> today!
        </h2>
        <div className="lg:grid lg:grid-cols-12 md:grid md:grid-cols-12 lg:gap-[6rem] gap-[3rem] border border-brand-orange rounded-[20px] px-6 pt-4 pb-2 md:pb-4 relative mt-12 md:space-y-5">
          <div className="col-span-12 md:col-span-4 text-center mb-0">
            <Image src={PartnerImage} alt="partner" className="lg:w-full" />
            <button className="bg-brand-orange text-white border border-brand-orange rounded-[12px] font-semibold text-[16px] px-6 py-2 mt-[-40px] relative z-10">
              Partner with Us Today
            </button>
          </div>
          <div className="col-span-12 md:col-span-8 flex flex-wrap lg:flex-row md:flex-row flex-col justify-between lg:items-center md:items-center items-start lg:gap-y-0 gap-y-8 lg:mt-0 md:mt-0 mt-10">
            {featuresData.map((item, i) => (
              <div
                key={i}
                className="relative lg:w-[45%] md:w-[45%] sm:w-full lg:pl-4 md:pl-4 pl-1"
              >
                <span className="absolute left-[-12px] top-[6px] w-[6px] h-[6px] rounded-full bg-black"></span>
                <h4 className="text-[16px] font-semibold text-black mb-1">
                  {item.title}
                </h4>
                <p className="text-[16px] text-brand-gray font-medium whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default GrowBusiness;
