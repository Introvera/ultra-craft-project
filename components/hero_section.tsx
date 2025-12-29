"use client";

import { useScrollPosition } from "@/hooks/useScrollPosition";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import React from "react";

type ParallaxHeroProps = {
  imageUrl?: string;
  heading?: React.ReactNode;
  description?: string;
  showCta?: boolean;
  ctaLabel?: string;
  ctaTargetId?: string;
  showChevron?: boolean;
  bottomRightText?: string | React.ReactNode;
  alignTopLeft?: boolean; // NEW
};

export default function ParallaxHero({
  imageUrl = "/home/heroBackgroundimage.webp",
  heading,
  description = "Experience unparalleled craftsmanship and timeless design with Ultra Craft, where every creation tells a story of legacy and infinite living.",
  showCta = true,
  ctaLabel = "Request Consultation",
  ctaTargetId = "contact",
  showChevron = true,
  bottomRightText,
  alignTopLeft = false, // NEW default = false
}: ParallaxHeroProps) {
  const scrollY = useScrollPosition();

  const headingContent = heading ?? (
    <>
      Legacy of <br />
      <span className="font-medium">Infinite Living.</span>
    </>
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  const containerAlignment = alignTopLeft
    ? "justify-start items-start pt-28"
    : "justify-center";

  return (
    <section className="w-full bg-[var(--color-page)] px-0 xl:px-5">
      <div className="relative h-screen w-full mt-0 lg:mt-21.5 overflow-hidden flex rounded-none lg:rounded-[36px]">
        {/* Background */}
        <div
          className="absolute inset-0 z-0 flex items-center justify-center"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "120%",
          }}
        />

        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Content */}
        <div
          className={`relative min-h-screen flex flex-col w-full ${containerAlignment}`}
        >
          <motion.div
            className="relative z-20 text-white max-w-max px-6 md:px-12 lg:px-20"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.26 }}
          >
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-8xl font-inter font-bold leading-tight tracking-tight"
            >
              {headingContent}
            </motion.h1>

            {description && (
              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-lg text-sm md:text-base leading-relaxed opacity-90"
              >
                {description}
              </motion.p>
            )}

            {showCta && (
              <motion.button
                variants={fadeUp}
                className="inline-flex items-center rounded-full mt-10 px-6 py-3 text-sm font-medium cursor-pointer text-black shadow-sm bg-linear-to-r from-[var(--gradient-3)] to-[var(--gradient-4)]"
                onClick={() => {
                  const section = document.getElementById(ctaTargetId);
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {ctaLabel}
                <ArrowUpRight className="ml-2 size-5" />
              </motion.button>
            )}
          </motion.div>

          {bottomRightText && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.4 }}
              className="absolute z-20 bottom-6 right-4 md:bottom-10 md:right-10 max-w-xs md:max-w-md text-[11px] md:text-sm leading-relaxed text-white/90"
            >
              {typeof bottomRightText === "string" ? (
                <p>{bottomRightText}</p>
              ) : (
                bottomRightText
              )}
            </motion.div>
          )}

          {showChevron && !alignTopLeft && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white animate-bounce"
              style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
