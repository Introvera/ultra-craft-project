// "use client";

// import React from "react";
// import {
//   Card,
//   CardBody,
//   CardFooter,
//   Image,
//   Pagination,
// } from "@heroui/react";
// import {
//   MapPin,
//   ArrowUpRight,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { PaginationItemType } from "@heroui/react";

// /* simple classnames helper */
// function cn(...classes: Array<string | false | null | undefined>) {
//   return classes.filter(Boolean).join(" ");
// }

// type Project = {
//   id: number;
//   name: string;
//   image: string[];       
//   description: string;
//   location: string;
//   created_at: string;
// };

// const ITEMS_PER_PAGE = 9;

// const ProjectsGrid: React.FC = () => {
//   const [projects, setProjects] = React.useState<Project[]>([]);
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState<string | null>(null);
//   const [page, setPage] = React.useState(1);

//   React.useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await fetch("/api/projects");
//         if (!res.ok) throw new Error("Failed to fetch projects");

//         const data = await res.json();

//         const normalized: Project[] = (data as any[]).map((p) => {
//           let images: string[] = [];
//           if (Array.isArray(p.image)) {
//             images = p.image;
//           } else if (typeof p.image === "string" && p.image.trim().length > 0) {
//             images = [p.image];
//           }

//           return {
//             ...p,
//             image: images,
//           };
//         });

//         setProjects(normalized);
//       } catch (err: any) {
//         setError(err.message ?? "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, []);

//   const totalPages =
//     projects.length > 0
//       ? Math.ceil(projects.length / ITEMS_PER_PAGE)
//       : 1;

//   const pagedProjects = React.useMemo(() => {
//     const start = (page - 1) * ITEMS_PER_PAGE;
//     const end = start + ITEMS_PER_PAGE;
//     return projects.slice(start, end);
//   }, [projects, page]);

//   const renderPaginationItem = ({
//     ref,
//     key,
//     value,
//     isActive,
//     onNext,
//     onPrevious,
//     setPage,
//     className,
//   }: any) => {
//     if (value === PaginationItemType.NEXT) {
//       return (
//         <button
//           key={key}
//           className={cn(
//             className,
//             "bg-default-200/50 min-w-8 w-8 h-8 rounded-full flex items-center justify-center",
//           )}
//           onClick={onNext}
//         >
//           <ChevronRight className="h-4 w-4" />
//         </button>
//       );
//     }

//     if (value === PaginationItemType.PREV) {
//       return (
//         <button
//           key={key}
//           className={cn(
//             className,
//             "bg-default-200/50 min-w-8 w-8 h-8 rounded-full flex items-center justify-center",
//           )}
//           onClick={onPrevious}
//         >
//           <ChevronLeft className="h-4 w-4" />
//         </button>
//       );
//     }

//     if (value === PaginationItemType.DOTS) {
//       return (
//         <button key={key} className={className}>
//           ...
//         </button>
//       );
//     }

//     return (
//       <button
//         key={key}
//         ref={ref}
//         className={cn(
//           "min-w-8 h-8 rounded-full text-sm",
//           isActive
//             ? "text-white bg-gradient-to-br from-[#c9a16d] to-[#b38449] font-semibold"
//             : "text-default-600 bg-transparent hover:bg-default-100",
//           className,
//         )}
//         onClick={() => setPage(value)}
//       >
//         {value}
//       </button>
//     );
//   };

//   return (
//     <section className="flex min-h-screen flex-col mx-auto w-full max-w-7xl py-6 sm:mt-20">
//       {/* Heading (optional – remove if you don't want it) */}
//       {/* <h2 className="text-xl font-semibold text-default-900">
//         Projects
//       </h2> */}

//       {/* Loading / error states */}
//       {loading && (
//         <div className="mt-10 text-center text-sm text-default-500">
//           Loading projects...
//         </div>
//       )}

//       {error && !loading && (
//         <div className="mt-10 text-center text-sm text-danger">
//           {error}
//         </div>
//       )}

//       {!loading && !error && (
//         <>
//           {/* Grid of project cards */}
//           <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
//             {pagedProjects.map((project) => (
//               <Card
//                 key={project.id}
//                 shadow="none"
//                 radius="lg"
//                 classNames={{
//                     base: "rounded-3xl bg-transparent border-none shadow-none",
//                     body: "bg-transparent",
//                     footer: "bg-transparent",
//                 }}
//                 >
//                 <div className="relative">
//                     {project.image[0] ? (
//                     <Image
//                         removeWrapper
//                         alt={project.name}
//                         src={project.image[0]}
//                         className=" w-full object-cover h-96 p-2 rounded-4xl"
//                     />
//                     ) : (
//                     <div className="h-52 w-full sm:h-64 md:h-72 p-2 rounded-3xl bg-default-200" />
//                     )}
//                 </div>

//                 <CardBody className="flex flex-col gap-2 px-5 pb-4 pt-4">
//                     <h3 className="text-sm font-semibold text-default-900 sm:text-base">
//                     {project.name}
//                     </h3>

//                     <div className="flex items-center gap-1 text-xs text-default-500 sm:text-sm">
//                     <MapPin className="h-4 w-4" />
//                     <span>{project.location}</span>
//                     </div>
//                 </CardBody>

//                 <CardFooter className="flex items-center px-5 pb-4 pt-0">
//                     <button className="flex items-center gap-2 text-xs sm:text-sm font-medium text-default-500 hover:underline underline-offset-2">
//                         View Details
//                         <ArrowUpRight className="h-4 w-4" />
//                     </button>
//                 </CardFooter>
//                 </Card>
//             ))}

//             {pagedProjects.length === 0 && (
//               <div className="col-span-full rounded-2xl bg-white/60 p-8 text-center text-sm text-default-500">
//                 No projects available yet.
//               </div>
//             )}
//           </div>

//           {/* Bottom pagination / nav */}
//           <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-6 text-sm text-default-500 md:flex-row">
//             <button
//               className="flex items-center gap-1 text-xs sm:text-sm disabled:opacity-40"
//               disabled={page === 1}
//               onClick={() => page > 1 && setPage(page - 1)}
//             >
//               <ChevronLeft className="h-3 w-3" />
//               Previous
//             </button>

//             <Pagination
//               disableCursorAnimation
//               showControls
//               className="gap-2"
//               page={page}
//               total={totalPages}
//               radius="full"
//               variant="light"
//               renderItem={renderPaginationItem}
//               onChange={setPage}
//             />

//             <button
//               className="flex items-center gap-1 text-xs sm:text-sm disabled:opacity-40"
//               disabled={page === totalPages}
//               onClick={() => page < totalPages && setPage(page + 1)}
//             >
//               Next
//               <ChevronRight className="h-3 w-3" />
//             </button>
//           </div>
//         </>
//       )}
//     </section>
//   );
// };

// export default ProjectsGrid;



"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Pagination,
} from "@heroui/react";
import {
  MapPin,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PaginationItemType } from "@heroui/react";

/* simple classnames helper */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Project = {
  id: number;
  name: string;
  image: string[];
  description: string;
  location: string;
  created_at: string;
};

const ProjectsGrid: React.FC = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(9);

  // ref to scroll back to top of grid when page changes
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const hasMounted = React.useRef(false);

  // responsive items per page (4 on mobile, 9 on larger screens)
  React.useEffect(() => {
    const updateItemsPerPage = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(9);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  React.useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();

        const normalized: Project[] = (data as any[]).map((p) => {
          let images: string[] = [];
          if (Array.isArray(p.image)) {
            images = p.image;
          } else if (typeof p.image === "string" && p.image.trim().length > 0) {
            images = [p.image];
          }

          return {
            ...p,
            image: images,
          };
        });

        setProjects(normalized);
      } catch (err: any) {
        setError(err.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // scroll to top of section when page changes (but skip initial mount)
  React.useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (typeof window === "undefined") return;
    if (!sectionRef.current) return;

    const top = sectionRef.current.offsetTop;
    window.scrollTo({
      top: top - 80, // little offset for any header
      behavior: "smooth",
    });
  }, [page]);

  const totalPages =
    projects.length > 0 ? Math.ceil(projects.length / itemsPerPage) : 1;

  const pagedProjects = React.useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return projects.slice(start, end);
  }, [projects, page, itemsPerPage]);

  const renderPaginationItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: any) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(
            className,
            "bg-default-200/50 min-w-8 w-8 h-8 rounded-full flex items-center justify-center",
          )}
          onClick={onNext}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(
            className,
            "bg-default-200/50 min-w-8 w-8 h-8 rounded-full flex items-center justify-center",
          )}
          onClick={onPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          "min-w-8 h-8 rounded-full text-sm",
          isActive
            ? "text-white bg-gradient-to-br from-[#c9a16d] to-[#b38449] font-semibold"
            : "text-default-600 bg-transparent hover:bg-default-100",
          className,
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen flex-col mx-auto w-full max-w-7xl py-6 sm:mt-20"
    >
      {loading && (
        <div className="mt-10 text-center text-sm text-default-500">
          Loading projects...
        </div>
      )}

      {error && !loading && (
        <div className="mt-10 text-center text-sm text-danger">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Grid of project cards */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {pagedProjects.map((project) => (
              <Card
                key={project.id}
                shadow="none"
                radius="lg"
                classNames={{
                  base: "rounded-3xl bg-transparent border-none shadow-none",
                  body: "bg-transparent",
                  footer: "bg-transparent",
                }}
              >
                <div className="relative">
                  {project.image[0] ? (
                    <Image
                      removeWrapper
                      alt={project.name}
                      src={project.image[0]}
                      className="w-full object-cover h-96 p-2 rounded-4xl"
                    />
                  ) : (
                    <div className="h-52 w-full sm:h-64 md:h-72 p-2 rounded-3xl bg-default-200" />
                  )}
                </div>

                <CardBody className="flex flex-col gap-2 px-5 pb-4 pt-4">
                  <h3 className="text-sm font-semibold text-default-900 sm:text-base">
                    {project.name}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-default-500 sm:text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location}</span>
                  </div>
                </CardBody>

                <CardFooter className="flex items-center px-5 pb-4 pt-0">
                  <button className="flex items-center gap-2 text-xs sm:text-sm font-medium text-default-500 hover:underline underline-offset-2">
                    View Details
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </CardFooter>
              </Card>
            ))}

            {pagedProjects.length === 0 && (
              <div className="col-span-full rounded-2xl bg-white/60 p-8 text-center text-sm text-default-500">
                No projects available yet.
              </div>
            )}
          </div>

          {/* Bottom pagination / nav */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-6 text-sm text-default-500 md:flex-row">
            <button
              className="flex items-center gap-1 text-xs sm:text-sm disabled:opacity-40"
              disabled={page === 1}
              onClick={() => page > 1 && setPage(page - 1)}
            >
              <ChevronLeft className="h-3 w-3" />
              Previous
            </button>

            <Pagination
              disableCursorAnimation
              showControls
              className="gap-2"
              page={page}
              total={totalPages}
              radius="full"
              variant="light"
              renderItem={renderPaginationItem}
              onChange={setPage}
            />

            <button
              className="flex items-center gap-1 text-xs sm:text-sm disabled:opacity-40"
              disabled={page === totalPages}
              onClick={() => page < totalPages && setPage(page + 1)}
            >
              Next
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectsGrid;