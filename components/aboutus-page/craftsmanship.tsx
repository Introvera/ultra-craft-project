"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Craftsmanship() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden w-full mt-24 py-5 sm:py-20 md:py-28 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-[#E5E9F0]"
    >
      {/* DESKTOP GRID */}
      <div className="hidden md:grid grid-cols-3 gap-2 lg:gap-2 items-start max-w-7xl mx-auto">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-1 lg:gap-7">
          <motion.h2
            className="text-[#604D37] text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Art of Craftsmanship
          </motion.h2>

          <motion.p
            className="text-[#363636] text-[15px] leading-relaxed max-w-[420px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Craftsmanship is at the heart of everything we create. From the
            textures we choose to the joinery we refine, every detail is shaped
            with care and intention. We work with honest materials and skilled
            artisans, ensuring that each piece, and each interior feels durable,
            timeless, and deeply personal.
          </motion.p>

          <motion.div
            className="relative w-full rounded-[32px] overflow-hidden mt-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ height: "419px" }}
          >
            <Image
              src="/aboutus-page/left.png"
              alt="Craftsmanship"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* MIDDLE COLUMN */}
        <div className="flex flex-col gap-2 lg:gap-2">
          <motion.div
            className="relative w-full h-[344px] rounded-[32px] overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Image
              src="/aboutus-page/mid-top.png"
              alt="Middle Top"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="relative w-full h-[344px] rounded-[32px] overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Image
              src="/aboutus-page/mid-bottom.png"
              alt="Middle Bottom"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <motion.div
          className="relative w-full h-[695px] rounded-[32px] overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Image
            src="/aboutus-page/right.png"
            alt="Tall Chair"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* MOBILE/TABLET */}
      <div className="md:hidden max-w-xl mx-auto mt-10 flex flex-col gap-4">
        {/* Heading and description */}
        <motion.h2
          className="text-[#604D37] text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Art of Craftsmanship
        </motion.h2>

        <motion.p
          className="text-[#363636] text-[15px] leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Craftsmanship is at the heart of everything we create. From the
          textures we choose to the joinery we refine, every detail is shaped
          with care and intention. We work with honest materials and skilled
          artisans, ensuring that each piece, and each interior feels durable,
          timeless, and deeply personal.
        </motion.p>

        {/* Image grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative h-[180px] rounded-[20px] overflow-hidden">
            <Image
              src="/aboutus-page/mid-top.png"
              alt="img1"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative h-[180px] rounded-[20px] overflow-hidden">
            <Image
              src="/aboutus-page/mid-bottom.png"
              alt="img2"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative h-[180px] rounded-[20px] overflow-hidden">
            <Image
              src="/aboutus-page/left.png"
              alt="img3"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative h-[180px] rounded-[20px] overflow-hidden">
            <Image
              src="/aboutus-page/right.png"
              alt="img4"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
