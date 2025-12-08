"use client";

import React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import ClientImage from "../../../../assets/images/client.jpeg";
import WatermarkImage from "../../../../assets/images/watermark.svg";

const testimonialData = [
    {
        id: 1,
        image: ClientImage,
        name: "Divyansh Garg",
        comment:
            "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
        id: 2,
        image: ClientImage,
        name: "Siddhant",
        comment:
            "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
        id: 3,
        image: ClientImage,
        name: "John Doe",
        comment:
            "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
        id: 4,
        image: ClientImage,
        name: "Abhishek Kumar",
        comment:
            "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
];

export default function Testimonials() {
    return (
        <div className="mt-20">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="font_family text-center text-3xl font-semibold text-black">
                    Testimonials
                </h2>

                <div className="mt-10">
                    <Carousel
                        opts={{
                            loop: true,
                        }}
                        plugins={[
                            Autoplay({
                                delay: 4000,
                            }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent>
                            {testimonialData.map((item, index) => (
                                <CarouselItem
                                    key={index}
                                    className="md:basis-1/3 sm:basis-1/2 basis-full px-4"
                                >
                                    <div className="border border-[#FF5E04] rounded-lg p-6 relative">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            className="w-[130px] h-[130px] rounded-full mx-auto"
                                        />
                                        <h4 className="font_family text-xl font-semibold text-center text-black mt-4 mb-4">
                                            {item.name}
                                        </h4>
                                        <p className="font_family text-[16px] font-medium text-[#2C2C2C] whitespace-pre-wrap text-center">
                                            {item.comment}
                                        </p>

                                        <Image
                                            src={WatermarkImage}
                                            alt="watermark"
                                            className="absolute bottom-0 left-0 opacity-70"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>
    );
}
