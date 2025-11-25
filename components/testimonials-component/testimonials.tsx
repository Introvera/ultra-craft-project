"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Tharaka Ranasinghe",
    role: "Homeowner",
    avatar: "/avatar.jpg",
    text: "Ultracraft transformed our apartment into a warm, modern home. Every detail felt intentional, and the final result was far beyond what we imagined.",
  },
  {
    name: "Akhil Jayasinghe",
    role: "Project Coordinator, Prime Residencies",
    avatar: "/avatar.jpg",
    text: "We’ve collaborated with Ultracraft on several projects, and their craftsmanship, professionalism, and consistency have made them one of our most trusted interior partners.",
  },
  {
    name: "Ishan Fernando",
    role: "Office Operations Manager",
    avatar: "/avatar.jpg",
    text: "Our new office interior is both functional and inviting. The team managed the entire process smoothly and delivered a space that truly reflects our brand.",
  },
  {
    name: "Akhil Jayasinghe",
    role: "Project Coordinator, Prime Residencies",
    avatar: "/avatar.jpg",
    text: "We’ve collaborated with Ultracraft on several projects, and their craftsmanship, professionalism, and consistency have made them one of our most trusted interior partners.",
  },
  {
    name: "Ishan Fernando",
    role: "Office Operations Manager",
    avatar: "/avatar.jpg",
    text: "Our new office interior is both functional and inviting. The team managed the entire process smoothly and delivered a space that truly reflects our brand.",
  },
  {
    name: "Akhil Jayasinghe",
    role: "Project Coordinator, Prime Residencies",
    avatar: "/avatar.jpg",
    text: "We’ve collaborated with Ultracraft on several projects, and their craftsmanship, professionalism, and consistency have made them one of our most trusted interior partners.",
  },
  {
    name: "Ishan Fernando",
    role: "Office Operations Manager",
    avatar: "/avatar.jpg",
    text: "Our new office interior is both functional and inviting. The team managed the entire process smoothly and delivered a space that truly reflects our brand.",
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [slidesPerPage, setSlidesPerPage] = useState(1);

  // Update slides per page based on screen width
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerPage(window.innerWidth >= 768 ? 3 : 1); // md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(testimonials.length / slidesPerPage);

  const nextSlide = () =>
    setCurrent((prev) => (prev + slidesPerPage) % testimonials.length);
  const prevSlide = () =>
    setCurrent(
      (prev) =>
        (prev - slidesPerPage + testimonials.length) % testimonials.length
    );

  return (
    <div className="w-full max-w-[1440px] flex flex-col items-start mx-auto px-6 sm:px-8 md:px-10 lg:px-16 mt-36">
      <h2 className="text-[#604D37] font-poppins font-[700] text-[32px]">
        Experiences That Matter
      </h2>
      <p className="text-gray-600 mb-8 font-poppins font-[500] text-[16px]">
        Real stories from the people whose homes and workspaces we’ve
        transformed.
      </p>

      <div className="relative overflow-hidden w-full">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${(current / slidesPerPage) * 100}%)`,
          }}
        >
          {testimonials.map((t, index) => (
            <div key={index} className="flex-shrink-0 w-full md:w-1/3 px-2">
              <div className="bg-[#F5F5F5] rounded-3xl p-6 h-full shadow-md flex flex-col justify-between">
                <svg
                  width="50"
                  height="50"
                  fill="#A89380"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 349.078 349.078"
                  xmlSpace="preserve"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <path d="M150.299,26.634v58.25c0,7.9-6.404,14.301-14.304,14.301c-28.186,0-43.518,28.909-45.643,85.966h45.643 c7.9,0,14.304,6.407,14.304,14.304v122.992c0,7.896-6.404,14.298-14.304,14.298H14.301C6.398,336.745,0,330.338,0,322.447V199.455 c0-27.352,2.754-52.452,8.183-74.611c5.568-22.721,14.115-42.587,25.396-59.048c11.608-16.917,26.128-30.192,43.16-39.44 C93.886,17.052,113.826,12.333,136,12.333C143.895,12.333,150.299,18.734,150.299,26.634z M334.773,99.186 c7.896,0,14.305-6.407,14.305-14.301v-58.25c0-7.9-6.408-14.301-14.305-14.301c-22.165,0-42.108,4.72-59.249,14.023 c-17.035,9.248-31.563,22.523-43.173,39.44c-11.277,16.461-19.824,36.328-25.393,59.054c-5.426,22.166-8.18,47.266-8.18,74.605 v122.992c0,7.896,6.406,14.298,14.304,14.298h121.69c7.896,0,14.299-6.407,14.299-14.298V199.455 c0-7.896-6.402-14.304-14.299-14.304h-44.992C291.873,128.095,306.981,99.186,334.773,99.186z"></path>
                    </g>
                  </g>
                </svg>

                <p className="text-gray-600 flex-1 mt-3">{t.text}</p>
                <div className="flex mt-9 items-center">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <span className="ml-3 text-gray-800 font-semibold">
                    {t.name}
                    <br />
                    <span className="text-sm text-gray-500">{t.role}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Pagination Dots */}
        <motion.div
          className="flex justify-center items-center gap-2 mt-8 w-full"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => {
            const isActive = pageIndex === Math.floor(current / slidesPerPage);
            return (
              <button
                key={pageIndex}
                onClick={() => setCurrent(pageIndex * slidesPerPage)}
                aria-label={`Go to slide ${pageIndex + 1}`}
                className="transition-all duration-300"
              >
                {isActive ? (
                  <div
                    className="rounded-full transition-all duration-300 sm:w-[24px] sm:h-[10px] w-[20px] h-[8px]"
                    style={{ backgroundColor: "var(--uc-dot-color, #604D37)" }}
                  />
                ) : (
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <circle
                      cx="5"
                      cy="5"
                      r="5"
                      fill="var(--uc-dot-color, #604D37)"
                      fillOpacity={0.2}
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
