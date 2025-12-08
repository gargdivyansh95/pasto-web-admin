"use client";

import React from "react";
import Image from "next/image";
import BannerImage from "../../../../assets/images/main-banner.png";
import QRImage from "../../../../assets/images/qr.svg";
import AppleImage from "../../../../assets/images/apple.svg";
import AndroidImage from "../../../../assets/images/android.svg";
import BurgerImage from "../../../../assets/images/burger.png";
import ComboImage from "../../../../assets/images/combo.png";
import PizzaImage from "../../../../assets/images/pizza.png";
import CakeImage from "../../../../assets/images/cake.png";
import AddIcon from "../../../../assets/images/add.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const productData = [
  {
    id: 1,
    image: BurgerImage,
    title: "Burger",
    description: "Mushroom Sauce",
    price: "₹ 50.15",
  },
  {
    id: 2,
    image: ComboImage,
    title: "Food Combo",
    description: "Mushroom Sauce",
    price: "₹ 50.15",
  },
  {
    id: 3,
    image: PizzaImage,
    title: "Pizza",
    description: "Mushroom Sauce",
    price: "₹ 50.15",
  },
  {
    id: 4,
    image: CakeImage,
    title: "Cake",
    description: "Mushroom Sauce",
    price: "₹ 50.15",
  },
];

export default function Banner() {
  return (
    <div
      className="relative mt-[60px] py-[85px] lg:pb-[120px] md:pb-[60px] pb-[20px] bg-cover bg-no-repeat bg-top"
      style={{ backgroundImage: `url(${BannerImage.src})` }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-6 items-center md:gap-0">
          <div className="col-span-12 lg:col-span-6 md:col-span-6">
            <div>
              <h1 className="font-bold text-[45px] text-brand-orange">Connecting You with Nearby</h1>
              <h2 className="font-bold text-[45px] text-black">
                Restaurants at Lowest Price.
              </h2>
              <div className="mt-[70px] flex items-center gap-[50px]">
                <div className="text-center">
                  <Image
                    src={QRImage}
                    alt="qr"
                    className="border border-brand-orange rounded-md p-2.5 shadow-[0px_0px_26px_#FF5E0440] mb-5 mx-auto"
                  />
                  <p className="text-[14px] font-medium text-brand-gray">Scan To Download</p>
                  <p className="text-[14px] font-medium text-brand-gray">The App</p>
                </div>
                <div>
                  <div className="flex flex-col gap-3 mb-3">
                    <Link target="_blank" href="/">
                      <Image src={AppleImage} alt="apple" />
                    </Link>
                    <Link target="_blank" href="/">
                      <Image src={AndroidImage} alt="android" />
                    </Link>
                  </div>

                  <p className="text-[14px] font-medium text-brand-gray text-center">Download The</p>
                  <p className="text-[14px] font-medium text-brand-gray text-center">App</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-2 md:hidden" />
          <div className="col-span-12 lg:col-span-4 md:col-span-6">
            <div className="grid grid-cols-12 gap-x-4 gap-y-24 md:mt-0 mt-[65px]">
              {productData.map((item, i) => (
                <div key={i} className="col-span-6">
                  <div className="bg-white rounded-[25px] p-4 pb-6 text-center shadow-[0px_0px_26px_#FF5E040D] relative">
                    <Image
                      src={item.image}
                      alt="product"
                      className="w-[150px] h-[130px] mx-auto -mt-[65px] object-contain"
                    />

                    <h5 className="text-[18px] font-semibold mt-3">{item.title}</h5>
                    <p className="text-[14px] font-medium mt-1">{item.description}</p>
                    <p className="text-[14px] font-medium mt-1">{item.price}</p>

                    <Button
                      className="absolute left-1/2 -bottom-[10px] -translate-x-1/2 shadow-[0px_0px_21px_#83A5FF40] 
                      bg-white hover:bg-white rounded-md py-[5px] px-[20px] text-brand-orange font-medium text-[14px] h-auto"
                    >
                      <Image src={AddIcon} alt="add" className="mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
