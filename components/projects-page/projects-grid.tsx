"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Pagination,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { PaginationItemType } from "@heroui/react";
import {
  MapPin,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

type DragEvent =
  | React.MouseEvent<HTMLDivElement>
  | React.TouchEvent<HTMLDivElement>;

const ProjectsGrid: React.FC = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(9);

  // ref to scroll back to top of grid when page changes
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const hasMounted = React.useRef(false);

  // -------- Details Modal state --------
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } =
    useDisclosure();

  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  // -------- Carousel state (inside modal) --------
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [itemsPerView, setItemsPerView] = React.useState(1);

  const [isDragging, setIsDragging] = React.useState(false);
  const [startPos, setStartPos] = React.useState(0);
  const [currentTranslate, setCurrentTranslate] = React.useState(0);
  const [prevTranslate, setPrevTranslate] = React.useState(0);

  const sliderRef = React.useRef<HTMLDivElement | null>(null);
  const autoPlayRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = selectedProject?.image ?? [];

  // responsive items per page (4 on mobile, 9 on larger screens)
  React.useEffect(() => {
    const updateItemsPerPage = () => {
      if (typeof window === "undefined") return;
      setItemsPerPage(window.innerWidth < 640 ? 4 : 9);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // responsive carousel (2 images on desktop like screenshot, 1 on mobile)
  React.useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window === "undefined") return;
      setItemsPerView(window.innerWidth >= 1024 ? 2 : 1);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, slides.length - itemsPerView);

  const stopAutoplay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = null;
  };

  const startAutoplay = React.useCallback(() => {
    stopAutoplay();
    if (!slides.length) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
  }, [slides.length, maxIndex]);

  React.useEffect(() => {
    if (isDetailsOpen) startAutoplay();
    else stopAutoplay();

    return () => stopAutoplay();
  }, [isDetailsOpen, startAutoplay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    startAutoplay();
  };

  const goPrev = () => {
    setCurrentIndex((p) => (p <= 0 ? maxIndex : p - 1));
    startAutoplay();
  };

  const goNext = () => {
    setCurrentIndex((p) => (p >= maxIndex ? 0 : p + 1));
    startAutoplay();
  };

  const getPositionX = (event: DragEvent) =>
    "touches" in event ? event.touches[0].clientX : event.pageX;

  const handleDragStart = (event: DragEvent) => {
    if (!slides.length) return;
    setIsDragging(true);
    setStartPos(getPositionX(event));
    stopAutoplay();
  };

  const handleDragMove = (event: DragEvent) => {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    const diff = currentPosition - startPos;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const movedBy = currentTranslate - prevTranslate;
    const containerWidth = sliderRef.current?.offsetWidth || 0;
    const oneCardWidth = containerWidth / itemsPerView;
    const threshold = oneCardWidth * 0.22;

    if (movedBy < -threshold && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else if (movedBy > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setCurrentTranslate(0);
    setPrevTranslate(0);
    startAutoplay();
  };

  const openDetails = (project: Project) => {
    setSelectedProject(project);
    setCurrentIndex(0);
    setCurrentTranslate(0);
    setPrevTranslate(0);
    onDetailsOpen();
  };

  const closeDetails = () => {
    stopAutoplay();
    onDetailsClose();
    setTimeout(() => {
      setSelectedProject(null);
      setCurrentIndex(0);
      setCurrentTranslate(0);
      setPrevTranslate(0);
    }, 150);
  };

  // fetch from /api/projects
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
          if (Array.isArray(p.image)) images = p.image;
          else if (typeof p.image === "string" && p.image.trim().length > 0) {
            images = [p.image];
          }

          return { ...p, image: images };
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
      top: top - 80,
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
    setPage: _setPage,
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
        <div className="mt-10 text-center text-sm text-danger">{error}</div>
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
                  <button
                    type="button"
                    onClick={() => openDetails(project)}
                    className="flex items-center gap-2 text-xs sm:text-sm font-medium text-default-500 hover:underline underline-offset-2 cursor-pointer"
                  >
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

      {/* DETAILS MODAL (matches screenshot: title+location -> carousel -> description) */}
      <Modal
        isOpen={isDetailsOpen}
        onClose={closeDetails}
        size="5xl"
        backdrop="blur"
        placement="center"
      >
        <ModalContent className="overflow-hidden rounded-3xl">
          {() => (
            <>
              {/* Top: Title + Close */}
              <ModalHeader className="flex items-start justify-between gap-4 px-6 pt-6 pb-3">
                <div className="min-w-0">
                  <h2 className="truncate text-xl font-semibold text-default-900 sm:text-2xl">
                    {selectedProject?.name ?? ""}
                  </h2>

                  <div className="mt-2 flex items-center gap-2 text-sm text-default-500">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{selectedProject?.location ?? ""}</span>
                  </div>
                </div>

                
              </ModalHeader>

              {/* Middle: Carousel (2-up desktop, 1-up mobile) */}
              <ModalBody className="px-6 pb-0 pt-0">
                <div className="relative">
                  <div
                    ref={sliderRef}
                    className="overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing select-none"
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={() => isDragging && handleDragEnd()}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                  >
                    <div
                      className="flex"
                      style={{
                        transform: `translateX(calc(-${
                          currentIndex * (100 / itemsPerView)
                        }% + ${currentTranslate}px))`,
                        transitionDuration: isDragging ? "0ms" : "500ms",
                        transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
                      }}
                    >
                      {(slides.length ? slides : [""]).map((src, idx) => (
                        <div
                          key={`${src}-${idx}`}
                          className="flex-shrink-0"
                          style={{ width: `${100 / itemsPerView}%` }}
                        >
                          <div className="p-1">
                            {src ? (
                              <Image
                                removeWrapper
                                alt={`Project image ${idx + 1}`}
                                src={src}
                                className="h-[320px] w-full object-cover rounded-3xl sm:h-[380px] lg:h-[420px]"
                              />
                            ) : (
                              <div className="h-[320px] w-full rounded-3xl bg-default-200 sm:h-[380px] lg:h-[420px]" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dots (like screenshot) */}
                {slides.length > itemsPerView && (
                  <div className="mt-4 flex w-full items-center justify-center gap-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => {
                      const isActive = index === currentIndex;

                      // neighbor fade like screenshot
                      const isPrev = index === currentIndex - 1;
                      const opacity = isActive ? 1 : isPrev ? 0.45 : 0.22;

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => goToSlide(index)}
                          aria-label={`Go to slide ${index + 1}`}
                          className="transition-all duration-300"
                        >
                          {isActive ? (
                            <div
                              className="h-2 w-6 rounded-full transition-all duration-300"
                              style={{ backgroundColor: "#c9a16d" }}
                            />
                          ) : (
                            <div
                              className="h-2 w-2 rounded-full transition-all duration-300"
                              style={{ backgroundColor: "rgba(0,0,0,1)", opacity }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </ModalBody>

              {/* Bottom: Description */}
              <ModalFooter className="px-6 pb-6 pt-5">
                <p className="text-sm leading-6 text-default-600">
                  {selectedProject?.description ?? ""}
                </p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default ProjectsGrid;