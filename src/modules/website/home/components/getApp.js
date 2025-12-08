"use client";
import React from "react";
import Image from "next/image";
import QRImage from "../../../../assets/images/qr.svg";
import AppleImage from "../../../../assets/images/apple.svg";
import AndroidImage from "../../../../assets/images/android.svg";
import MobileImage from "../../../../assets/images/app-image.svg";
import Link from "next/link";

const GetApp = () => {
  return (
    <div className="lg:mt-[160px] mt-[80px]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative grid grid-cols-12 gap-4 border border-brand-orange rounded-[20px] p-6">
          <div className="col-span-12 md:col-span-7">
            <h2 className="text-[22px] font-semibold text-black mb-2 text-left">
              Affordable Food from Your Favourite Restaurant, Amazing Deals – Get
              the App Now!
            </h2>
            <p className="text-[14px] font-medium text-brand-gray text-left">
              Find nearby restaurants, enjoy exclusive offers, and experience
              hassle-free food ordering with Pasto!
            </p>
            <div className="mt-10 flex items-center gap-[50px] md:justify-start justify-between">
              <div className="text-center">
                <Image
                  src={QRImage}
                  alt="qr"
                  className="border border-brand-orange rounded-md p-2 shadow-[0_0_26px_0_#FF5E0440] mx-auto mb-5"
                />
                <p className="text-[14px] font-medium text-brand-gray">
                  Scan To Download
                </p>
                <p className="text-[14px] font-medium text-brand-gray">
                  The App
                </p>
              </div>
              <div className="text-center">
                <div className="flex flex-col gap-3 mb-3">
                  <Link
                    target="_blank"
                    href="https://play.google.com/store/apps/details?id=com.cashfree.cashfreeapp"
                  >
                    <Image src={AppleImage} alt="apple-store" />
                  </Link>

                  <Link
                    target="_blank"
                    href="https://play.google.com/store/apps/details?id=com.cashfree.cashfreeapp"
                  >
                    <Image src={AndroidImage} alt="android-store" />
                  </Link>
                </div>

                <p className="text-[14px] font-medium text-brand-gray">
                  Download The
                </p>
                <p className="text-[14px] font-medium text-brand-gray">
                  App
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5">
            <div className="lg:absolute md:static lg:top-[-32%] lg:right-0 md:top-0 md:right-0 lg:w-[29%] md:w-full">
              <Image src={MobileImage} alt="app-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetApp;
