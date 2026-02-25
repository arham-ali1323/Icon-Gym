import Banner from "@/components/contact/Banner-section";
import ClassesSection from "@/components/classes/Classes-Section";
import TrainerSection from "@/components/home/trainers-section";
import TestimonialSection from "@/components/home/testimonial";
import ClassTimeTable from "@/components/classes/ClassTimetable";
import ScrollToTopWaterFill from "@/components/ui/back-to-top";

const CardioWorkoutPage = () => {
  return (
    <div className="bg-black">
      <Banner />
      <ClassesSection />
      <TrainerSection />
      <TestimonialSection />
      <ClassTimeTable/>
      <ScrollToTopWaterFill />
    </div>
  );
};

export default CardioWorkoutPage;