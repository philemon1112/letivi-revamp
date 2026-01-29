"use client";
import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import {
  Transition,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/react";

interface MobileBottomContentBarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  height?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
}

export default function MobileBottomContentBar({
  open,
  setOpen,
  children,
  height = "md", // Default to medium height
}: MobileBottomContentBarProps) {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  // Map height prop to specific Tailwind height classes
  const heightClasses = {
    sm: "h-48", // 12rem
    md: "h-64", // 16rem
    lg: "h-80", // 20rem
    xl: "h-96", // 24rem
    "2xl": "h-[32rem]", // 32rem
    "3xl": "h-[36rem]", // 36rem
    "4xl": "h-[40rem]", // 40rem
    "5xl": "h-[44rem]", // 44rem
    full: "h-[90vh]", // 90% of viewport height
  };

  const drawerHeightClass = heightClasses[height] || "h-64"; // Fallback to medium

  return (
    <Transition show={show} as={Fragment}>
      <Dialog as="div" className="relative z-[99]" onClose={setOpen}>
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 backdrop-filter" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-0 right-0 flex max-w-full">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <DialogPanel className="pointer-events-auto relative w-screen max-w-md">
                  <TransitionChild
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <div
                        className="fixed -z-1 inset-0 opacity-100"
                        aria-hidden="true"
                        onClick={() => setOpen(false)}
                      ></div>
                    </div>
                  </TransitionChild>
                  <div
                    className={`absolute flex flex-col inset-x-0 bottom-0 rounded-tl-xl rounded-tr-xl p-2 ${drawerHeightClass} transition-all translate-y-0 bg-white`}
                  >
                    {/* Handle/Drag Indicator */}
                    <div className="relative flex items-center justify-center pb-1 after:absolute after:-top-1 after:left-1/2 after:rounded-full after:-translate-x-1/2 after:w-10 after:h-1 after:bg-gray-300 [&amp;_.bottomsheet-title]:pt-2"></div>

                    {/* Content Area - Scrollable */}
                    <div className="flex-1 overflow-y-auto w-full px-2">
                      {children}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
