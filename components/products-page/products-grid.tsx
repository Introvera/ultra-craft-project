"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
  Input,
  Pagination,
  PaginationItemType,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  SlidersHorizontal,
} from "lucide-react";

/* simple classnames helper */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Product = {
  id: number;
  name: string;
  image: string[]; 
  short_description: string;
  long_description: string;
  created_at: string;
  categories: string[];
  filters: string[];
};

const CATEGORY_OPTIONS = [
  { key: "seating", label: "Seating" },
  { key: "sofas", label: "Sofas" },
  { key: "chairs", label: "Chairs" },
  { key: "tables", label: "Tables" },
  { key: "storage", label: "Storage" },
  { key: "beds", label: "Beds" },
  { key: "lighting", label: "Lighting" },
];

const FILTER_OPTIONS = [
  { key: "wood", label: "Wood" },
  { key: "metal", label: "Metal" },
  { key: "fabric", label: "Fabric" },
  { key: "leather", label: "Leather" },
  { key: "premium", label: "Premium" },
  { key: "compact", label: "Compact" },
  { key: "outdoor", label: "Outdoor" },
];

const ITEMS_PER_PAGE = 12;

export default function ProductsGridClient() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [activeCategory, setActiveCategory] = React.useState<string>(
    CATEGORY_OPTIONS[0]?.key ?? "",
  );
  const [activeFilters, setActiveFilters] = React.useState<Set<string>>(
    new Set(),
  );
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // fetch from /api/products
  // React.useEffect(() => {
  //   const load = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       const res = await fetch("/api/products");
  //       if (!res.ok) throw new Error("Failed to fetch products");
  //       const data = (await res.json()) as Product[];

  //       const normalized = data.map((p) => ({
  //         ...p,
  //         categories: Array.isArray(p.categories) ? p.categories : [],
  //         filters: Array.isArray(p.filters) ? p.filters : [],
  //       }));

  //       setProducts(normalized);
  //     } catch (err: any) {
  //       setError(err.message ?? "Something went wrong");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   load();
  // }, []);

  React.useEffect(() => {
  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      const normalized: Product[] = (data as any[]).map((p) => {
        let images: string[] = [];
        if (Array.isArray(p.image)) {
          images = p.image;
        } else if (typeof p.image === "string" && p.image.trim().length > 0) {
          images = [p.image];
        }

        return {
          ...p,
          image: images,
          categories: Array.isArray(p.categories) ? p.categories : [],
          filters: Array.isArray(p.filters) ? p.filters : [],
        };
      });

      setProducts(normalized);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  load();
}, []);

  const toggleFilter = (key: string) => {
    setPage(1);
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters(new Set());
    setPage(1);
  };

  // filtering
  const filteredProducts = React.useMemo(() => {
    return products.filter((p) => {
      if (activeCategory && !p.categories.includes(activeCategory)) {
        return false;
      }

      if (activeFilters.size > 0) {
        const hasAny = p.filters.some((f) => activeFilters.has(f));
        if (!hasAny) return false;
      }

      if (search.trim()) {
        const term = search.trim().toLowerCase();
        if (!p.name.toLowerCase().includes(term)) return false;
      }

      return true;
    });
  }, [products, activeCategory, activeFilters, search]);

  const totalPages =
    filteredProducts.length > 0
      ? Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
      : 1;

  const pagedProducts = React.useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, page]);

  // custom pagination item renderer
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

  const activeFilterArray = React.useMemo(
    () => Array.from(activeFilters),
    [activeFilters],
  );

  return (
    <section className="flex min-h-screen flex-col px-6 py-6 sm:px-10 sm:mt-20">
      {/* Top row: categories, search, filter button */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Categories row */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((cat) => {
            const isActive = cat.key === activeCategory;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setPage(1);
                }}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#c9a16d] text-white shadow-sm"
                    : "bg-white/70 text-default-700 hover:bg-white",
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search + Filter button */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
          <Input
            className="w-full md:w-72"
            radius="full"
            variant="bordered"
            placeholder="Search products"
            value={search}
            onValueChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            startContent={
              <Search className="h-4 w-4 text-default-400" />
            }
          />

          <Button
            radius="full"
            variant="flat"
            className="bg-white/80 text-sm font-medium"
            startContent={<SlidersHorizontal className="h-4 w-4" />}
            onPress={onOpen}
          >
            Filters
          </Button>
        </div>
      </div>

      {/* Active filter chips (only show when something is selected) */}
      {activeFilterArray.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {activeFilterArray.map((key) => {
            const label =
              FILTER_OPTIONS.find((f) => f.key === key)?.label ?? key;
            return (
              <Chip
                key={key}
                radius="full"
                variant="flat"
                color="warning"
                className="cursor-pointer text-xs sm:text-sm"
                onClick={() => toggleFilter(key)}
              >
                {label}
              </Chip>
            );
          })}

          <button
            className="text-xs font-medium text-default-500 underline-offset-2 hover:underline"
            onClick={clearAllFilters}
          >
            Clear all
          </button>
        </div>
      )}

      {/* Loading / error states */}
      {loading && (
        <div className="mt-10 text-center text-sm text-default-500">
          Loading products...
        </div>
      )}

      {error && !loading && (
        <div className="mt-10 text-center text-sm text-danger">{error}</div>
      )}

      {/* Grid of cards */}
      {!loading && !error && (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {pagedProducts.map((product) => (
              <Card
                key={product.id}
                shadow="sm"
                className="overflow-hidden rounded-3xl border border-black/5 bg-[#F5F6F8]"
              >
                {/* <div className="relative">
                  <Image
                    removeWrapper
                    alt={product.name}
                    src={product.image}
                    className="h-40 w-full object-cover md:h-60 sm:h-80 p-2 rounded-3xl"
                  />
                </div> */}
                <div className="relative">
                  {product.image[0] ? (
                    <Image
                      removeWrapper
                      alt={product.name}
                      src={product.image[0]}          // only first image
                      className="h-40 w-full object-cover md:h-72 sm:h-80 p-1 rounded-3xl"
                    />
                  ) : (
                    <div className="h-40 w-full md:h-60 sm:h-80 p-2 rounded-3xl bg-default-200" />
                  )}
                </div>

                <CardBody className="flex flex-col gap-1 px-5 pb-4 pt-4">
                  <h3 className="text-sm font-semibold text-default-900 sm:text-base">
                    {product.name}
                  </h3>
                  <p className="text-xs text-default-500 sm:text-sm">
                    {product.short_description}
                  </p>
                </CardBody>

                <CardFooter className="flex items-center justify-between px-5 pb-4 pt-0">
                  <div className="flex flex-wrap gap-1">
                    {product.filters.slice(0, 2).map((key) => {
                      const label =
                        FILTER_OPTIONS.find((f) => f.key === key)?.label ??
                        key;
                      return (
                        <span
                          key={key}
                          className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium text-default-500"
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>

                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-xs shadow-sm">
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </CardFooter>
              </Card>
            ))}

            {pagedProducts.length === 0 && (
              <div className="col-span-full rounded-2xl bg-white/60 p-8 text-center text-sm text-default-500">
                No products match your filters.
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
              onClick={() =>
                page < totalPages && setPage(page + 1)
              }
            >
              Next
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </>
      )}

      {/* Filter modal – this is where you pick filters; selected ones show as chips above */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-base font-semibold">
                Filters
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-default-400">
                    Materials / Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {FILTER_OPTIONS.map((opt) => {
                      const selected = activeFilters.has(opt.key);
                      return (
                        <Chip
                          key={opt.key}
                          radius="full"
                          variant={selected ? "solid" : "bordered"}
                          color="warning"
                          className="cursor-pointer text-xs sm:text-sm"
                          onClick={() => toggleFilter(opt.key)}
                        >
                          {opt.label}
                        </Chip>
                      );
                    })}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={clearAllFilters}>
                  Clear all
                </Button>
                <Button color="primary" variant="flat" onPress={onClose}>
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}