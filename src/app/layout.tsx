import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "../utils/ReactQueryClientProvider";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://letivi.com"),
  manifest: "/manifest.json",
  title: "Letivi | Archive. Showcase. Be Discovered.",
  description:
    "Letivi is a high-resolution media archiving solution—built for professionals who need an organized, long-term, searchable archive of their profiles, bios, and multimedia content. With high-resolution galleries, collaborative workspaces, private uploads, and high-resolution downloads, Letivi lets allows users to enrich their high-resolution media asset with metadata, generate SEO-friendly URLs, and automatically tag media for maximum web visibility. Unlike traditional social platforms, it’s designed as a dedicated archive that they control and own.",
  openGraph: {
    title: "Letivi | Archive. Showcase. Be Discovered.",
    description:
      "Letivi is a high-resolution media archiving solution—built for professionals who need an organized, long-term, searchable archive of their profiles, bios, and multimedia content. With high-resolution galleries, collaborative workspaces, private uploads, and high-resolution downloads, Letivi lets allows users to enrich their high-resolution media asset with metadata, generate SEO-friendly URLs, and automatically tag media for maximum web visibility. Unlike traditional social platforms, it’s designed as a dedicated archive that they control and own.",
    images: [
      {
        url: "https://staging.letivi.com/assets/Img/mobile.png",
        width: 1200,
        height: 630,
        alt: "Letivi preview",
      },
    ],
    type: "website",
    siteName: "Letivi",
    locale: "en-US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Letivi | Archive. Showcase. Be Discovered.",
    description:
      "Letivi is a high-resolution media archiving solution—built for professionals who need an organized, long-term, searchable archive of their profiles, bios, and multimedia content. With high-resolution galleries, collaborative workspaces, private uploads, and high-resolution downloads, Letivi lets allows users to enrich their high-resolution media asset with metadata, generate SEO-friendly URLs, and automatically tag media for maximum web visibility. Unlike traditional social platforms, it’s designed as a dedicated archive that they control and own.",
    images: ["https://staging.letivi.com/assets/Img/mobile.png"],
  },
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
    <ReactQueryClientProvider>
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_FIREBASE_GOOGLE_PROVIDER}`}
      >
        <html lang="en">
          <body className="hide-scrollbar overflow-x-hidden relative h-lvh" suppressHydrationWarning>
            {children}
            <Toaster richColors position="top-center" />
          </body>
        </html>
      </GoogleOAuthProvider>
    </ReactQueryClientProvider>
  );
}
