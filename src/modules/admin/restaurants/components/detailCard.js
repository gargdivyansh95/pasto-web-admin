"use client";

import React from "react";

export default function DetailCard({ label, value }) {
    return (
        <div className="my-3">
            <div className="flex items-center gap-4">
                <h6 className="text-base bg-[#F1F9FF] border border-gray-200 text-black p-2 rounded-md w-[30%]">
                    {label}
                </h6>
                <h6 className="text-base bg-[#F1F9FF] border border-gray-200 text-black p-2 rounded-md w-[70%]">
                    {value}
                </h6>
            </div>
        </div>
    );
}
