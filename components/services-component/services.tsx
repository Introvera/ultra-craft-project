"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

type Service = {
  number: number;
  title: string;
  description: string;
  image: string;
};

type DragEvent =
  | React.MouseEvent<HTMLDivElement>
  | React.TouchEvent<HTMLDivElement>;

// Animation variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

const cardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const services: Service[] = [
    {
      number: 1,
      title: "Commercial Interiors",
      description:
        "Modern, functional interiors for offices, corporate floors, reception areas, workstations, and commercial spaces, designed to improve efficiency and elevate presence.",
      image: "/services/image 56.png",
    },
    {
      number: 2,
      title: "Residential Interiors",
      description:
        "Interior solutions for living rooms, bedrooms, kitchens, dining areas, and entire apartments, blending comfort, beauty, and everyday function.",
      image: "/services/image 64.png",
    },
    {
      number: 3,
      title: "Sustainable Interiors",
      description:
        "Eco-conscious interiors using recycled materials, upcycled furniture, and energy-efficient design choices for greener living.",
      image: "/services/image 65.png",
    },
    {
      number: 4,
      title: "Project Management",
      description:
        "End-to-end coordination, scheduling, vendor management, and smooth project execution.",
      image: "/services/image 67.png",
    },
  ];

  // Decide how many cards to show based on width
  const getItemsPerView = () => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;

    if (width >= 1536) return 4; // very large desktop
    if (width >= 1024) return 3; // laptop / large tablet landscape
    if (width >= 768) return 2; // tablet
    return 1; // mobile
  };

  // Start with 1 to match server render (avoid hydration issues)
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    handleResize(); // correct value right after mount

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, services.length - itemsPerView);

  // Auto-play functionality
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000); // Change slide every 3 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [maxIndex]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  // Touch/Drag helpers
  const getPositionX = (event: DragEvent) => {
    return "touches" in event ? event.touches[0].clientX : event.pageX;
  };

  const handleDragStart = (event: DragEvent) => {
    setIsDragging(true);
    setStartPos(getPositionX(event));
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleDragMove = (event: DragEvent) => {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    const diff = currentPosition - startPos;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleDragEnd = (_event?: DragEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const movedBy = currentTranslate - prevTranslate;
    const containerWidth = sliderRef.current?.offsetWidth || 0;
    const threshold = containerWidth / itemsPerView / 4; // 25% of one card width

    if (movedBy < -threshold && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else if (movedBy > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setCurrentTranslate(0);
    setPrevTranslate(0);
    resetAutoPlay();
  };

  return (
    <motion.section
      id="services"
      className="w-full max-w-[1440px] mx-auto flex flex-col items-start px-[20px] md:px-[56px] pt-4 pb-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Section Title */}
      <motion.h2
        className="text-[#604D37] font-poppins font-[700] text-[32px] mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      >
        Our Interior Solutions
      </motion.h2>

      {/* Carousel Container */}
      <div className="relative w-full">
        <motion.div
          ref={sliderRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => isDragging && handleDragEnd()}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div
            className="flex transition-transform ease-in-out"
            style={{
              transform: `translateX(calc(-${
                currentIndex * (100 / itemsPerView)
              }% + ${currentTranslate}px))`,
              transitionDuration: isDragging ? "0ms" : "500ms",
            }}
          >
            {services.map((service) => (
              <motion.div
                key={service.number}
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / itemsPerView}%` }}
                variants={cardVariants}
              >
                <div className="flex flex-col items-start h-full">
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
                  <p className="text-black font-poppins font-[500] text-[16px] mt-[12px] mb-[24px] max-w-[380px]">
                    {service.description}
                  </p>

                  {/* Image */}
                  <div className="w-full max-w-[302px] h-[302px] rounded-[28px] overflow-hidden mt-auto flex-shrink-0 bg-gray-200">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-bottom"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Dots Indicator */}
      <motion.div
        className="flex justify-center items-center gap-2 mt-8 w-full"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {Array.from({ length: maxIndex + 1 }).map((_, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="transition-all duration-300"
            >
              {isActive ? (
                <div
                  className="
                  rounded-full
                  transition-all duration-300
                  sm:w-[24px] sm:h-[10px]
                  w-[20px] h-[8px]
                "
                style={{
                  backgroundColor: "var(--uc-dot-active-bg)",
                }}
              />
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10">
                <circle
                  cx="5"
                  cy="5"
                  r="5"
                  fill="var(--uc-dot-color)"
                  fillOpacity={index === currentIndex - 1 ? "0.40" : "0.20"}
                />
              ) : (
                </svg>
              )}
            </button>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
