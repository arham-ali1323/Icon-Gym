import Link from "next/link";
import HeroSection from "@/components/home/hero-section";
import GroupWorkout from "@/components/home/group-workout-cards";
import BMICalculator from "@/components/home/bmi-calculator";
import PricingSection from "@/components/home/pricing-section";
import TrainersSection from "@/components/home/trainers-section";
import StatsSection from "@/components/home/StatsSection";
import WhyChooseUs from "@/components/home/whychooseus";
import LatestNews from "@/components/home/latest-news";
import ClassTimeTable from "@/components/home/classtimetable";
import TestminialSection from "@/components/home/testimonial";
import LatestEvents from "@/components/home/latest-events";
import ScrollToTopWaterFill from "@/components/ui/back-to-top";
export default function home() {
  return (
    <div>
      <HeroSection />
      <GroupWorkout />
      <StatsSection />
      <WhyChooseUs />
      <BMICalculator />
      <TrainersSection />
      <TestminialSection />
      <ClassTimeTable />
      <PricingSection />
      <LatestEvents />
      <LatestNews />
      <ScrollToTopWaterFill />
    </div>
  );
}
