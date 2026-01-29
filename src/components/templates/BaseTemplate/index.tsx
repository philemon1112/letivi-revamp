import Footer from "@/components/organisms/Layout/Footer";
import Header from "@/components/organisms/Layout/Header";
import React from "react";

function BaseTemplate({
  children,
  withFooter = true,
}: Readonly<{
  children: React.ReactNode;
  withFooter?: boolean;
}>) {
  return (
    <div>
      <Header />
      {children}
      {withFooter && <Footer />}
    </div>
  );
}

export default BaseTemplate;
