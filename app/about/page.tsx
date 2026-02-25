import React from "react";
import GymAboutSection from "@/components/about/Gym-About";
import Banner from "@/components/contact/Banner-section";
import GymFeatures from "@/components/about/Gym-feature";
import TrainerSection from "@/components/home/trainers-section";
import TestimonialSection from "@/components/home/testimonial";
import SubscribeBanner from "@/components/contact/Subscribe-Banner";
import ScrollToTopWaterFill from "@/components/ui/back-to-top";

const About = () => {
  return (
    <div className="bg-black">
      <Banner />
      <GymAboutSection />
      <GymFeatures />
      <TrainerSection />
      <TestimonialSection />
      <SubscribeBanner />
      <ScrollToTopWaterFill />
    </div>
  );
};

export default About;
