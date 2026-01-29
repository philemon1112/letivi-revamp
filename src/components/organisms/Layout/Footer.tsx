"use client";
import Loader from "@/components/atoms/Loader";
import AppLogo from "@/components/molecules/AppLogo";
// import LanguageChanger from "@/components/molecules/LanguageChanger";
import { subscribe } from "@/services/subscribe";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [prompt, setPrompt] = useState<any>(null);
  const [email, setEmail] = useState("");

  const queryClient = useQueryClient();

  const { isPending, mutate: mutateNewsletter } = useMutation({
    mutationFn: (data: any) => subscribe(data),
    onSuccess: (data) => {
      console.log({ data });
      toast.success("Subscribed successfully");

      if (data.data) {
        queryClient.invalidateQueries({
          queryKey: ["Data"],
        });
      }
    },
  });

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setPrompt(event);

      if (!window.matchMedia("(display-mode: standalone)").matches) {
        // setShowInstallModal(true);
      }
    };

    // Add event listener outside the event handler function
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (prompt) {
      prompt.prompt;
    }
  };

  const handleSubscribe = async () => {
    if (!email) return;
    mutateNewsletter({ email: email });
  };

  return (
    <footer className="footer border-t border-gray-800 bg-white max-w-[1920px] mx-auto ">
      <div className="grid lg:grid-cols-4 py-12 lg:mx-20">
        <div className="pr-1 lg:pr-2 mb-10">
          <div className="flex flex-col justify-center items-center w-full sm:w-350px text-center">
            <img
              height="80%"
              width="80%"
              alt="Letivi logo"
              className="hidden md:block"
              src="/assets/Img/left_icon_logo.jpg"
            />
            <div className="flex md:hidden">
              <AppLogo responsive={true} image={true} />
            </div>
            {/* <p className="font-normal hidden md:flex text-sm py-8">
              Download the app by clicking the button below
            </p> */}
            <div className="hidden lg:flex">
              {/* <div className=" gap-1.5 items-center grid-cols-2">
              <Link href="/coming-soon">
                <img src={appstore} alt="" className="w-11/12 h-auto" />
              </Link>
              <a
                href="https://play.google.com/store/apps/details?id=com.letivi.app"
                target="_blank"
                rel="norefferer"
              >
                <img src={playstore} alt="" className="w-11/12 h-auto" />
              </a>
            <button >
                <img src="/assets/Img/na_pwa1.webp" alt="" className="w-6/12 p-0.5" />
            </button>
            </div> */}
              {/* <button onClick={handleInstallClick}>
                <img
                  src="/assets/Img/na_pwa1.webp"
                  alt=""
                  className="w-[11rem]"
                />
              </button> */}
            </div>
          </div>
          {/* <img
          src={logo}
          className="mx-auto lg:mx-0 max-w-max lg:h-14 h-10 lg:mb-20 mb-10"
          alt=""
        /> */}
        </div>
        <div className="grid grid-cols-1 col-span-2 sm:grid-cols-2 md:grid-cols-3 sm:px-5 gap-x-6 gap-y-5 ml-5 md:pl-24">
          <div>
            <h1 className="font-bold text-xl mb-4">Categories</h1>
            <div className="font-medium text-[15px] text-[#0E0F1D]  flex flex-col space-y-1">
              <Link href="/nature">Nature</Link>
              <Link href="/workspaces">Workspaces </Link>
              <Link href="/professionals">Professionals </Link>
              <Link href="/lifestyle">Lifestyle</Link>
              <Link href="/culture">Culture</Link>
              <Link href="/animals">Animals</Link>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl mb-4">Resources</h1>
            <div className="font-medium text-[15px] text-[#0E0F1D] flex flex-col space-y-1">
              <Link href="/career">Jobs & Internships </Link>
              <Link href="/faqs">FAQs</Link>
              <Link href="/terms-and-conditions">Terms & Conditions</Link>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl mb-4">Company</h1>
            <div className="font-medium text-[15px] text-[#0E0F1D] flex flex-col space-y-1">
              <Link href="/about">About us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/support">Support</Link>
              <Link href="/partner">Partner with us</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
        </div>
        <div className="lg:pl-2 mt-4 md:mt-0  px-4">
          <h1 className="font-bold text-xl mb-4">
            Subscribe to our newsletter
          </h1>
          {/* <h1 className="text-lg font-normal mb-4 mt-4 md:mt-0">
          Subscribe to our newsletter to get updates on our latest stories
        </h1> */}

          <div className="bg-[#F5F5F5] mb-2 p-2 rounded-lg flex gap-2 items-center">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent flex-1 p-1 text-xs outline-none text-black placeholder:text-black"
            />
            <div
              className="bg-black p-1 rounded-full hover:cursor-pointer"
              onClick={handleSubscribe}
            >
              {isPending ? (
                <Loader />
              ) : (
                <img src="/assets/Svg/send.svg" alt="" />
              )}
            </div>
          </div>

          <label className="font-medium text-[15px] py-4 md:mt-0 hidden">
            Translate
          </label>
          {/* <LanguageChanger /> */}
        </div>
      </div>

      <div className="border-t max-w-7xl mx-auto">
        <div className="mx-auto flex  flex-col gap-y-4 px-2 py-6  text-black sm:px-20 lg:flex-row lg:justify-between lg:text-left xl:px-10">
          <p className="font-normal text-xl">© {currentYear} Letivi</p>
          <div className="flex justify-between items-stretch  gap-x-4">
            <a
              target="_blank"
              rel="norefferer"
              href="https://www.facebook.com/letivieverywhere/"
            >
              <img
                src="/assets/Svg/Social/fb.svg"
                alt=""
                className="w-6 h-6 md:w-7 md:h-7  "
              />
            </a>
            <a
              target="_blank"
              rel="norefferer"
              href="https://www.twitter.com/letiviapp"
            >
              <img
                src="/assets/Svg/Social/twitter.svg"
                alt=""
                className="w-6 h-6 md:w-7 md:h-7  "
              />
            </a>
            <a
              target="_blank"
              rel="norefferer"
              href="https://www.linkedin.com/company/letiviapp/"
            >
              <img
                src="/assets/Svg/Social/linkedin.svg"
                className="w-6 h-6 md:w-7 md:h-7 -mt-[1px]"
                alt=""
              />
            </a>
            <a
              target="_blank"
              rel="norefferer"
              href="https://youtube.com/@Letivieverywhere"
            >
              <img
                src="/assets/Svg/Social/yt.svg"
                alt=""
                className="w-6 h-6 md:w-7 md:h-7  "
              />
            </a>
            <a
              target="_blank"
              rel="norefferer"
              href="https://www.instagram.com/letiviapp/"
            >
              <img
                src="/assets/Svg/Social/instagram.svg"
                alt=""
                className="w-6 h-6 md:w-7 md:h-7  "
              />
            </a>
            <a
              target="_blank"
              rel="norefferer"
              href="https://www.tiktok.com/@letiviapp"
            >
              <img
                src="/assets/Svg/Social/tiktok.svg"
                alt=""
                className="w-6 h-6 md:w-7 md:h-7  "
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
