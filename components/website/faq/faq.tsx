"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

type FaqItemType = {
  question: string;
  answer: string;
};

interface FaqItemProps {
  faq: FaqItemType;
  isActive: boolean;
  onToggle: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ faq, isActive, onToggle }) => {
  return (
    <div
      className={`px-6 py-5 cursor-pointer ${
        !isActive ? "border-b border-gray-200" : ""
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base md:text-lg font-medium text-[#343A40]">
          {faq.question}
        </h3>

        <span className="flex items-center justify-center w-7 h-7 border border-primary rounded-full text-primary transition-all duration-300">
          {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </div>

      {isActive && (
        <p className="mt-3 text-[#68706A] leading-relaxed text-sm md:text-base">
          {faq.answer}
        </p>
      )}
    </div>
  );
};

const faqData: FaqItemType[] = [
  {
    question: "Is there a free trial available?",
    answer:
      "This is the answer for the second question. You can nibh condimentum class. Augue orci conubia suscipit in condimentum Augue orci conubia suscipit in condimentum maecenas congue magna velit, eros elementum platea semper odio cras feugiat placerat. Massa nibh sed erat ac est viverra nostra tellus, et aenean a phasellus rhoncus penatibus curae leo molestie, dui hendrerit duis vestibulum libero mi nam.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "This is the answer for the second question. You can nibh condimentum class. Augue orci conubia suscipit in condimentum maecenas congue magna velit, eros elementum platea semper odio cras feugiat placerat.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "This is the answer for the third question. Just keep nibh condimentum class. Augue orci conubia suscipit in condimentum maecenas congue magna velit, eros elementum platea semper odio cras feugiat placerat.",
  },
  {
    question: "Can other info be added to an invoice?",
    answer:
      "Yes, you can add extra info to invoices. Just keep nibh condimentum class. Augue orci conubia suscipit in condimentum maecenas congue magna velit.",
  },
  {
    question: "How does billing work?",
    answer:
      "Billing is handled monthly. Massa nibh sed erat ac est viverra nostra tellus, et aenean a phasellus rhoncus penatibus curae leo molestie.",
  },
  {
    question: "How do I change my account email?",
    answer:
      "This is the answer for updating your email. Just keep nibh condimentum class. Augue orci conubia suscipit in condimentum maecenas congue magna velit.",
  },
  
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-[#FFFEFD]">
      <div className="mx-auto container space-y-2 py-16">
        <div className="flex flex-col rounded-xl">
          {faqData.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isActive={activeIndex === index}
              onToggle={() => toggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
