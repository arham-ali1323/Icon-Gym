import React from "react";
import Banner from "@/components/contact/Banner-section";
import FAQSection from "@/components/faq/FAQ-Section";
import SubscribeBanner from "@/components/contact/Subscribe-Banner";
import ScrollToTopWaterFill from "@/components/ui/back-to-top";

const FAQ = () => {
  return (
    <div className="bg-black">
      <Banner />
      <FAQSection />
      <SubscribeBanner />
      <ScrollToTopWaterFill />
    </div>
  );
};

export default FAQ;
