import { Metadata } from "next";
import { Toaster } from "sonner";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
