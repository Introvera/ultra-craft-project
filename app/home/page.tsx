"use client"
import React from 'react'
import { AboutUs } from '@/components/aboutus'
import ContactUs from '@/components/contact'
import Services from '@/components/services-component/services'
import ParallaxHero from '@/components/hero_section'

const page = () => {
  return (
    <>
      <ParallaxHero/>
      <AboutUs />
      <Services />
      <ContactUs />
    </>
      
  )
}

export default page;
