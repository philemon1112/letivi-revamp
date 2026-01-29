import type { Metadata, Viewport } from "next";
import "../globals.css";
import { ReactQueryClientProvider } from "../../utils/ReactQueryClientProvider";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import "react-lazy-load-image-component/src/effects/blur.css";
// import Link from "next/link";
// import Image from "next/image";
import SideBar from "@/components/molecules/Admin/shared/SideBar";
import AdminHeader from "@/components/molecules/Admin/shared/AdminHeader";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Letivi | Archive. Showcase. Be Discovered.",
  description:
    "Letivi is a high-resolution media archiving solution—built for professionals who need an organized, long-term, searchable archive of their profiles, bios, and multimedia content. With high-resolution galleries, collaborative workspaces, private uploads, and high-resolution downloads, Letivi lets allows users to enrich their high-resolution media asset with metadata, generate SEO-friendly URLs, and automatically tag media for maximum web visibility. Unlike traditional social platforms, it’s designed as a dedicated archive that they control and own.",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NextTopLoader
        // crawlSpeed={1000}
        showSpinner={false}
        speed={1000}
        initialPosition={0.5}
        color="#1184C1"
        shadow={false}
      />
      <ReactQueryClientProvider>
        <SideBar isMobile={false} />
        <div className="flex bg-gray-100 flex-col flex-1 ml-0 md:ml-64">
          <AdminHeader />
          <div>
            <div className="py-6">
              <div className="px-4 mx-auto max-w-full sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </div>
        </div>

        <Toaster richColors position="top-center" />
      </ReactQueryClientProvider>
    </div>
  );
}
