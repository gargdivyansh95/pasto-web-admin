"use client";
import React from "react";
import Image from "next/image";
import Building1Image from "../../../../assets/images/building1.svg";
import Building2Image from "../../../../assets/images/building2.svg";
import Building3Image from "../../../../assets/images/building3.svg";

const WeServe = () => {
  return (
    <div className="mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-[32px] font-semibold text-center mb-5 font_family">
          Currently Serving In
        </h2>

        <div className="grid grid-cols-12 mt-8 shadow-[0px_14px_20px_0px_#FF5E0412] border border-[#FF5E041A] rounded-2xl gap-6">
          <div className="col-span-12 md:col-span-4 text-center">
            <h4 className="text-[54px] font-bold text-[#FFA004] py-4 font_family">
              Delhi
            </h4>
            <Image src={Building1Image} alt="Delhi" className="mx-auto" />
          </div>
          <div className="col-span-12 md:col-span-4 text-center">
            <h4 className="text-[54px] font-bold text-[#FF5E04] py-4 font_family">
              Gurugram
            </h4>
            <Image src={Building2Image} alt="Gurugram" className="mx-auto" />
          </div>
          <div className="col-span-12 md:col-span-4 text-center">
            <h4 className="text-[54px] font-bold text-[#FF5E04] py-4 font_family">
              Noida
            </h4>
            <Image src={Building3Image} alt="Noida" className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeServe;
