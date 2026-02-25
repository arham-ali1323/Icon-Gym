import Bannersection from '@/components/contact/Banner-section';
import Conatctinfo from '@/components/contact/Conatct-info';
import GymLocation from '@/components/contact/gym-location';
import ContactForm from '@/components/contact/Contact-form';
import ScrollToTopWaterFill from '@/components/ui/back-to-top';
const Contact = () => {
  return (
        <div>
           <Bannersection />
           <Conatctinfo/>
           <GymLocation/>
           <ContactForm/>
           <ScrollToTopWaterFill />
        </div>
  )
}

export default Contact