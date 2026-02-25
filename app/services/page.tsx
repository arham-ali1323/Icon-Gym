
"use client";
import GymServicesSection from "@/components/services/GymServices";
import Banner from "@/components/contact/Banner-section";
import ClassesGridSection from "@/components/services/Classes-Grid";
import TrainerSection from "@/components/home/trainers-section";
import TestimonialSection from "@/components/home/testimonial";
import ScrollToTopWaterFill from "@/components/ui/back-to-top";

const Services = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="animate-fade-in">
        <Banner />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <GymServicesSection />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <ClassesGridSection />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
        <TrainerSection />
      </div>
      <div className="animate-slide-up" style={{ animationDelay: "0.8s" }}>
        <TestimonialSection />
      </div>
      <ScrollToTopWaterFill />
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default Services;
