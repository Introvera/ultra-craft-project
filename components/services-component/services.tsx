"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Service = {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const services: Service[] = [
  {
    id: 1,
    number: "1",
    title: "Commercial Interiors",
    description:
      "Modern, functional interiors for offices, corporate floors, reception areas, workstations, and commercial spaces, designed to improve efficiency and elevate presence.",
    image: "/services/image 56.png",
    alt: "Commercial Interiors",
  },
  {
    id: 2,
    number: "2",
    title: "Residential Interiors",
    description:
      "Interior solutions for living rooms, bedrooms, kitchens, dining areas, and entire apartments, blending comfort, beauty, and everyday function.",
    image: "/services/image 64.png",
    alt: "Residential Interiors",
  },
  {
    id: 3,
    number: "3",
    title: "Sustainable Interiors",
    description:
      "Eco-conscious interiors using recycled materials, upcycled furniture, and energy-efficient design choices for greener living.",
    image: "/services/image 65.png",
    alt: "Sustainable Interiors",
  },
  {
    id: 4,
    number: "4",
    title: "Project Management",
    description:
      "End-to-end coordination, scheduling, vendor management, and smooth project execution.",
    image: "/services/image 67.png",
    alt: "Project Management",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction === 1 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction === 1 ? -40 : 40,
    opacity: 0,
  }),
};

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  return (
    <motion.section
      className="w-full max-w-[1440px] mx-auto flex flex-col items-start px-[20px] md:px-[56px] pt-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Section Title */}
      <motion.h2
        className="text-[#604D37] font-poppins font-[700] text-[32px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        viewport={{ once: true }}
      >
        Our Interior Solutions
      </motion.h2>

      {/* DESKTOP/TABLET GRID */}
      <div className="hidden md:grid grid-cols-2 xl:grid-cols-4 gap-[32px] mt-[32px] w-full">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="flex flex-col items-start h-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.22, 0.61, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </div>

      {/* MOBILE CAROUSEL */}
      <div className="md:hidden mt-[32px] w-full flex flex-col items-center gap-4">
        <div className="w-full">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={services[activeIndex].id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ServiceCard service={services[activeIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots (same style as Projects/Products) */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index === activeIndex) return;
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              className={`
                h-2 rounded-full transition-all duration-300
                ${
                  index === activeIndex
                    ? "w-4 bg-[#C9A071]"
                    : "w-2 bg-black opacity-20 hover:opacity-60"
                }
              `}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <>
      {/* Number + Line */}
      <div className="flex items-center gap-4 w-full">
        <div className="w-[40px] h-[40px] bg-black rounded-[8px] flex justify-center items-center">
          <span className="text-[#FAFAFA] font-inter text-[16px] font-[600]">
            {service.number}
          </span>
        </div>
        <div className="flex-1 h-[2px] bg-black max-w-[250px]" />
      </div>

      {/* Heading */}
      <h3 className="text-black font-poppins font-[600] text-[24px] mt-[20px]">
        {service.title}
      </h3>

      {/* Content */}
      <p className="text-black font-poppins font-[500] text-[16px] mt-[12px] mb-[24px]">
        {service.description}
      </p>

      {/* Image (bottom-aligned crop) */}
      <div className="w-full max-w-[302px] h-[302px] rounded-[28px] overflow-hidden mt-auto flex-shrink-0">
        <img
          src={service.image}
          alt={service.alt}
          className="w-full h-full object-cover object-bottom"
        />
      </div>
    </>
  );
}