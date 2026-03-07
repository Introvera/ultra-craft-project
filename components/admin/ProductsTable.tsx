"use client";

import type { Selection, SortDescriptor } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import {
  ChevronDownIcon,
  PlusIcon,
  SearchIcon,
  VerticalDotsIcon,
} from "../icons";
import {
  CATEGORY_TREE,
  getCategory,
  getCategoryLabel,
  getSubTypeLabel,
  getFilterLabel,
  getFiltersForBranch,
  type MainCategoryId,
} from "@/lib/category-tree";

type Product = {
  id: number;
  name: string;
  image: string[];
  short_description: string;
  long_description: string;
  created_at: string;
  main_category: string | null;
  sub_type: string | null;
  filters: string[];
};

type ProductsTableProps = {
  initialProducts: (Product & {
    image?: string[] | string | null;
    main_category?: string | null;
    sub_type?: string | null;
    filters?: string[] | null;
  })[];
};

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "CATEGORY", uid: "main_category", sortable: false },
  { name: "SUB TYPE", uid: "sub_type", sortable: false },
  { name: "FILTERS", uid: "filters", sortable: false },
  { name: "SHORT DESCRIPTION", uid: "short_description", sortable: false },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "main_category",
  "sub_type",
  "filters",
  "short_description",
  "actions",
];

function selectionToArray(selection: Selection, allKeys: string[]): string[] {
  if (selection === "all") return allKeys;
  return Array.from(selection).map((k) => String(k));
}

function normalizeProduct(p: any): Product {
  let images: string[] = [];
  if (Array.isArray(p.image)) {
    images = p.image;
  } else if (typeof p.image === "string" && p.image.trim().length > 0) {
    images = [p.image];
  }
  return {
    ...p,
    image: images,
    main_category: p.main_category ?? null,
    sub_type: p.sub_type ?? null,
    filters: Array.isArray(p.filters) ? p.filters : [],
  };
}

type FormErrors = {
  name?: string;
  short_description?: string;
  long_description?: string;
  image?: string;
  main_category?: string;
};

type FilePreview = {
  id: string;
  file: File;
  url: string; // object URL for preview
};

export default function ProductsTable({ initialProducts }: ProductsTableProps) {
  const router = useRouter();

  const [products, setProducts] = React.useState<Product[]>(() =>
    initialProducts.map((p) => normalizeProduct(p))
  );

  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  // create/edit modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // view modal
  const [viewOpen, setViewOpen] = React.useState(false);
  const [viewProduct, setViewProduct] = React.useState<Product | null>(null);

  const [editingProduct, setEditingProduct] = React.useState<Product | null>(
    null
  );

  const [formValues, setFormValues] = React.useState({
    name: "",
    short_description: "",
    long_description: "",
  });

  const [formErrors, setFormErrors] = React.useState<FormErrors>({});

  // already uploaded image URLs for this form (existing product or after save)
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);

  // newly selected files that have not been uploaded yet
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);

  // NEW: file previews (local object URLs) for selected files
  const [filePreviews, setFilePreviews] = React.useState<FilePreview[]>([]);

  const [selectedMainCategory, setSelectedMainCategory] = React.useState<
    string | null
  >(null);
  const [selectedSubType, setSelectedSubType] = React.useState<string | null>(
    null
  );
  const [selectedFilters, setSelectedFilters] = React.useState<Selection>(
    new Set()
  );

  const [saving, setSaving] = React.useState(false);
  const [saveError, setSaveError] = React.useState<string | null>(null);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let items = [...products];
    if (hasSearchFilter) {
      const q = filterValue.toLowerCase();
      items = items.filter((product) =>
        product.name.toLowerCase().includes(q)
      );
    }
    return items;
  }, [products, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Product] as any;
      const second = b[sortDescriptor.column as keyof Product] as any;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  function cleanupPreviews(list: FilePreview[]) {
    for (const p of list) URL.revokeObjectURL(p.url);
  }

  function resetForm() {
    setFormValues({
      name: "",
      short_description: "",
      long_description: "",
    });
    setFormErrors({});
    setSaveError(null);
    setImageUrls([]);
    setImageFiles([]);
    setSelectedMainCategory(null);
    setSelectedSubType(null);
    setSelectedFilters(new Set());

    setFilePreviews((prev) => {
      cleanupPreviews(prev);
      return [];
    });
  }

  function openAddModal() {
    setEditingProduct(null);
    resetForm();
    onOpen();
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);
    setSaveError(null);

    // clear previews when switching/entering edit
    setFilePreviews((prev) => {
      cleanupPreviews(prev);
      return [];
    });

    setFormValues({
      name: product.name,
      short_description: product.short_description,
      long_description: product.long_description,
    });
    setFormErrors({});
    setImageUrls(product.image ?? []);
    setImageFiles([]);
    setSelectedMainCategory(product.main_category ?? null);
    setSelectedSubType(product.sub_type ?? null);
    setSelectedFilters(new Set(product.filters ?? []));
    onOpen();
  }

  function validateForm(): boolean {
    const errors: FormErrors = {};

    const name = formValues.name.trim();
    const shortDesc = formValues.short_description.trim();
    const longDesc = formValues.long_description.trim();

    if (!name) {
      errors.name = "Name is required.";
    } else if (name.length > 40) {
      errors.name = "Name must be 40 characters or less.";
    }

    if (!shortDesc) {
      errors.short_description = "Short description is required.";
    } else if (shortDesc.length > 80) {
      errors.short_description =
        "Short description must be 80 characters or less.";
    }

    if (!longDesc) {
      errors.long_description = "Long description is required.";
    } else if (longDesc.length > 300) {
      errors.long_description =
        "Long description must be 300 characters or less.";
    }

    if (!selectedMainCategory) {
      errors.main_category = "Please select a category.";
    }

    setFormErrors((prev) => ({
      ...prev,
      ...errors,
    }));

    return Object.keys(errors).length === 0;
  }

  async function handleSave(close: () => void) {
    // text validation
    if (!validateForm()) return;

    // image validation
    const hasAnyImage = imageUrls.length > 0 || imageFiles.length > 0;
    if (!hasAnyImage) {
      setFormErrors((prev) => ({
        ...prev,
        image: "At least one image is required.",
      }));
      return;
    }

    setSaving(true);
    setSaveError(null);
    try {
      // start from current image list (including any removals)
      const finalImages = [...imageUrls];

      // upload all newly selected files and append their URLs
      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const fd = new FormData();
          fd.append("file", file);

          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: fd,
          });

          if (!uploadRes.ok) {
            let msg = "Image upload failed. Please try again.";
            try {
              const errData = await uploadRes.json();
              if (errData?.error) msg = errData.error;
            } catch {
              // ignore JSON parse errors
            }

            setFormErrors((prev) => ({ ...prev, image: msg }));
            setSaving(false);
            return;
          }

          const data = await uploadRes.json();
          finalImages.push(data.url);
        }
      }

      const currentFilterOptions = getFiltersForBranch(
        selectedMainCategory as MainCategoryId,
        selectedSubType
      );
      const filterIds = currentFilterOptions.map((f) => f.id);
      const selectedArray = selectionToArray(selectedFilters, filterIds);
      const filtersArray = selectedArray.filter((id) => filterIds.includes(id));

      const payload = {
        name: formValues.name.trim(),
        image: finalImages,
        short_description: formValues.short_description.trim(),
        long_description: formValues.long_description.trim(),
        main_category: selectedMainCategory ?? null,
        sub_type: selectedSubType ?? null,
        filters: filtersArray,
      };

      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          setSaveError(errData?.error ?? "Failed to update product.");
          setSaving(false);
          return;
        }

        const updatedFromApi = await res.json();
        const updated = normalizeProduct(updatedFromApi);

        setProducts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          setSaveError(errData?.error ?? "Failed to create product.");
          setSaving(false);
          return;
        }

        const createdFromApi = await res.json();
        const created = normalizeProduct(createdFromApi);

        setProducts((prev) => [created, ...prev]);
      }

      close();
      resetForm();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      console.error("Delete failed");
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  const renderCell = React.useCallback(
    (product: Product, columnKey: React.Key) => {
      const key = columnKey as keyof Product | "actions";

      switch (key) {
        case "name": {
          const firstImage = product.image[0];
          return (
            <div className="flex items-center gap-3">
              {firstImage ? (
                <img
                  src={firstImage}
                  className="w-8 h-8 rounded object-cover"
                  alt={product.name}
                />
              ) : (
                <div className="w-8 h-8 rounded bg-default-200" />
              )}
              <div className="flex flex-col">
                <span className="text-sm font-medium">{product.name}</span>
                <span className="text-xs text-default-400">#{product.id}</span>
              </div>
            </div>
          );
        }

        case "short_description":
          return (
            <p className="text-sm line-clamp-2">{product.short_description}</p>
          );

        case "main_category": {
          const cat = product.main_category;
          if (!cat) return <span className="text-xs text-default-400">—</span>;
          const label = getCategoryLabel(cat);
          return (
            <span className="px-2 py-0.5 rounded-full border text-[11px] leading-tight">
              {label}
            </span>
          );
        }

        case "sub_type": {
          const cat = product.main_category;
          const sub = product.sub_type;
          if (!cat || !sub)
            return <span className="text-xs text-default-400">—</span>;
          const subLabel = getSubTypeLabel(cat as MainCategoryId, sub);
          return (
            <span className="px-2 py-0.5 rounded-full border text-[11px] leading-tight text-default-500">
              {subLabel}
            </span>
          );
        }

        case "filters": {
          const fltrs = product.filters ?? [];
          if (!fltrs.length) return <span className="text-xs text-default-400">—</span>;

          return (
            <div className="flex flex-wrap gap-1">
              {fltrs.map((key) => (
                <span
                  key={key}
                  className="px-2 py-0.5 rounded-full border text-[11px] leading-tight"
                >
                  {getFilterLabel(key)}
                </span>
              ))}
            </div>
          );
        }

        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) => {
                  if (key === "view") {
                    setViewProduct(product);
                    setViewOpen(true);
                  }
                  if (key === "edit") openEditModal(product);
                  if (key === "delete") handleDelete(product.id);
                }}
              >
                <DropdownItem key="view">View</DropdownItem>
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem key="delete" color="danger">
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );

        default:
          return product[key as keyof Product] as any;
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const availableFilters = React.useMemo(
    () => getFiltersForBranch(selectedMainCategory as MainCategoryId, selectedSubType),
    [selectedMainCategory, selectedSubType]
  );

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <Button
          variant="flat"
          color="default"
          className="w-30"
          onPress={() => router.push("/admin")}
        >
          ← Back to Home
        </Button>

        <div className="flex justify-between gap-3 items-end">
          <h1 className="text-2xl font-semibold mb-4 text-default-foreground">
            Products
          </h1>

          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onValueChange={setFilterValue}
          />

          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  className="bg-black text-white hover:bg-black-600"
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>

              <DropdownMenu
                disallowEmptySelection
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((col) => (
                  <DropdownItem key={col.uid}>{col.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button
              className="bg-blue-700 text-white hover:bg-blue-600"
              variant="flat"
              endContent={<PlusIcon />}
              onPress={openAddModal}
            >
              Add New
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-small">Total {filteredItems.length} products</span>

          <label className="flex items-center text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-small ml-1"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [router, filterValue, visibleColumns, filteredItems.length, onRowsPerPageChange, rowsPerPage]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="default"
          page={page}
          total={pages}
          onChange={setPage}
        />

        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="solid"
            onPress={() => page > 1 && setPage(page - 1)}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            color="primary"
            variant="solid"
            onPress={() => page < pages && setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages]);

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Products table"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{ wrapper: "max-h-[382px]" }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody emptyContent="No products found" items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Create / Edit modal */}
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {editingProduct ? "Edit Product" : "Add Product"}
              </ModalHeader>

              <ModalBody>
                <Input
                  isRequired
                  label="Name"
                  variant="bordered"
                  value={formValues.name}
                  maxLength={40}
                  isInvalid={!!formErrors.name}
                  errorMessage={
                    formErrors.name ||
                    `${formValues.name.trim().length}/40 characters`
                  }
                  onValueChange={(v) => {
                    setFormValues((p) => ({ ...p, name: v }));
                    const trimmed = v.trim();
                    setFormErrors((prev) => {
                      const next = { ...prev };
                      if (!trimmed) next.name = "Name is required.";
                      else if (trimmed.length > 40)
                        next.name = "Name must be 40 characters or less.";
                      else next.name = undefined;
                      return next;
                    });
                  }}
                />

                {/* Existing uploaded images (URLs) */}
                {imageUrls.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium">Images</span>
                    <div className="flex flex-wrap gap-2">
                      {imageUrls.map((url, idx) => (
                        <div key={url} className="relative">
                          <img
                            src={url}
                            className="w-20 h-20 rounded object-cover"
                            alt={`Product image ${idx + 1}`}
                          />
                          <button
                            type="button"
                            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-xs text-white"
                            onClick={() =>
                              setImageUrls((prev) =>
                                prev.filter((_, i) => i !== idx)
                              )
                            }
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New selected images (Files) - preview before upload */}
                {filePreviews.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium">
                      New images (not uploaded yet)
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {filePreviews.map((p) => (
                        <div key={p.id} className="relative">
                          <img
                            src={p.url}
                            className="w-20 h-20 rounded object-cover"
                            alt="Selected preview"
                          />
                          <button
                            type="button"
                            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-xs text-white"
                            onClick={() => {
                              // remove preview
                              setFilePreviews((prev) => {
                                const target = prev.find((x) => x.id === p.id);
                                if (target) URL.revokeObjectURL(target.url);
                                return prev.filter((x) => x.id !== p.id);
                              });

                              // remove matching file from upload list
                              setImageFiles((prev) =>
                                prev.filter(
                                  (f) =>
                                    !(
                                      f.name === p.file.name &&
                                      f.size === p.file.size &&
                                      f.lastModified === p.file.lastModified
                                    )
                                )
                              );
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Input
                  type="file"
                  label="Upload Images"
                  variant="bordered"
                  accept="image/*"
                  multiple
                  isInvalid={!!formErrors.image}
                  errorMessage={formErrors.image}
                  onChange={(e) => {
                    const files = Array.from(e.target.files ?? []);
                    if (!files.length) return;

                    const MAX_MB = 8;
                    const tooBig = files.find((f) => f.size > MAX_MB * 1024 * 1024);

                    if (tooBig) {
                      setFormErrors((prev) => ({
                        ...prev,
                        image: `One or more images exceed ${MAX_MB}MB. Please choose smaller images.`,
                      }));
                      e.target.value = "";
                      return;
                    }

                    const nextPreviews: FilePreview[] = files.map((file) => ({
                      id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
                      file,
                      url: URL.createObjectURL(file),
                    }));

                    setImageFiles((prev) => [...prev, ...files]);
                    setFilePreviews((prev) => [...prev, ...nextPreviews]);

                    setFormErrors((prev) => ({
                      ...prev,
                      image: undefined,
                    }));

                    // allow picking same file again
                    e.target.value = "";
                  }}
                />

                <Input
                  isRequired
                  label="Short Description"
                  variant="bordered"
                  value={formValues.short_description}
                  maxLength={80}
                  isInvalid={!!formErrors.short_description}
                  errorMessage={
                    formErrors.short_description ||
                    `${formValues.short_description.trim().length}/80 characters`
                  }
                  onValueChange={(v) => {
                    setFormValues((p) => ({ ...p, short_description: v }));
                    const trimmed = v.trim();
                    setFormErrors((prev) => {
                      const next = { ...prev };
                      if (!trimmed) next.short_description = "Short description is required.";
                      else if (trimmed.length > 80)
                        next.short_description =
                          "Short description must be 80 characters or less.";
                      else next.short_description = undefined;
                      return next;
                    });
                  }}
                />

                <Textarea
                  isRequired
                  label="Long Description"
                  variant="bordered"
                  value={formValues.long_description}
                  maxLength={300}
                  isInvalid={!!formErrors.long_description}
                  errorMessage={
                    formErrors.long_description ||
                    `${formValues.long_description.trim().length}/300 characters`
                  }
                  onValueChange={(v) => {
                    setFormValues((p) => ({ ...p, long_description: v }));
                    const trimmed = v.trim();
                    setFormErrors((prev) => {
                      const next = { ...prev };
                      if (!trimmed) next.long_description = "Long description is required.";
                      else if (trimmed.length > 300)
                        next.long_description =
                          "Long description must be 300 characters or less.";
                      else next.long_description = undefined;
                      return next;
                    });
                  }}
                />

                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    {formErrors.main_category && (
                      <p className="text-xs text-danger mb-1">
                        {formErrors.main_category}
                      </p>
                    )}
                    <select
                      value={selectedMainCategory ?? ""}
                      onChange={(e) => {
                        const value = e.target.value || null;
                        setSelectedMainCategory(value);
                        setSelectedSubType(null);
                        setSelectedFilters(new Set());
                      }}
                      className="w-full rounded-lg border border-default-300 bg-default-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                      aria-label="Select category"
                    >
                      <option value="">Select category</option>
                      {CATEGORY_TREE.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedMainCategory &&
                    getCategory(selectedMainCategory as MainCategoryId)
                      ?.subtypes && (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Sub-type
                        </label>
                        <select
                          value={selectedSubType ?? ""}
                          onChange={(e) => {
                            const value = e.target.value || null;
                            setSelectedSubType(value);
                            setSelectedFilters(new Set());
                          }}
                          className="w-full rounded-lg border border-default-300 bg-default-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                          aria-label="Select sub-type"
                        >
                          <option value="">Select sub-type</option>
                          {getCategory(
                            selectedMainCategory as MainCategoryId
                          )?.subtypes?.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                  <div>
                    <span className="block text-sm font-medium mb-2">
                      Filters
                    </span>
                    {availableFilters.length === 0 ? (
                      <p className="text-xs text-default-500">
                        Select a category
                        {selectedMainCategory === "home_furniture"
                          ? " and sub-type"
                          : ""}{" "}
                        to see filters.
                      </p>
                    ) : (
                      <div className="max-h-40 overflow-y-auto rounded-lg border border-default-200 p-2 space-y-1.5">
                        {availableFilters.map((f) => {
                          const isChecked = selectedFilters.has(f.id);
                          return (
                            <label
                              key={f.id}
                              className="flex items-center gap-2 cursor-pointer text-sm hover:bg-default-100 rounded px-2 py-1"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  setSelectedFilters((prev) => {
                                    const next = new Set(prev);
                                    if (next.has(f.id)) next.delete(f.id);
                                    else next.add(f.id);
                                    return next;
                                  });
                                }}
                                className="rounded border-default-300"
                              />
                              {f.label}
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {saveError && (
                  <p className="text-sm text-danger mt-2">{saveError}</p>
                )}
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="flat"
                  onPress={() => {
                    resetForm();
                    onClose();
                  }}
                >
                  Cancel
                </Button>

                <Button
                  className="bg-blue-700 text-white"
                  variant="flat"
                  isLoading={saving}
                  onPress={() => handleSave(onClose)}
                >
                  {editingProduct ? "Save Changes" : "Create"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* View details modal */}
      <Modal isOpen={viewOpen} placement="top-center" onOpenChange={setViewOpen}>
        <ModalContent>
          {() =>
            viewProduct && (
              <>
                <ModalHeader>{viewProduct.name}</ModalHeader>
                <ModalBody>
                  {viewProduct.image.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {viewProduct.image.map((url, idx) => (
                        <img
                          key={url}
                          src={url}
                          className="w-24 h-24 rounded object-cover"
                          alt={`Product image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  <p className="text-sm font-medium">Short description:</p>
                  <p className="text-sm mb-2">{viewProduct.short_description}</p>

                  <p className="text-sm font-medium">Long description:</p>
                  <p className="text-sm whitespace-pre-line mb-3">
                    {viewProduct.long_description}
                  </p>

                  <div className="mb-2">
                    <p className="text-sm font-medium mb-1">Category</p>
                    {viewProduct.main_category ? (
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-0.5 rounded-full border text-[11px]">
                          {getCategoryLabel(viewProduct.main_category)}
                        </span>
                        {viewProduct.sub_type && (
                          <span className="px-2 py-0.5 rounded-full border text-[11px] text-default-500">
                            {getSubTypeLabel(
                              viewProduct.main_category as MainCategoryId,
                              viewProduct.sub_type
                            )}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-default-400">None</span>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Filters</p>
                    {viewProduct.filters.length ? (
                      <div className="flex flex-wrap gap-1">
                        {viewProduct.filters.map((key) => (
                          <span
                            key={key}
                            className="px-2 py-0.5 rounded-full border text-[11px]"
                          >
                            {getFilterLabel(key)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-default-400">None</span>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button variant="flat" onPress={() => setViewOpen(false)}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )
          }
        </ModalContent>
      </Modal>
    </>
  );
}