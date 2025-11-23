import React from "react";

export default function Services() {
  return (
    <section className="w-full max-w-[1440px] mx-auto flex flex-col items-start px-[20px] md:px-[56px] py-[60px]">
      {/* Section Title */}
      <h2 className="text-[#604D37] font-poppins font-[700] text-[32px]">
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
              <span className="text-[#FAFAFA] font-inter text-[16px] font-[600]">
                1
              </span>
            </div>
            <div className="flex-1 h-[2px] bg-black max-w-[250px]" />
          </div>

          {/* Heading */}
          <h3 className="text-black font-poppins font-[600] text-[24px] mt-[20px]">
            Commercial Interiors
          </h3>

          {/* Content */}
          <p className="text-black font-poppins font-[500] text-[16px] mt-[12px] mb-[24px]">
            Modern, functional interiors for offices, corporate floors, reception
            areas, workstations, and commercial spaces, designed to improve
            efficiency and elevate presence.
          </p>

          {/* Image (bottom-aligned crop) */}
          <div className="w-full max-w-[302px] h-[302px] rounded-[28px] overflow-hidden mt-auto flex-shrink-0">
            <img
              src="/services/image 56.png"
              alt="Commercial Interiors"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
        </div>

        {/* CARD 2 */}
        <div className="flex flex-col items-start h-full">
          <div className="flex items-center gap-4 w-full">
            <div className="w-[40px] h-[40px] bg-black rounded-[8px] flex justify-center items-center">
              <span className="text-[#FAFAFA] font-inter text-[16px] font-[600]">
                2
              </span>
            </div>
            <div className="flex-1 h-[2px] bg-black max-w-[250px]" />
          </div>

          <h3 className="text-black font-poppins font-[600] text-[24px] mt-[20px]">
            Residential Interiors
          </h3>

          <p className="text-black font-poppins font-[500] text-[16px] mt-[12px] mb-[24px]">
            Interior solutions for living rooms, bedrooms, kitchens, dining
            areas, and entire apartments, blending comfort, beauty, and everyday
            function.
          </p>

          <div className="w-full max-w-[302px] h-[302px] rounded-[28px] overflow-hidden mt-auto flex-shrink-0">
            <img
              src="/services/image 64.png"
              alt="Residential Interiors"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
        </div>

        {/* CARD 3 */}
        <div className="flex flex-col items-start h-full">
          <div className="flex items-center gap-4 w-full">
            <div className="w-[40px] h-[40px] bg-black rounded-[8px] flex justify-center items-center">
              <span className="text-[#FAFAFA] font-inter text-[16px] font-[600]">
                3
              </span>
            </div>
            <div className="flex-1 h-[2px] bg-black max-w-[250px]" />
          </div>

          <h3 className="text-black font-poppins font-[600] text-[24px] mt-[20px]">
            Sustainable Interiors
          </h3>

          <p className="text-black font-poppins font-[500] text-[16px] mt-[12px] mb-[24px]">
            Eco-conscious interiors using recycled materials, upcycled
            furniture, and energy-efficient design choices for greener living.
          </p>

          <div className="w-full max-w-[302px] h-[302px] rounded-[28px] overflow-hidden mt-auto flex-shrink-0">
            <img
              src="/services/image 65.png"
              alt="Sustainable Interiors"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
        </div>

        {/* CARD 4 */}
        <div className="flex flex-col items-start h-full">
          <div className="flex items-center gap-4 w-full">
            <div className="w-[40px] h-[40px] bg-black rounded-[8px] flex justify-center items-center">
              <span className="text-[#FAFAFA] font-inter text-[16px] font-[600]">
                4
              </span>
            </div>
            <div className="flex-1 h-[2px] bg-black max-w-[250px]" />
          </div>

          <h3 className="text-black font-poppins font-[600] text-[24px] mt-[20px]">
            Project Management
          </h3>

          <p className="text-black font-poppins font-[500] text-[16px] mt-[12px] mb-[24px]">
            End-to-end coordination, scheduling, vendor management, and smooth
            project execution.
          </p>

          <div className="w-full max-w-[302px] h-[302px] rounded-[28px] overflow-hidden mt-auto flex-shrink-0">
            <img
              src="/services/image 67.png"
              alt="Project Management"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
