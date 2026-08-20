import { useEffect, useState } from "react";

import HeroSlider from "./HeroSlider";

import {
  QuickEnquiryModal,
  QuickEnquiryForm,
} from "../Common/QuickEnquiry";

const Hero = () => {
  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    const popupShown = sessionStorage.getItem("quickEnquiryShown");

    if (!popupShown) {
      const timer = setTimeout(() => {
        setShowEnquiry(true);
        sessionStorage.setItem("quickEnquiryShown", "true");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <section className="relative w-full bg-white">
        <HeroSlider />
      </section>

      <QuickEnquiryModal
        isOpen={showEnquiry}
        onClose={() => setShowEnquiry(false)}
      >
        <QuickEnquiryForm
          onSubmit={(data) => {
            console.log(data);
            setShowEnquiry(false);
          }}
        />
      </QuickEnquiryModal>
    </>
  );
};

export default Hero;