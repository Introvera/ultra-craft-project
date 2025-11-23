"use client"
import React from 'react'
import { AboutUs } from '@/components/aboutus'
import ContactUs from '@/components/contact'
import Services from '@/components/services-component/services'

const page = () => {
  return (
    <>
      <AboutUs />
      <Services />
      <ContactUs />
    </>
      
  )
}

export default page;
