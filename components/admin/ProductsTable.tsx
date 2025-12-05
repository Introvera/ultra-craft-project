// "use client";

// import React from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Input,
//   Button,
//   DropdownTrigger,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Pagination,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Textarea,
//   useDisclosure,
// } from "@heroui/react";
// import type { SortDescriptor, Selection } from "@heroui/react";
// import {
//   PlusIcon,
//   SearchIcon,
//   ChevronDownIcon,
//   VerticalDotsIcon,
// } from "../icons";

// type Product = {
//   id: number;
//   name: string;
//   image: string;
//   short_description: string;
//   long_description: string;
//   created_at: string;
//   categories: string[]; // now treated as array
//   filters: string[];    // now treated as array
// };

// type ProductsTableProps = {
//   initialProducts: (Product & {
//     // tolerate older data shape from API
//     categories?: string[] | null;
//     filters?: string[] | null;
//   })[];
// };

// const columns = [
//   { name: "ID", uid: "id", sortable: true },
//   { name: "NAME", uid: "name", sortable: true },
//   { name: "CATEGORIES", uid: "categories", sortable: false },
//   { name: "FILTERS", uid: "filters", sortable: false },
//   { name: "SHORT DESCRIPTION", uid: "short_description", sortable: false },
//   { name: "ACTIONS", uid: "actions" },
// ];

// const INITIAL_VISIBLE_COLUMNS = [
//   "name",
//   "categories",
//   "filters",
//   "short_description",
//   "actions",
// ];

// // You can customize these lists to match your project
// const CATEGORY_OPTIONS = [
//   { key: "seating", label: "Seating" },
//   { key: "sofas", label: "Sofas" },
//   { key: "chairs", label: "Chairs" },
//   { key: "tables", label: "Tables" },
//   { key: "storage", label: "Storage" },
//   { key: "beds", label: "Beds" },
//   { key: "lighting", label: "Lighting" },
// ];

// const FILTER_OPTIONS = [
//   { key: "wood", label: "Wood" },
//   { key: "metal", label: "Metal" },
//   { key: "fabric", label: "Fabric" },
//   { key: "leather", label: "Leather" },
//   { key: "premium", label: "Premium" },
//   { key: "compact", label: "Compact" },
//   { key: "outdoor", label: "Outdoor" },
// ];

// const categoryLabelMap = new Map(
//   CATEGORY_OPTIONS.map((c) => [c.key, c.label]),
// );
// const filterLabelMap = new Map(FILTER_OPTIONS.map((f) => [f.key, f.label]));

// /**
//  * Converts HeroUI Selection to string[].
//  */
// function selectionToArray(selection: Selection, allKeys: string[]): string[] {
//   if (selection === "all") return allKeys;
//   return Array.from(selection).map((k) => String(k));
// }

// /**
//  * Normalize product from API so categories/filters are always arrays.
//  */
// function normalizeProduct(p: any): Product {
//   return {
//     ...p,
//     categories: Array.isArray(p.categories) ? p.categories : [],
//     filters: Array.isArray(p.filters) ? p.filters : [],
//   };
// }

// export default function ProductsTable({ initialProducts }: ProductsTableProps) {
//   const [products, setProducts] = React.useState<Product[]>(() =>
//     initialProducts.map((p) => normalizeProduct(p)),
//   );

//   const [filterValue, setFilterValue] = React.useState("");
//   const [visibleColumns, setVisibleColumns] = React.useState<any>(
//     new Set(INITIAL_VISIBLE_COLUMNS),
//   );
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
//     column: "name",
//     direction: "ascending",
//   });
//   const [page, setPage] = React.useState(1);

//   const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   const [editingProduct, setEditingProduct] = React.useState<Product | null>(
//     null,
//   );

//   const [formValues, setFormValues] = React.useState({
//     name: "",
//     short_description: "",
//     long_description: "",
//   });

//   const [imageFile, setImageFile] = React.useState<File | null>(null);
//   const [existingImage, setExistingImage] = React.useState<string | null>(null);

//   const [selectedCategories, setSelectedCategories] = React.useState<Selection>(
//     new Set(),
//   );
//   const [selectedFilters, setSelectedFilters] = React.useState<Selection>(
//     new Set(),
//   );

//   const [saving, setSaving] = React.useState(false);

//   const hasSearchFilter = Boolean(filterValue);

//   const headerColumns = React.useMemo(() => {
//     if (visibleColumns === "all") return columns;
//     return columns.filter((column) =>
//       Array.from(visibleColumns).includes(column.uid),
//     );
//   }, [visibleColumns]);

//   const filteredItems = React.useMemo(() => {
//     let items = [...products];
//     if (hasSearchFilter) {
//       items = items.filter((product) =>
//         product.name.toLowerCase().includes(filterValue.toLowerCase()),
//       );
//     }
//     return items;
//   }, [products, filterValue, hasSearchFilter]);

//   const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

//   const items = React.useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;
//     return filteredItems.slice(start, end);
//   }, [page, filteredItems, rowsPerPage]);

//   const sortedItems = React.useMemo(() => {
//     return [...items].sort((a, b) => {
//       const first = a[sortDescriptor.column as keyof Product] as any;
//       const second = b[sortDescriptor.column as keyof Product] as any;
//       const cmp = first < second ? -1 : first > second ? 1 : 0;
//       return sortDescriptor.direction === "descending" ? -cmp : cmp;
//     });
//   }, [sortDescriptor, items]);

//   function openAddModal() {
//     setEditingProduct(null);
//     setFormValues({
//       name: "",
//       short_description: "",
//       long_description: "",
//     });
//     setExistingImage(null);
//     setImageFile(null);
//     setSelectedCategories(new Set());
//     setSelectedFilters(new Set());
//     onOpen();
//   }

//   function openEditModal(product: Product) {
//     setEditingProduct(product);
//     setFormValues({
//       name: product.name,
//       short_description: product.short_description,
//       long_description: product.long_description,
//     });
//     setExistingImage(product.image);
//     setImageFile(null);
//     setSelectedCategories(new Set(product.categories ?? []));
//     setSelectedFilters(new Set(product.filters ?? []));
//     onOpen();
//   }

//   async function handleSave(close: () => void) {
//     setSaving(true);
//     try {
//       let finalImageUrl =
//         editingProduct && !imageFile ? editingProduct.image : "";

//       if (!editingProduct && !imageFile) {
//         console.error("Image is required for new product");
//         setSaving(false);
//         return;
//       }

//       if (imageFile) {
//         const fd = new FormData();
//         fd.append("file", imageFile);

//         const uploadRes = await fetch("/api/upload", {
//           method: "POST",
//           body: fd,
//         });

//         if (!uploadRes.ok) {
//           console.error("Image upload failed");
//           setSaving(false);
//           return;
//         }

//         const data = await uploadRes.json();
//         finalImageUrl = data.url;
//       }

//       const categoriesArray = selectionToArray(
//         selectedCategories,
//         CATEGORY_OPTIONS.map((c) => c.key),
//       );
//       const filtersArray = selectionToArray(
//         selectedFilters,
//         FILTER_OPTIONS.map((f) => f.key),
//       );

//       const payload = {
//         name: formValues.name,
//         image: finalImageUrl,
//         short_description: formValues.short_description,
//         long_description: formValues.long_description,
//         categories: categoriesArray,
//         filters: filtersArray,
//       };

//       if (editingProduct) {
//         const res = await fetch(`/api/products/${editingProduct.id}`, {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });

//         if (!res.ok) {
//           console.error("Failed to update");
//           setSaving(false);
//           return;
//         }

//         const updatedFromApi = await res.json();
//         const updated = normalizeProduct(updatedFromApi);

//         setProducts((prev) =>
//           prev.map((p) => (p.id === updated.id ? updated : p)),
//         );
//       } else {
//         const res = await fetch("/api/products", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });

//         if (!res.ok) {
//           console.error("Failed to create");
//           setSaving(false);
//           return;
//         }

//         const createdFromApi = await res.json();
//         const created = normalizeProduct(createdFromApi);

//         setProducts((prev) => [created, ...prev]);
//       }

//       close();
//       setImageFile(null);
//       setExistingImage(null);
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function handleDelete(id: number) {
//     const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
//     if (!res.ok) {
//       console.error("Delete failed");
//       return;
//     }
//     setProducts((prev) => prev.filter((p) => p.id !== id));
//   }

//   const renderCell = React.useCallback(
//     (product: Product, columnKey: React.Key) => {
//       const key = columnKey as keyof Product | "actions";

//       switch (key) {
//         case "name":
//           return (
//             <div className="flex items-center gap-3">
//               <img
//                 src={product.image}
//                 className="w-8 h-8 rounded object-cover"
//                 alt={product.name}
//               />
//               <div className="flex flex-col">
//                 <span className="text-sm font-medium">{product.name}</span>
//                 <span className="text-xs text-default-400">
//                   #{product.id}
//                 </span>
//               </div>
//             </div>
//           );

//         case "short_description":
//           return (
//             <p className="text-sm line-clamp-2">
//               {product.short_description}
//             </p>
//           );

//         case "categories": {
//           const cats = product.categories ?? [];
//           if (!cats.length) {
//             return (
//               <span className="text-xs text-default-400">
//                 —
//               </span>
//             );
//           }

//           return (
//             <div className="flex flex-wrap gap-1">
//               {cats.map((key) => (
//                 <span
//                   key={key}
//                   className="px-2 py-0.5 rounded-full border text-[11px] leading-tight"
//                 >
//                   {categoryLabelMap.get(key) ?? key}
//                 </span>
//               ))}
//             </div>
//           );
//         }

//         case "filters": {
//           const fltrs = product.filters ?? [];
//           if (!fltrs.length) {
//             return (
//               <span className="text-xs text-default-400">
//                 —
//               </span>
//             );
//           }

//           return (
//             <div className="flex flex-wrap gap-1">
//               {fltrs.map((key) => (
//                 <span
//                   key={key}
//                   className="px-2 py-0.5 rounded-full border text-[11px] leading-tight"
//                 >
//                   {filterLabelMap.get(key) ?? key}
//                 </span>
//               ))}
//             </div>
//           );
//         }

//         case "actions":
//           return (
//             <Dropdown>
//               <DropdownTrigger>
//                 <Button isIconOnly size="sm" variant="light">
//                   <VerticalDotsIcon />
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 onAction={(key) => {
//                   if (key === "edit") openEditModal(product);
//                   if (key === "delete") handleDelete(product.id);
//                 }}
//               >
//                 <DropdownItem key="edit">Edit</DropdownItem>
//                 <DropdownItem key="delete" color="danger">
//                   Delete
//                 </DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//           );

//         default:
//           // covers id, created_at, etc.
//           return product[key as keyof Product] as any;
//       }
//     },
//     [],
//   );

//   const onRowsPerPageChange = React.useCallback(
//     (e: React.ChangeEvent<HTMLSelectElement>) => {
//       setRowsPerPage(Number(e.target.value));
//       setPage(1);
//     },
//     [],
//   );

//   const selectedCategoryLabels = React.useMemo(() => {
//     const keys = selectionToArray(
//       selectedCategories,
//       CATEGORY_OPTIONS.map((c) => c.key),
//     );
//     return keys.map((k) => categoryLabelMap.get(k) ?? k);
//   }, [selectedCategories]);

//   const selectedFilterLabels = React.useMemo(() => {
//     const keys = selectionToArray(
//       selectedFilters,
//       FILTER_OPTIONS.map((f) => f.key),
//     );
//     return keys.map((k) => filterLabelMap.get(k) ?? k);
//   }, [selectedFilters]);

//   const topContent = React.useMemo(() => {
//     return (
//       <div className="flex flex-col gap-4">
//         <div className="flex justify-between gap-3 items-end">
//           <Input
//             isClearable
//             className="w-full sm:max-w-[44%]"
//             placeholder="Search by name..."
//             startContent={<SearchIcon />}
//             value={filterValue}
//             onClear={() => setFilterValue("")}
//             onValueChange={setFilterValue}
//           />

//           <div className="flex gap-3">
//             <Dropdown>
//               <DropdownTrigger className="hidden sm:flex">
//                 <Button
//                   color="primary"
//                   endContent={<ChevronDownIcon className="text-small" />}
//                   variant="flat"
//                 >
//                   Columns
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 disallowEmptySelection
//                 closeOnSelect={false}
//                 selectedKeys={visibleColumns}
//                 selectionMode="multiple"
//                 onSelectionChange={setVisibleColumns}
//               >
//                 {columns.map((col) => (
//                   <DropdownItem key={col.uid}>{col.name}</DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>

//             <Button
//               color="primary"
//               variant="flat"
//               endContent={<PlusIcon />}
//               onPress={openAddModal}
//             >
//               Add New
//             </Button>
//           </div>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="text-small">
//             Total {filteredItems.length} products
//           </span>

//           <label className="flex items-center text-small">
//             Rows per page:
//             <select
//               className="bg-transparent outline-none text-small ml-1"
//               onChange={onRowsPerPageChange}
//             >
//               <option value="5">5</option>
//               <option value="10">10</option>
//               <option value="15">15</option>
//             </select>
//           </label>
//         </div>
//       </div>
//     );
//   }, [filterValue, visibleColumns, filteredItems.length, onRowsPerPageChange]);

//   const bottomContent = React.useMemo(() => {
//     return (
//       <div className="py-2 px-2 flex justify-between items-center">
//         <Pagination
//           isCompact
//           showControls
//           showShadow
//           color="default"
//           page={page}
//           total={pages}
//           onChange={setPage}
//         />

//         <div className="hidden sm:flex w-[30%] justify-end gap-2">
//           <Button
//             isDisabled={pages === 1}
//             size="sm"
//             variant="solid"
//             onPress={() => page > 1 && setPage(page - 1)}
//           >
//             Previous
//           </Button>
//           <Button
//             isDisabled={pages === 1}
//             size="sm"
//             color="primary"
//             variant="solid"
//             onPress={() => page < pages && setPage(page + 1)}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     );
//   }, [page, pages]);

//   return (
//     <>
//       <Table
//         isHeaderSticky
//         aria-label="Products table"
//         bottomContent={bottomContent}
//         bottomContentPlacement="outside"
//         classNames={{ wrapper: "max-h-[382px]" }}
//         sortDescriptor={sortDescriptor}
//         topContent={topContent}
//         topContentPlacement="outside"
//         onSortChange={setSortDescriptor}
//       >
//         <TableHeader columns={headerColumns}>
//           {(column) => (
//             <TableColumn
//               key={column.uid}
//               align={column.uid === "actions" ? "center" : "start"}
//               allowsSorting={column.sortable}
//             >
//               {column.name}
//             </TableColumn>
//           )}
//         </TableHeader>

//         <TableBody emptyContent="No products found" items={sortedItems}>
//           {(item) => (
//             <TableRow key={item.id}>
//               {(columnKey) => (
//                 <TableCell>{renderCell(item, columnKey)}</TableCell>
//               )}
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>

//       <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader>
//                 {editingProduct ? "Edit Product" : "Add Product"}
//               </ModalHeader>

//               <ModalBody>
//                 <Input
//                   required
//                   label="Name"
//                   variant="bordered"
//                   value={formValues.name}
//                   onValueChange={(v) =>
//                     setFormValues((p) => ({ ...p, name: v }))
//                   }
//                 />

//                 {existingImage && !imageFile && (
//                   <div className="flex flex-col gap-2">
//                     <img
//                       src={existingImage}
//                       className="w-24 h-24 rounded object-cover"
//                       alt="Current product"
//                     />
//                     <Button
//                       size="sm"
//                       color="danger"
//                       variant="flat"
//                       onPress={() => setExistingImage(null)}
//                     >
//                       Remove Image
//                     </Button>
//                   </div>
//                 )}

//                 <Input
//                   type="file"
//                   label="Upload Image"
//                   variant="bordered"
//                   accept="image/*"
//                   onChange={(e) =>
//                     setImageFile(e.target.files?.[0] ?? null)
//                   }
//                 />

//                 <Input
//                   label="Short Description"
//                   variant="bordered"
//                   value={formValues.short_description}
//                   onValueChange={(v) =>
//                     setFormValues((p) => ({
//                       ...p,
//                       short_description: v,
//                     }))
//                   }
//                 />

//                 <Textarea
//                   required
//                   label="Long Description"
//                   variant="bordered"
//                   value={formValues.long_description}
//                   onValueChange={(v) =>
//                     setFormValues((p) => ({
//                       ...p,
//                       long_description: v,
//                     }))
//                   }
//                 />

//                 <div className="flex flex-col gap-3">
//                   <div>
//                     <span className="block text-sm mb-1">Categories</span>
//                     <Dropdown>
//                       <DropdownTrigger>
//                         <Button
//                           variant="bordered"
//                           className="w-full justify-between"
//                         >
//                           {selectedCategoryLabels.length > 0
//                             ? selectedCategoryLabels.join(", ")
//                             : "Select categories"}
//                         </Button>
//                       </DropdownTrigger>
//                       <DropdownMenu
//                         aria-label="Select categories"
//                         closeOnSelect={false}
//                         selectionMode="multiple"
//                         selectedKeys={selectedCategories}
//                         onSelectionChange={setSelectedCategories}
//                       >
//                         {CATEGORY_OPTIONS.map((c) => (
//                           <DropdownItem key={c.key}>{c.label}</DropdownItem>
//                         ))}
//                       </DropdownMenu>
//                     </Dropdown>
//                   </div>

//                   <div>
//                     <span className="block text-sm mb-1">Filters</span>
//                     <Dropdown>
//                       <DropdownTrigger>
//                         <Button
//                           variant="bordered"
//                           className="w-full justify-between"
//                         >
//                           {selectedFilterLabels.length > 0
//                             ? selectedFilterLabels.join(", ")
//                             : "Select filters"}
//                         </Button>
//                       </DropdownTrigger>
//                       <DropdownMenu
//                         aria-label="Select filters"
//                         closeOnSelect={false}
//                         selectionMode="multiple"
//                         selectedKeys={selectedFilters}
//                         onSelectionChange={setSelectedFilters}
//                       >
//                         {FILTER_OPTIONS.map((f) => (
//                           <DropdownItem key={f.key}>{f.label}</DropdownItem>
//                         ))}
//                       </DropdownMenu>
//                     </Dropdown>
//                   </div>
//                 </div>
//               </ModalBody>

//               <ModalFooter>
//                 <Button variant="flat" onPress={onClose}>
//                   Cancel
//                 </Button>
//                 <Button
//                   color="primary"
//                   variant="flat"
//                   isLoading={saving}
//                   onPress={() => handleSave(onClose)}
//                 >
//                   {editingProduct ? "Save Changes" : "Create"}
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }


"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import type { SortDescriptor, Selection } from "@heroui/react";
import {
  PlusIcon,
  SearchIcon,
  ChevronDownIcon,
  VerticalDotsIcon,
} from "../icons";

type Product = {
  id: number;
  name: string;
  image: string;
  short_description: string;
  long_description: string;
  created_at: string;
  categories: string[]; // now treated as array
  filters: string[]; // now treated as array
};

type ProductsTableProps = {
  initialProducts: (Product & {
    // tolerate older data shape from API
    categories?: string[] | null;
    filters?: string[] | null;
  })[];
};

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "CATEGORIES", uid: "categories", sortable: false },
  { name: "FILTERS", uid: "filters", sortable: false },
  { name: "SHORT DESCRIPTION", uid: "short_description", sortable: false },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "categories",
  "filters",
  "short_description",
  "actions",
];

// You can customize these lists to match your project
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

const categoryLabelMap = new Map(CATEGORY_OPTIONS.map((c) => [c.key, c.label]));
const filterLabelMap = new Map(FILTER_OPTIONS.map((f) => [f.key, f.label]));

/**
 * Converts HeroUI Selection to string[].
 */
function selectionToArray(selection: Selection, allKeys: string[]): string[] {
  if (selection === "all") return allKeys;
  return Array.from(selection).map((k) => String(k));
}

/**
 * Normalize product from API so categories/filters are always arrays.
 */
function normalizeProduct(p: any): Product {
  return {
    ...p,
    categories: Array.isArray(p.categories) ? p.categories : [],
    filters: Array.isArray(p.filters) ? p.filters : [],
  };
}

type FormErrors = {
  name?: string;
  short_description?: string;
  long_description?: string;
};

export default function ProductsTable({ initialProducts }: ProductsTableProps) {
  const [products, setProducts] = React.useState<Product[]>(() =>
    initialProducts.map((p) => normalizeProduct(p)),
  );

  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<any>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [editingProduct, setEditingProduct] = React.useState<Product | null>(
    null,
  );

  const [formValues, setFormValues] = React.useState({
    name: "",
    short_description: "",
    long_description: "",
  });

  const [formErrors, setFormErrors] = React.useState<FormErrors>({});

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [existingImage, setExistingImage] = React.useState<string | null>(null);

  const [selectedCategories, setSelectedCategories] = React.useState<Selection>(
    new Set(),
  );
  const [selectedFilters, setSelectedFilters] = React.useState<Selection>(
    new Set(),
  );

  const [saving, setSaving] = React.useState(false);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let items = [...products];
    if (hasSearchFilter) {
      items = items.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase()),
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

  function resetForm() {
    setFormValues({
      name: "",
      short_description: "",
      long_description: "",
    });
    setFormErrors({});
    setExistingImage(null);
    setImageFile(null);
    setSelectedCategories(new Set());
    setSelectedFilters(new Set());
  }

  function openAddModal() {
    setEditingProduct(null);
    resetForm();
    onOpen();
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);
    setFormValues({
      name: product.name,
      short_description: product.short_description,
      long_description: product.long_description,
    });
    setFormErrors({});
    setExistingImage(product.image);
    setImageFile(null);
    setSelectedCategories(new Set(product.categories ?? []));
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
      errors.short_description = "Short description must be 80 characters or less.";
    }

    if (!longDesc) {
      errors.long_description = "Long description is required.";
    } else if (longDesc.length > 300) {
      errors.long_description = "Long description must be 300 characters or less.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function handleSave(close: () => void) {
    // validate before doing anything
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      let finalImageUrl =
        editingProduct && !imageFile ? editingProduct.image : "";

      if (!editingProduct && !imageFile) {
        console.error("Image is required for new product");
        setSaving(false);
        return;
      }

      if (imageFile) {
        const fd = new FormData();
        fd.append("file", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });

        if (!uploadRes.ok) {
          console.error("Image upload failed");
          setSaving(false);
          return;
        }

        const data = await uploadRes.json();
        finalImageUrl = data.url;
      }

      const categoriesArray = selectionToArray(
        selectedCategories,
        CATEGORY_OPTIONS.map((c) => c.key),
      );
      const filtersArray = selectionToArray(
        selectedFilters,
        FILTER_OPTIONS.map((f) => f.key),
      );

      const payload = {
        name: formValues.name.trim(),
        image: finalImageUrl,
        short_description: formValues.short_description.trim(),
        long_description: formValues.long_description.trim(),
        categories: categoriesArray,
        filters: filtersArray,
      };

      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          console.error("Failed to update");
          setSaving(false);
          return;
        }

        const updatedFromApi = await res.json();
        const updated = normalizeProduct(updatedFromApi);

        setProducts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p)),
        );
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          console.error("Failed to create");
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
        case "name":
          return (
            <div className="flex items-center gap-3">
              <img
                src={product.image}
                className="w-8 h-8 rounded object-cover"
                alt={product.name}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{product.name}</span>
                <span className="text-xs text-default-400">#{product.id}</span>
              </div>
            </div>
          );

        case "short_description":
          return (
            <p className="text-sm line-clamp-2">
              {product.short_description}
            </p>
          );

        case "categories": {
          const cats = product.categories ?? [];
          if (!cats.length) {
            return (
              <span className="text-xs text-default-400">
                —
              </span>
            );
          }

          return (
            <div className="flex flex-wrap gap-1">
              {cats.map((key) => (
                <span
                  key={key}
                  className="px-2 py-0.5 rounded-full border text-[11px] leading-tight"
                >
                  {categoryLabelMap.get(key) ?? key}
                </span>
              ))}
            </div>
          );
        }

        case "filters": {
          const fltrs = product.filters ?? [];
          if (!fltrs.length) {
            return (
              <span className="text-xs text-default-400">
                —
              </span>
            );
          }

          return (
            <div className="flex flex-wrap gap-1">
              {fltrs.map((key) => (
                <span
                  key={key}
                  className="px-2 py-0.5 rounded-full border text-[11px] leading-tight"
                >
                  {filterLabelMap.get(key) ?? key}
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
                  if (key === "edit") openEditModal(product);
                  if (key === "delete") handleDelete(product.id);
                }}
              >
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem key="delete" color="danger">
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );

        default:
          // covers id, created_at, etc.
          return product[key as keyof Product] as any;
      }
    },
    [],
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const selectedCategoryLabels = React.useMemo(() => {
    const keys = selectionToArray(
      selectedCategories,
      CATEGORY_OPTIONS.map((c) => c.key),
    );
    return keys.map((k) => categoryLabelMap.get(k) ?? k);
  }, [selectedCategories]);

  const selectedFilterLabels = React.useMemo(() => {
    const keys = selectionToArray(
      selectedFilters,
      FILTER_OPTIONS.map((f) => f.key),
    );
    return keys.map((k) => filterLabelMap.get(k) ?? k);
  }, [selectedFilters]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
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
                  color="primary"
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
              color="primary"
              variant="flat"
              endContent={<PlusIcon />}
              onPress={openAddModal}
            >
              Add New
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-small">
            Total {filteredItems.length} products
          </span>

          <label className="flex items-center text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-small ml-1"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, visibleColumns, filteredItems.length, onRowsPerPageChange]);

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
                    `${formValues.name.trim().length}/15 characters`
                  }
                  onValueChange={(v) => {
                    setFormValues((p) => ({ ...p, name: v }));
                    const trimmed = v.trim();
                    setFormErrors((prev) => {
                      const next = { ...prev };
                      if (!trimmed) {
                        next.name = "Name is required.";
                      } else if (trimmed.length > 40) {
                        next.name = "Name must be 40 characters or less.";
                      } else {
                        next.name = undefined;
                      }
                      return next;
                    });
                  }}
                />

                {existingImage && !imageFile && (
                  <div className="flex flex-col gap-2">
                    <img
                      src={existingImage}
                      className="w-24 h-24 rounded object-cover"
                      alt="Current product"
                    />
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      onPress={() => setExistingImage(null)}
                    >
                      Remove Image
                    </Button>
                  </div>
                )}

                <Input
                  type="file"
                  label="Upload Image"
                  variant="bordered"
                  accept="image/*"
                  onChange={(e) =>
                    setImageFile(e.target.files?.[0] ?? null)
                  }
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
                    `${formValues.short_description.trim().length}/20 characters`
                  }
                  onValueChange={(v) => {
                    setFormValues((p) => ({
                      ...p,
                      short_description: v,
                    }));
                    const trimmed = v.trim();
                    setFormErrors((prev) => {
                      const next = { ...prev };
                      if (!trimmed) {
                        next.short_description =
                          "Short description is required.";
                      } else if (trimmed.length > 80) {
                        next.short_description =
                          "Short description must be 20 characters or less.";
                      } else {
                        next.short_description = undefined;
                      }
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
                    setFormValues((p) => ({
                      ...p,
                      long_description: v,
                    }));
                    const trimmed = v.trim();
                    setFormErrors((prev) => {
                      const next = { ...prev };
                      if (!trimmed) {
                        next.long_description =
                          "Long description is required.";
                      } else if (trimmed.length > 300) {
                        next.long_description =
                          "Long description must be 300 characters or less.";
                      } else {
                        next.long_description = undefined;
                      }
                      return next;
                    });
                  }}
                />

                <div className="flex flex-col gap-3">
                  <div>
                    <span className="block text-sm mb-1">Categories</span>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="w-full justify-between"
                        >
                          {selectedCategoryLabels.length > 0
                            ? selectedCategoryLabels.join(", ")
                            : "Select categories"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Select categories"
                        closeOnSelect={false}
                        selectionMode="multiple"
                        selectedKeys={selectedCategories}
                        onSelectionChange={setSelectedCategories}
                      >
                        {CATEGORY_OPTIONS.map((c) => (
                          <DropdownItem key={c.key}>{c.label}</DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  <div>
                    <span className="block text-sm mb-1">Filters</span>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="w-full justify-between"
                        >
                          {selectedFilterLabels.length > 0
                            ? selectedFilterLabels.join(", ")
                            : "Select filters"}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Select filters"
                        closeOnSelect={false}
                        selectionMode="multiple"
                        selectedKeys={selectedFilters}
                        onSelectionChange={setSelectedFilters}
                      >
                        {FILTER_OPTIONS.map((f) => (
                          <DropdownItem key={f.key}>{f.label}</DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
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
                  color="primary"
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
    </>
  );
}