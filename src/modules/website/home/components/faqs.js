"use client";

import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import partnerFaqs from "../../../../assets/json/partnerFaqs.json";
import customerFaqs from "../../../../assets/json/customerFaqs.json";

const Faqs = () => {
    const [faqs, setFaqs] = useState(partnerFaqs);
    const [activeButton, setActiveButton] = useState("partner");
    const [isSelected, setIsSelected] = useState(1);

    const handleFaqs = (type) => {
        if (type === "partner") {
            setFaqs(partnerFaqs);
            setActiveButton("partner");
        } else {
            setFaqs(customerFaqs);
            setActiveButton("customer");
        }
    };

    return (
        <div className="mt-[80px]">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-[32px] font-semibold text-black mb-5 text-center">
                    Frequently Asked Question
                </h2>
                <div className="flex justify-center gap-6">
                    <button
                        onClick={() => handleFaqs("partner")}
                        className={`px-6 py-2 rounded-md font-semibold cursor-pointer hover:bg-brand-green hover:text-white ${activeButton === "partner"
                                ? "bg-brand-green text-white"
                                : "border border-brand-green text-brand-green"
                            }`}
                    >
                        Partner FAQs
                    </button>

                    <button
                        onClick={() => handleFaqs("customer")}
                        className={`px-6 py-2 rounded-md font-semibold cursor-pointer hover:bg-brand-green hover:text-white ${activeButton === "customer"
                                ? "bg-brand-green text-white"
                                : "border border-brand-green text-brand-green"
                            }`}
                    >
                        Customer FAQs
                    </button>
                </div>
                <div className="mt-12">
                    <Accordion type="single" collapsible defaultValue="1">
                        {faqs?.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={String(item.id)}
                                className={`border border-brand-gray rounded-[8px] bg-white mb-5 transition-all ${isSelected === item.id ? "shadow-[0_14px_20px_0_#00000012]" : ""
                                    }`}
                            >
                                <AccordionTrigger
                                    onClick={() => setIsSelected(item.id)}
                                    className="px-4 py-3 text-left cursor-pointer"
                                >
                                    <span className="text-[22px] text-black font-semibold">
                                        {item.question}
                                    </span>
                                </AccordionTrigger>

                                <AccordionContent className="px-4 pb-4 text-brand-gray text-[16px] font-medium whitespace-pre-line">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

            </div>
        </div>
    );
};

export default Faqs;
