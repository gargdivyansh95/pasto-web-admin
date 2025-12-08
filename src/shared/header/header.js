"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../assets/images/app-logo.svg";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full z-20 bg-white transition-all border-b border-gray-100 ${scrolled ? "shadow-sm" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="grid grid-cols-12 items-center gap-4 md:gap-0">
          <div className="lg:col-span-4 md:col-span-4 col-span-12">
            <Image src={Logo} alt="app-logo" />
          </div>
          <div className="lg:col-span-8 md:col-span-8 col-span-12 flex items-center justify-end gap-6">
            <Button
              variant="ghost"
              className="font-semibold text-black px-6 py-2 rounded-xl border border-transparent text-base"
            >
              Partner with us
            </Button>
            <Button
              className="bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold px-6 py-2 rounded-lg text-base font-semibold"
            >
              Download App
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
