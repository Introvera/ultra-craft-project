"use client";

import React, { useState, useEffect, useRef } from "react";

type Service = {
  number: number;
  title: string;
  description: string;
  image: string;
};

type DragEvent = React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>;

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  // 1) Properly type the refs
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
      description: "End-to-end coordination, scheduling, vendor management, and smooth project execution.",
      image: "/services/image 67.png",
    },
    {
      number: 5,
      title: "Project Management",
      description: "End-to-end coordination, scheduling, vendor management, and smooth project execution.",
      image: "/services/image 67.png",
    },
    {
      number: 6,
      title: "Project Management",
      description: "End-to-end coordination, scheduling, vendor management, and smooth project execution.",
      image: "/services/image 67.png",
    },
  ];

  // Get items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1280) return 4; // xl
    if (window.innerWidth >= 768) return 2; // md
    return 1; // mobile
  };

  // 2) Fix hydration mismatch: start with a constant value (same on server & client)
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    // set correct value immediately after mount
    handleResize();

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

  // Reset auto-play after drag
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

  // 3) Explicit type for index to avoid implicit any
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  // Touch/Drag handlers
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

  // Make event optional so we can call handleDragEnd() without args
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
    <section className="w-full max-w-[1440px] mx-auto flex flex-col items-start px-[20px] md:px-[56px] pt-4 pb-8">
      {/* Section Title */}
      <h2 className="text-[#604D37] font-poppins font-[700] text-[32px] mb-8">
        Our Interior Solutions
      </h2>

      {/* Carousel Container */}
      <div className="relative w-full">
        {/* Carousel Wrapper */}
        <div
          ref={sliderRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => isDragging && handleDragEnd()}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div
            className="flex transition-transform ease-in-out"
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% + ${currentTranslate}px))`,
              transitionDuration: isDragging ? "0ms" : "500ms",
            }}
          >
            {services.map((service) => (
              <div
                key={service.number}
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / itemsPerView}%` }}
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
                  <p className="text-black font-poppins font-[500] text-[16px] mt-[12px] mb-[24px]">
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8 w-full">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-[#604D37]" : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
