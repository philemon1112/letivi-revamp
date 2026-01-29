"use client";
import React from "react";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface AccordionProps {
  faq: FAQ;
}

function Accordion({ faq }: AccordionProps) {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <div
        className="transtion-all duration-300 cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex justify-between pr-3 items-center border-b border-na_blue py-2  mb-2">
          <h1 className="font-semibold text-left lg:text-2xl text-sm">
            {faq.question}
          </h1>
          <img
            src="/assets/Svg/dropdown_select2.svg"
            alt=""
            className={` h-5 w-5 transform duration-300 ${
              isActive ? "rotate-180" : "rotate-0"
            } `}
          />
        </div>
        {isActive && (
          <div
            className="p-2 text-left text-xl"
            dangerouslySetInnerHTML={{
              __html: faq.answer,
            }}
          ></div>
        )}
      </div>
    </div>
  );
}

export default Accordion;
