"use client";

import Banner from '@/components/contact/Banner-section'
import SubscribeBanner from '@/components/contact/Subscribe-Banner';
import Timetable from '@/components/home/classtimetable'; 

export default function Schedule() {
  return (
    <div className='bg-black'>
        <Banner />
        <Timetable />
        <SubscribeBanner />
    </div>
  )
}
