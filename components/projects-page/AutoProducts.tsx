// "use client";

// import React, { useEffect, useState } from "react";
// import { Card, CardBody, Image as HeroImage, Link } from "@heroui/react";
// import { AnimatePresence, motion } from "framer-motion";
// import { ArrowUpRight, MapPin } from "lucide-react";
// import { Button } from "../ui/button";

// type Project = {
//   id: number;
//   name: string;
//   image: string[];
//   description: string;
//   location: string;
//   created_at: string;
// };

// const AUTO_INTERVAL_MS = 7000;

// const AutoProducts: React.FC = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await fetch("/api/projects");
//         if (!res.ok) throw new Error("Failed to fetch projects");
//         const data: Project[] = await res.json();
//         setProjects(data);
//       } catch (error) {
//         console.error("Error loading projects:", error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   // Auto rotate
//   useEffect(() => {
//     if (!projects.length) return;
//     const interval = setInterval(() => {
//       setActiveIndex((prev) =>
//         prev + 1 >= projects.length ? 0 : prev + 1
//       );
//     }, AUTO_INTERVAL_MS);
//     return () => clearInterval(interval);
//   }, [projects.length]);

//   if (!projects.length) return null;

//   const project = projects[activeIndex];
//   const heroImageSrc =
//     project.image?.[0] ?? "https://heroui.com/images/hero-card-complete.jpeg";

//   return (
//     <section className="w-full px-3 sm:px-0 mx-auto max-w-7xl mt-36">
//       <Card className="w-full bg-[#F4F5F7] rounded-4xl shadow-md border-0">
//         <CardBody className="p-3 sm:p-8 md:p-6">

//           {/* Only THIS animates now */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={project.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.6, ease: "easeOut" }}
//             >
//               <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">

//                 {/* LEFT — TEXT */}
//                 <div className="md:w-7/12 flex flex-col justify-between">
//                   <div className="space-y-4">
//                     <p className="text-sm font-bold uppercase text-neutral-500">
//                       Project Spotlight
//                     </p>

//                     <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
//                       {project.name}
//                     </h2>

//                     <div className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
//                       <MapPin size={20} strokeWidth={2.5} className="text-neutral-800" />
//                       <span className="text-md font-medium">
//                         {project.location}
//                       </span>
//                     </div>

//                     <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-700">
//                       {project.description}
//                     </p>
//                   </div>

//                   <div className="mt-6">
//                     <Link href="/products">
//                       <Button
//                         variant="default"
//                         size="pill"
//                         className="cursor-pointer py-5"
//                       >
//                         Explore Products
//                         <ArrowUpRight className="ml-2 size-4 sm:size-5" />
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>

//                 {/* RIGHT — IMAGE */}
//                 <div className="md:w-5/12">
//                   <div className="relative w-full overflow-hidden rounded-4xl">
//                     <div className="w-full aspect-[4/3]">
//                       <HeroImage
//                         alt={project.name}
//                         src={heroImageSrc}
//                         radius="lg"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   </div>
//                 </div>

//               </div>
//             </motion.div>
//           </AnimatePresence>

//         </CardBody>
//       </Card>
//     </section>
//   );
// };

// export default AutoProducts;


"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, Image as HeroImage, Link } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "../ui/button";

type Project = {
  id: number;
  name: string;
  image: string[];
  description: string;
  location: string;
  created_at: string;
};

const AUTO_INTERVAL_MS = 7000;

const AutoProducts: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Auto rotate
  useEffect(() => {
    if (!projects.length) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev + 1 >= projects.length ? 0 : prev + 1
      );
    }, AUTO_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [projects.length]);

  if (!projects.length) return null;

  const project = projects[activeIndex];
  const heroImageSrc =
    project.image?.[0] ?? "https://heroui.com/images/hero-card-complete.jpeg";

  return (
    <section className="w-full px-3 sm:px-0 mx-auto max-w-7xl mt-36">
      <Card className="w-full bg-[#F4F5F7] rounded-4xl shadow-md border-0">
        <CardBody className="p-4 sm:p-8 md:p-6">
          {/* Only content animates */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">
                {/* LEFT — TEXT (also hosts mobile image) */}
                <div className="md:w-7/12 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-sm font-bold uppercase text-neutral-500">
                      Project Spotlight
                    </p>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
                      {project.name}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
                      <MapPin
                        size={20}
                        strokeWidth={2.5}
                        className="text-neutral-800"
                      />
                      <span className="text-md font-medium">
                        {project.location}
                      </span>
                    </div>

                    {/* MOBILE IMAGE (between location and description) */}
                    <div className="mt-4 block md:hidden">
                      <div className="relative w-full overflow-hidden rounded-4xl">
                        <div className="w-full aspect-[4/3]">
                          <HeroImage
                            alt={project.name}
                            src={heroImageSrc}
                            radius="lg"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-700">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6">
                    <Link href="/products">
                      <Button
                        variant="default"
                        size="pill"
                        className="cursor-pointer py-5"
                      >
                        Explore Products
                        <ArrowUpRight className="ml-2 size-4 sm:size-5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* RIGHT — IMAGE (desktop only) */}
                <div className="md:w-5/12 hidden md:block">
                  <div className="relative w-full overflow-hidden rounded-4xl">
                    <div className="w-full aspect-[4/3]">
                      <HeroImage
                        alt={project.name}
                        src={heroImageSrc}
                        radius="lg"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardBody>
      </Card>
    </section>
  );
};

export default AutoProducts;