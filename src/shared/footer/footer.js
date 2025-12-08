"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/app-logo.svg";
import LinkedinIcon from "@/assets/images/linkedin.svg";
import FacebookIcon from "@/assets/images/facebook.svg";
import TwitterIcon from "@/assets/images/twitter.svg";

export default function Footer() {
    return (
        <div className="mt-20 pb-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-3">
                        <div>
                            <Image src={Logo} alt="logo" className="mb-5 w-[150px]" />
                            <p className="text-[16px] font-medium text-black pt-1">
                                +91 98765 43210
                            </p>
                            <p className="text-[16px] font-medium text-black pt-1">
                                support@pasto.com
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-6">
                        <div className="flex items-center justify-start md:justify-center gap-10">
                            <Link href="">
                                <p className="text-[16px] text-brand-gray font-medium">
                                    Page 1
                                </p>
                            </Link>

                            <Link href="">
                                <p className="text-[16px] text-brand-gray font-medium">
                                    Page 2
                                </p>
                            </Link>

                            <Link href="">
                                <p className="text-[16px] text-brand-gray font-medium">
                                    Page 3
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <div className="flex items-center justify-start md:justify-end gap-4">
                            <Link
                                href=""
                                className="w-9 h-9 border border-[#ddd] rounded-full flex items-center justify-center"
                            >
                                <Image src={LinkedinIcon} alt="linkedin" />
                            </Link>
                            <Link
                                href=""
                                className="w-9 h-9 border border-[#ddd] rounded-full flex items-center justify-center"
                            >
                                <Image src={FacebookIcon} alt="facebook" />
                            </Link>
                            <Link
                                href=""
                                className="w-9 h-9 border border-[#ddd] rounded-full flex items-center justify-center"
                            >
                                <Image src={TwitterIcon} alt="twitter" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border-t-2 border-[#ddd] mt-10 pt-8 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <p className="text-[16px] font-medium text-black">
                            A product of
                        </p>
                        <Image src={Logo} alt="logo" className="w-[80px]" />
                    </div>

                    <p className="text-[16px] font-medium text-black">
                        © 2025 Pasto Pvt. Ltd. All rights reserved
                    </p>
                </div>
            </div>
        </div>
    );
}
