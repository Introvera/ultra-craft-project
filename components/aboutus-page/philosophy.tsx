// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import Image from "next/image";
// import { ArrowUpRight } from "lucide-react";
// import { Button } from "../ui/button";
// import { Link } from "@heroui/react";

// type PhilosophyItem = {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   variant: "dark" | "light";
//   imageAlign: "left" | "center" | "right";
//   imageTopClass: string;
//   imageWidthClass: string;
//   cardPaddingTopClass: string;
// };

// const philosophyItems: PhilosophyItem[] = [
//   {
//     id: 1,
//     title: "Intentional Design",
//     description:
//       "Every space is shaped with purpose, from the flow of a room to the textures that define its mood. We believe that thoughtful design enhances how people live, work, and feel every day.",
//     image: "/aboutus-page/philosophy1.png",
//     variant: "dark",
//     imageAlign: "center",
//     imageTopClass: "-top-40 sm:-top-24 md:-top-48 lg:-top-69",
//     imageWidthClass: "w-[220px] sm:w-[220px] md:w-[260px] lg:w-[310px]",
//     cardPaddingTopClass: "pt-34 sm:pt-28 md:pt-40 lg:pt-44",
//   },
//   {
//     id: 2,
//     title: "Honest Craftsmanship",
//     description:
//       "Materials matter. Craft matters. We prioritize quality, longevity, and attention to detail, ensuring every piece and every space is built to last and feel meaningful.",
//     image: "/aboutus-page/philosophy2.png",
//     variant: "light",
//     imageAlign: "center",
//     imageTopClass: "-top-28 sm:-top-28 md:-top-32 lg:-top-36",
//     imageWidthClass: "w-[250px] sm:w-[240px] md:w-[280px] lg:w-[350px]",
//     cardPaddingTopClass: "pt-34 sm:pt-32 md:pt-44 lg:pt-48",
//   },
//   {
//     id: 3,
//     title: "Human-Centered Living",
//     description:
//       "Great interiors begin with understanding people. We design around real lifestyles, stories, and emotions, creating spaces that feel personal, warm, and deeply connected to those who inhabit them.",
//     image: "/aboutus-page/philosophy3.png",
//     variant: "dark",
//     imageAlign: "center",
//     imageTopClass: "-top-26 sm:-top-22 md:-top-26 lg:-top-35",
//     imageWidthClass: "w-[220px] sm:w-[210px] md:w-[250px] lg:w-[290px]",
//     cardPaddingTopClass: "pt-34 sm:pt-28 md:pt-38 lg:pt-40",
//   },
// ];

// const slideVariants = {
//   enter: (direction: number) => ({
//     x: direction === 1 ? 40 : -40,
//     opacity: 0,
//   }),
//   center: {
//     x: 0,
//     opacity: 1,
//   },
//   exit: (direction: number) => ({
//     x: direction === 1 ? -40 : 40,
//     opacity: 0,
//   }),
// };

// const Philosophy = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [direction, setDirection] = useState<1 | -1>(1);

//   const sectionRef = useRef<HTMLElement | null>(null);
//   const [inView, setInView] = useState(false);

//   useEffect(() => {
//     if (!sectionRef.current) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setInView(true);
//             observer.disconnect();
//           }
//         });
//       },
//       { threshold: 0.25 }
//     );

//     observer.observe(sectionRef.current);

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden w-full mt-24 py-5 sm:py-20 md:py-28 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-[#E5E9F0]"
//     >
//       <div
//         className={`mx-auto w-full max-w-7xl transition-all duration-700 ${
//           inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//         }`}
//       >
//         {/* Heading + text */}
//         <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-start lg:justify-between">
//           <div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--color-topic)]">
//               The Ultracraft Philosophy
//             </h2>
//           </div>

//           <div className="max-w-xl">
//             <p className="text-sm sm:text-base md:text-lg leading-relaxed text-black mb-4 sm:mb-6">
//               We believe interiors should be felt as much as they are seen.
//               Every space we design begins with understanding how people live,
//               what they value, and how a room should make them feel. From
//               materials to mood, we craft with intention, creating environments
//               that bring comfort, clarity, and a sense of belonging. We approach
//               each project as a collaboration, listening closely, observing the
//               way light moves through a space, and carefully shaping elements
//               that enhance both function and atmosphere.
//             </p>

//             <Link href="/products">
//               <Button variant="coffee" size="pill" className="cursor-pointer">
//                 Explore Products
//                 <ArrowUpRight className="ml-2 size-4 sm:size-5" />
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {/* Desktop cards – only from lg and up */}
//         <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-16 lg:mt-32">
//           {philosophyItems.map((item, index) => (
//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{
//                 duration: 0.6,
//                 delay: 0.1 * index,
//                 ease: [0.22, 0.61, 0.36, 1],
//               }}
//               viewport={{ once: true, amount: 0.2 }}
//               className={
//                 index === 0
//                   ? "lg:-mt-20" // highest
//                   : index === 1
//                   ? "lg:mt-20" // middle
//                   : "lg:mt-60" // lowest
//               }
//             >
//               <PhilosophyCard item={item} />
//             </motion.div>
//           ))}
//         </div>

//         {/* Carousel – mobile + tablet (up to < lg) */}
//         <div className="mt-32 flex flex-col items-center gap-4 lg:hidden">
//           <div className="w-full max-w-sm">
//             <AnimatePresence mode="wait" custom={direction} initial={false}>
//               <motion.div
//                 key={philosophyItems[activeIndex].id}
//                 custom={direction}
//                 variants={slideVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{ duration: 0.3, ease: "easeOut" }}
//               >
//                 <PhilosophyCard item={philosophyItems[activeIndex]} />
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           <div className="mt-2 flex items-center justify-center gap-2">
//             {philosophyItems.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   if (index === activeIndex) return;
//                   setDirection(index > activeIndex ? 1 : -1);
//                   setActiveIndex(index);
//                 }}
//                 className={`h-2 rounded-full transition-all duration-300 ${
//                   index === activeIndex
//                     ? "w-4 bg-[var(--uc-dot-active-bg)]"
//                     : "w-2 bg-black opacity-20 hover:opacity-60"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// function PhilosophyCard({ item }: { item: PhilosophyItem }) {
//   const isDark = item.variant === "dark";

//   let alignClass = "";
//   if (item.imageAlign === "left") {
//     alignClass = "left-4 sm:left-6 md:left-8";
//   } else if (item.imageAlign === "right") {
//     alignClass = "right-4 sm:right-6 md:right-8";
//   } else {
//     alignClass = "left-1/2 -translate-x-1/2 flex justify-center w-full";
//   }

//   return (
//     <div
//       className={`relative rounded-3xl sm:rounded-[32px] px-5 sm:px-6 md:px-7 lg:px-8 ${item.cardPaddingTopClass} pb-6 sm:pb-7 md:pb-8 overflow-visible shadow-[0_26px_70px_rgba(0,0,0,0.25)] min-h-[260px] md:min-h-[320px] lg:min-h-[360px] ${
//         isDark
//           ? "bg-[var(--card-black-background)] text-white"
//           : "bg-white text-black"
//       }`}
//     >
//       {/* Overflowing image with per-card sizing & top offset */}
//       <div className={`absolute ${item.imageTopClass} ${alignClass}`}>
//         <Image
//           src={item.image || "/placeholder.svg"}
//           alt={item.title}
//           width={480}
//           height={480}
//           className={`${item.imageWidthClass} h-auto object-contain`}
//         />
//       </div>

//       <h3 className="text-base sm:text-lg md:text-2xl font-bold mb-2">
//         {item.title}
//       </h3>
//       <p
//         className={`text-xs sm:text-sm md:text-base font-semibold leading-relaxed ${
//           isDark ? "text-white" : "text-black"
//         }`}
//       >
//         {item.description}
//       </p>
//     </div>
//   );
// }

// export default Philosophy;


"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@heroui/react";

type PhilosophyItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  variant: "dark" | "light";
  imageAlign: "left" | "center" | "right";
  imageTopClass: string;
  imageWidthClass: string;
  cardPaddingTopClass: string;
};

const philosophyItems: PhilosophyItem[] = [
  {
    id: 1,
    title: "Intentional Design",
    description:
      "Every space is shaped with purpose, from the flow of a room to the textures that define its mood. We believe that thoughtful design enhances how people live, work, and feel every day.",
    image: "/aboutus-page/philosophy1.png",
    variant: "dark",
    imageAlign: "center",
    imageTopClass: "-top-40 sm:-top-24 md:-top-48 lg:-top-69",
    imageWidthClass: "w-[220px] sm:w-[220px] md:w-[260px] lg:w-[310px]",
    cardPaddingTopClass: "pt-34 sm:pt-28 md:pt-40 lg:pt-44",
  },
  {
    id: 2,
    title: "Honest Craftsmanship",
    description:
      "Materials matter. Craft matters. We prioritize quality, longevity, and attention to detail, ensuring every piece and every space is built to last and feel meaningful.",
    image: "/aboutus-page/philosophy2.png",
    variant: "light",
    imageAlign: "center",
    imageTopClass: "-top-28 sm:-top-28 md:-top-32 lg:-top-36",
    imageWidthClass: "w-[250px] sm:w-[240px] md:w-[280px] lg:w-[350px]",
    cardPaddingTopClass: "pt-34 sm:pt-32 md:pt-44 lg:pt-48",
  },
  {
    id: 3,
    title: "Human-Centered Living",
    description:
      "Great interiors begin with understanding people. We design around real lifestyles, stories, and emotions, creating spaces that feel personal, warm, and deeply connected to those who inhabit them.",
    image: "/aboutus-page/philosophy3.png",
    variant: "dark",
    imageAlign: "center",
    imageTopClass: "-top-26 sm:-top-22 md:-top-26 lg:-top-35",
    imageWidthClass: "w-[220px] sm:w-[210px] md:w-[250px] lg:w-[290px]",
    cardPaddingTopClass: "pt-34 sm:pt-28 md:pt-38 lg:pt-40",
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

const Philosophy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden w-full mt-24 py-5 sm:py-20 md:py-28 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-[#E5E9F0]"
    >
      <div
        className={`mx-auto w-full max-w-7xl transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Heading + text */}
        <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--color-topic)]">
              The Ultracraft Philosophy
            </h2>
          </div>

          <div className="max-w-xl">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-black mb-4 sm:mb-6">
              We believe interiors should be felt as much as they are seen.
              Every space we design begins with understanding how people live,
              what they value, and how a room should make them feel. From
              materials to mood, we craft with intention, creating environments
              that bring comfort, clarity, and a sense of belonging. We approach
              each project as a collaboration, listening closely, observing the
              way light moves through a space, and carefully shaping elements
              that enhance both function and atmosphere.
            </p>

            <Link href="/products">
              <Button variant="coffee" size="pill" className="cursor-pointer">
                Explore Products
                <ArrowUpRight className="ml-2 size-4 sm:size-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop cards – only from lg and up */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-16 lg:mt-32">
          {philosophyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={
                inView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 40 }
              }
              transition={{
                duration: 0.6,
                delay: 0.1 * index,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className={
                index === 0
                  ? "lg:-mt-20" // highest
                  : index === 1
                  ? "lg:mt-20" // middle
                  : "lg:mt-60" // lowest
              }
            >
              <PhilosophyCard item={item} />
            </motion.div>
          ))}
        </div>

        {/* Carousel – mobile + tablet (up to < lg) */}
        <div className="mt-32 flex flex-col items-center gap-4 lg:hidden">
          <div className="w-full max-w-sm">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={philosophyItems[activeIndex].id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <PhilosophyCard item={philosophyItems[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-2 flex items-center justify-center gap-2">
            {philosophyItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index === activeIndex) return;
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-4 bg-[var(--uc-dot-active-bg)]"
                    : "w-2 bg-black opacity-20 hover:opacity-60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function PhilosophyCard({ item }: { item: PhilosophyItem }) {
  const isDark = item.variant === "dark";

  let alignClass = "";
  if (item.imageAlign === "left") {
    alignClass = "left-4 sm:left-6 md:left-8";
  } else if (item.imageAlign === "right") {
    alignClass = "right-4 sm:right-6 md:right-8";
  } else {
    alignClass = "left-1/2 -translate-x-1/2 flex justify-center w-full";
  }

  return (
    <div
      className={`relative rounded-3xl sm:rounded-[32px] px-5 sm:px-6 md:px-7 lg:px-8 ${item.cardPaddingTopClass} pb-6 sm:pb-7 md:pb-8 overflow-visible shadow-[0_26px_70px_rgba(0,0,0,0.25)] min-h-[260px] md:min-h-[320px] lg:min-h-[360px] ${
        isDark
          ? "bg-[var(--card-black-background)] text-white"
          : "bg-white text-black"
      }`}
    >
      {/* Overflowing image with per-card sizing & top offset */}
      <div className={`absolute ${item.imageTopClass} ${alignClass}`}>
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          width={480}
          height={480}
          className={`${item.imageWidthClass} h-auto object-contain`}
        />
      </div>

      <h3 className="text-base sm:text-lg md:text-2xl font-bold mb-2">
        {item.title}
      </h3>
      <p
        className={`text-xs sm:text-sm md:text-base font-semibold leading-relaxed ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        {item.description}
      </p>
    </div>
  );
}

export default Philosophy;