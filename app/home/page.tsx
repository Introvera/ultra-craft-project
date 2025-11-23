"use client"
import React from 'react'
import { AboutUs } from '@/components/aboutus'
import ContactUs from '@/components/contact'
import { Products } from '@/components/products'

const page = () => {
  return (
    <>
      <AboutUs />
      <Products />
      <ContactUs />
    </>
      
  )
}

export default page;
