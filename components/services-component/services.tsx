import React from "react";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <section className="w-full max-w-[1440px] mx-auto flex flex-col items-start px-5 md:px-14 pt-4">
      {/* Section Title */}
      <h2 className="text-[#604D37] font-poppins font-bold text-4xl">
        Our Interior Solutions
      </h2>

      {/* Grid */}
      {/* 1 col (mobile) | 2 cols (tablet / small laptop) | 4 cols (big desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[32px] mt-[32px] w-full">
        {/* CARD 1 */}
        <div className="flex flex-col items-start h-full">
          {/* Number + Line */}
          <div className="flex items-center gap-4 w-full">
            <div className="w-[40px] h-[40px] bg-black rounded-[8px] flex justify-center items-center">
              <span className="text-[#FAFAFA] font-inter text-[16px] font-semibold">
                1
              </span>
            </div>
            <div className="flex-1 h-[2px] bg-black max-w-[250px]" />
          </div>

          {/* Heading */}
          <h3 className="text-black font-poppins font-semibold text-[24px] mt-[20px]">
            Commercial Interiors
          </h3>

          {/* Content */}
          <p className="text-black font-poppins font-normal text-[16px] mt-3 mb-6">
            Modern, functional interiors for offices, corporate floors,
            reception areas, workstations, and commercial spaces, designed to
            improve efficiency and elevate presence.
          </p>

          {/* Image (bottom-aligned crop) */}
          <motion.div
            className="w-full max-w-[302px] h-[302px] rounded-[28px] overflow-hidden mt-auto shrink-0"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <img
              src="/services/image 56.png"
              alt="Residential Interiors"
              className="w-full h-full object-cover object-bottom"
            />
          </motion.div>
        </div>

        {/* CARD 2 */}
        <div className="flex flex-col items-start h-full">
          <div className="flex items-center gap-4 w-full">
            <div className="w-[40px] h-[40px] bg-black rounded-[8px] flex justify-center items-center">
              <span className="text-[#FAFAFA] font-inter text-[16px] font-semibold">
                2
              </span>
            </div>
            <motion.div
              className="flex-1 h-[2px] bg-black max-w-[250px]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>

          <h3 className="text-black font-poppins font-semibold text-[24px] mt-[20px]">
            Residential Interiors
          </h3>

          <p className="text-black font-poppins font-normal text-[16px] mt-[12px] mb-[24px]">
            Interior solutions for living rooms, bedrooms, kitchens, dining
            areas, and entire apartments, blending comfort, beauty, and everyday
            function.
          </p>

          <motion.div
            className="w-full max-w-[302px] h-[302px] rounded-[28px] overflow-hidden mt-auto shrink-0"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <img
              src="/services/image 64.png"
              alt="Residential Interiors"
              className="w-full h-full object-cover object-bottom"
            />
          </motion.div>
        </div>

        {/* CARD 3 */}
        <div className="flex flex-col items-start h-full">
          <div className="flex items-center gap-4 w-full">
            <div className="w-[40px] h-[40px] bg-black rounded-[8px] flex justify-center items-center">
              <span className="text-[#FAFAFA] font-inter text-[16px] font-semibold">
                3
              </span>
            </div>
            <div className="flex-1 h-[2px] bg-black max-w-[250px]" />
          </div>

          <h3 className="text-black font-poppins font-semibold text-[24px] mt-5">
            Sustainable Interiors
          </h3>

          <p className="text-black font-poppins font-normal text-[16px] mt-[12px] mb-[24px]">
            Eco-conscious interiors using recycled materials, upcycled
            furniture, and energy-efficient design choices for greener living.
          </p>

          <motion.div
            className="w-full max-w-[302px] h-[302px] rounded-[28px] overflow-hidden mt-auto shrink-0"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <img
              src="/services/image 65.png"
              alt="Sustainable Interiors"
              className="w-full h-full object-cover object-bottom"
            />
          </motion.div>
        </div>

        {/* CARD 4 */}
        <div className="flex flex-col items-start h-full">
          <div className="flex items-center gap-4 w-full">
            <div className="w-[40px] h-[40px] bg-black rounded-[8px] flex justify-center items-center">
              <span className="text-[#FAFAFA] font-inter text-[16px] font-semibold">
                4
              </span>
            </div>
            <div className="flex-1 h-[2px] bg-black max-w-[250px]" />
          </div>

          <h3 className="text-black font-poppins font-semibold text-[24px] mt-[20px]">
            Project Management
          </h3>

          <p className="text-black font-poppins font-normal text-[16px] mt-[12px] mb-[24px]">
            End-to-end coordination, scheduling, vendor management, and smooth
            project execution.
          </p>

          <motion.div
            className="w-full max-w-[302px] h-[302px] rounded-[28px] overflow-hidden mt-auto shrink-0"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <img
              src="/services/image 67.png"
              alt="Project Management"
              className="w-full h-full object-cover object-bottom"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
