import React from "react";

function ClientSourcing() {
  return (
    <div>
      <div>
        <div className="px-4 py-4 mx-auto max-w-screen-xl sm:px-6 md:px-8 lg:px-10 lg:py-24">
          <div className="flex flex-wrap items-center mx-auto max-w-screen-xl">
            <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl order-2 lg:order-1">
              <div>
                <div className="relative w-full max-w-lg">
                  <div className="relative">
                    <img
                      className="object-cover object-center mx-auto"
                      alt="hero"
                      src="/assets/Img/phoneMockup2.webp"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start mt-0 md:mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0 order-1 lg:order-2">
              <div className="border border-l-2 border-t-0 border-b-0 border-r-0 border-na_blue">
                <p className="text-xl md:text-lg px-4">
                  Yes, photographers and videographers you can{" "}
                  <br className="hidden md:flex" />
                  use Letivi messaging to send works to your clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientSourcing;
