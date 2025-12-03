"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Project {
  id: string;
  title: string;
  location: string;
  image: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Havelock City Apartments",
    location: "Colombo 6",
    image: "/projects/uc01.png",
  },
  {
    id: "2",
    title: "Havelock City Apartments",
    location: "Colombo 6",
    image: "/projects/uc02.png",
  },
  {
    id: "3",
    title: "Havelock City Apartments",
    location: "Colombo 6",
    image: "/projects/uc03.png",
  },
  {
    id: "4",
    title: "Havelock City Apartments",
    location: "Colombo 6",
    image: "/projects/uc04.png",
  },
  {
    id: "5",
    title: "Havelock City Apartments",
    location: "Colombo 6",
    image: "/projects/uc05.png",
  },
  {
    id: "6",
    title: "Havelock City Apartments",
    location: "Colombo 6",
    image: "/projects/uc06.png",
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

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // appear-on-scroll
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
      className="relative overflow-hidden w-full mt-24 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-10"
    >
      <div
        className={`max-w-7xl mx-auto transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Heading + actions */}
        <div className="mb-10 sm:mb-12 md:mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--color-topic)]">
              Spaces We Transformed
            </h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-black max-w-2xl text-pretty">
              A glimpse into the homes, apartments, and commercial environments
              we&apos;ve shaped with thoughtful design and meticulous detail.
            </p>
          </div>

          {/* Desktop / tablet buttons */}
          <div className="hidden md:flex flex-wrap gap-3 md:gap-4">
            <button
              className="
                inline-flex items-center rounded-full px-6 py-3 text-sm font-medium cursor-pointer
                text-black shadow-sm
                bg-linear-to-r from-[var(--gradient-3)] to-[var(--gradient-4)]
              "
              onClick={() => {
                const contactSection = document.getElementById("contact");
                contactSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Request Consultation
              <ArrowUpRight className="ml-2 size-5" />
            </button>

            <Link href="/projects">
            <button
              className="
                inline-flex items-center rounded-full px-6 py-3 text-sm font-medium cursor-pointer
                text-white shadow-sm
                bg-black
              "
            >
              More Projects
              <ArrowUpRight className="ml-2 size-5" />
            </button>
            </Link>
          </div>
        </div>

        {/* DESKTOP GRID (staggered columns) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-max">
          {/* Left column - projects 0, 3 */}
          <div className="flex flex-col gap-6 md:gap-8">
            {[projects[0], projects[3]].map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0 + index * 0.15,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          {/* Middle column - projects 1, 4 (offset down) */}
          <div className="flex flex-col gap-6 md:gap-8 md:pt-24 lg:pt-28">
            {[projects[1], projects[4]].map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + index * 0.15,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          {/* Right column - projects 2, 5 */}
          <div className="flex flex-col gap-6 md:gap-8">
            {[projects[2], projects[5]].map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.15,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile buttons under card */}
        <div className="mt-4 flex w-full max-w-sm flex-wrap gap-3 mb-10 md:hidden">
          <button
            className="
                inline-flex items-center rounded-full px-6 py-3 text-sm font-medium cursor-pointer
                text-black shadow-sm
                bg-linear-to-r from-[var(--gradient-3)] to-[var(--gradient-4)]
              "
            onClick={() => {
              const contactSection = document.getElementById("contact");
              contactSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Request Consultation
            <ArrowUpRight className="ml-2 size-5" />
          </button>
          <button
            className="
                inline-flex items-center rounded-full px-6 py-3 text-sm font-medium cursor-pointer
                text-white shadow-sm
                bg-black
              "
          >
            Explore Products
            <ArrowUpRight className="ml-2 size-5" />
          </button>
        </div>
        {/* MOBILE CAROUSEL */}
        <div className="md:hidden flex flex-col items-center gap-4">
          {/* Animated card */}
          <div className="w-full max-w-sm">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={projects[activeIndex].id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ProjectCard project={projects[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-2 flex items-center justify-center gap-2">
            {projects.map((_, index) => (
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
                      ? "w-4 bg-[var(--uc-dot-active-bg)]"
                      : "w-2 bg-black opacity-20 hover:opacity-60"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden rounded-4xl border-0 bg-white p-2">
      {/* Image */}
      <div className="relative h-full overflow-hidden rounded-t-2xl">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover rounded-4xl"
        />

        {/* Location badge */}
        <div className="absolute top-4 right-4 bg-black/55 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs sm:text-sm flex items-center gap-1">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{project.location}</span>
        </div>
      </div>

      {/* Content */}
      <CardContent className="px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-2">
            {project.title}
          </h3>

          <button className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-black text-white rounded-full hover:bg-neutral-900 transition cursor-pointer">
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
