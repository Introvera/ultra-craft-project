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
// import type { SortDescriptor } from "@heroui/react";
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
// };

// type ProductsTableProps = {
//   initialProducts: Product[];
// };

// const columns = [
//   { name: "ID", uid: "id", sortable: true },
//   { name: "NAME", uid: "name", sortable: true },
//   { name: "SHORT DESCRIPTION", uid: "short_description", sortable: false },
//   { name: "ACTIONS", uid: "actions" },
// ];

// const INITIAL_VISIBLE_COLUMNS = ["name", "short_description", "actions"];

// export default function ProductsTable({ initialProducts }: ProductsTableProps) {
//   const [products, setProducts] = React.useState<Product[]>(initialProducts);

//   // table state
//   const [filterValue, setFilterValue] = React.useState("");
//   const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
//   const [visibleColumns, setVisibleColumns] = React.useState<any>(
//     new Set(INITIAL_VISIBLE_COLUMNS),
//   );
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
//     column: "name",
//     direction: "ascending",
//   });
//   const [page, setPage] = React.useState(1);

//   // modal state
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [editingProduct, setEditingProduct] = React.useState<Product | null>(
//     null,
//   );

//   const [formValues, setFormValues] = React.useState({
//     name: "",
//     image: "",
//     short_description: "",
//     long_description: "",
//   });

//   // new: file state for Cloudinary upload
//   const [imageFile, setImageFile] = React.useState<File | null>(null);

//   const [saving, setSaving] = React.useState(false);

//   const hasSearchFilter = Boolean(filterValue);

//   // header cols
//   const headerColumns = React.useMemo(() => {
//     if (visibleColumns === "all") return columns;
//     return columns.filter((column) =>
//       Array.from(visibleColumns).includes(column.uid),
//     );
//   }, [visibleColumns]);

//   // filter by search
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

//   // open modals
//   function openAddModal() {
//     setEditingProduct(null);
//     setFormValues({
//       name: "",
//       image: "",
//       short_description: "",
//       long_description: "",
//     });
//     setImageFile(null); // reset file
//     onOpen();
//   }

//   function openEditModal(product: Product) {
//     setEditingProduct(product);
//     setFormValues({
//       name: product.name,
//       image: product.image,
//       short_description: product.short_description,
//       long_description: product.long_description,
//     });
//     setImageFile(null); // no new file yet
//     onOpen();
//   }

//   // save (create / update)
//   async function handleSave(close: () => void) {
//     setSaving(true);
//     try {
//       // 1) decide final image URL
//       let imageUrl = formValues.image;

//       if (imageFile) {
//         const uploadData = new FormData();
//         uploadData.append("file", imageFile);

//         const uploadRes = await fetch("/api/upload", {
//           method: "POST",
//           body: uploadData,
//         });

//         if (!uploadRes.ok) {
//           console.error("Failed to upload image");
//           return;
//         }

//         const { url } = (await uploadRes.json()) as { url: string };
//         imageUrl = url;
//       }

//       const payload = {
//         name: formValues.name,
//         image: imageUrl,
//         short_description: formValues.short_description,
//         long_description: formValues.long_description,
//       };

//       if (editingProduct) {
//         // update
//         const res = await fetch(`/api/products/${editingProduct.id}`, {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });

//         if (!res.ok) {
//           console.error("Failed to update product");
//           return;
//         }

//         const updated = (await res.json()) as Product;
//         setProducts((prev) =>
//           prev.map((p) => (p.id === updated.id ? updated : p)),
//         );
//       } else {
//         // create
//         const res = await fetch("/api/products", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });

//         if (!res.ok) {
//           console.error("Failed to create product");
//           return;
//         }

//         const created = (await res.json()) as Product;
//         setProducts((prev) => [created, ...prev]);
//       }

//       close();
//       setImageFile(null);
//     } finally {
//       setSaving(false);
//     }
//   }

//   // delete
//   async function handleDelete(id: number) {
//     const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
//     if (!res.ok) {
//       console.error("Failed to delete product");
//       return;
//     }
//     setProducts((prev) => prev.filter((p) => p.id !== id));
//   }

//   // cell renderer
//   const renderCell = React.useCallback(
//     (product: Product, columnKey: React.Key) => {
//       const key = String(columnKey) as keyof Product | "actions";

//       switch (key) {
//         case "name":
//           return (
//             <div className="flex items-center gap-3">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-8 h-8 rounded object-cover"
//               />
//               <div className="flex flex-col">
//                 <span className="text-sm font-medium">{product.name}</span>
//                 <span className="text-xs text-default-400">#{product.id}</span>
//               </div>
//             </div>
//           );
//         case "short_description":
//           return (
//             <p className="text-sm text-default-400 line-clamp-2">
//               {product.short_description}
//             </p>
//           );
//         case "actions":
//           return (
//             <div className="relative flex justify-end items-center gap-2">
//               <Dropdown>
//                 <DropdownTrigger>
//                   <Button isIconOnly size="sm" variant="light">
//                     <VerticalDotsIcon className="text-default-300" />
//                   </Button>
//                 </DropdownTrigger>
//                 <DropdownMenu
//                   onAction={(key) => {
//                     if (key === "edit") {
//                       openEditModal(product);
//                     } else if (key === "delete") {
//                       handleDelete(product.id);
//                     }
//                   }}
//                 >
//                   <DropdownItem key="edit">Edit</DropdownItem>
//                   <DropdownItem
//                     key="delete"
//                     className="text-danger"
//                     color="danger"
//                   >
//                     Delete
//                   </DropdownItem>
//                 </DropdownMenu>
//               </Dropdown>
//             </div>
//           );
//         default:
//           return (product as any)[key];
//       }
//     },
//     [],
//   );

//   // handlers
//   const onNextPage = React.useCallback(() => {
//     if (page < pages) setPage(page + 1);
//   }, [page, pages]);

//   const onPreviousPage = React.useCallback(() => {
//     if (page > 1) setPage(page - 1);
//   }, [page]);

//   const onRowsPerPageChange = React.useCallback(
//     (e: React.ChangeEvent<HTMLSelectElement>) => {
//       setRowsPerPage(Number(e.target.value));
//       setPage(1);
//     },
//     [],
//   );

//   const onSearchChange = React.useCallback((value: string) => {
//     if (value) {
//       setFilterValue(value);
//       setPage(1);
//     } else {
//       setFilterValue("");
//     }
//   }, []);

//   const onClear = React.useCallback(() => {
//     setFilterValue("");
//     setPage(1);
//   }, []);

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
//             onClear={onClear}
//             onValueChange={onSearchChange}
//           />
//           <div className="flex gap-3">
//             <Dropdown>
//               <DropdownTrigger className="hidden sm:flex">
//                 <Button
//                   endContent={<ChevronDownIcon className="text-small" />}
//                   variant="flat"
//                 >
//                   Columns
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 disallowEmptySelection
//                 aria-label="Table Columns"
//                 closeOnSelect={false}
//                 selectedKeys={visibleColumns}
//                 selectionMode="multiple"
//                 onSelectionChange={setVisibleColumns}
//               >
//                 {columns.map((column) => (
//                   <DropdownItem key={column.uid} className="capitalize">
//                     {column.name}
//                   </DropdownItem>
//                 ))}
//               </DropdownMenu>
//             </Dropdown>
//             <Button
//               color="primary"
//               endContent={<PlusIcon />}
//               onPress={openAddModal}
//             >
//               Add New
//             </Button>
//           </div>
//         </div>
//         <div className="flex justify-between items-center">
//           <span className="text-default-400 text-small">
//             Total {filteredItems.length} products
//           </span>
//           <label className="flex items-center text-default-400 text-small">
//             Rows per page:
//             <select
//               className="bg-transparent outline-none text-default-400 text-small ml-1"
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
//   }, [
//     filterValue,
//     visibleColumns,
//     filteredItems.length,
//     onRowsPerPageChange,
//     onSearchChange,
//     onClear,
//   ]);

//   const bottomContent = React.useMemo(() => {
//     const selectedCount =
//       selectedKeys === "all"
//         ? filteredItems.length
//         : (selectedKeys as Set<unknown>).size;

//     return (
//       <div className="py-2 px-2 flex justify-between items-center">
//         <span className="w-[30%] text-small text-default-400">
//           {selectedKeys === "all"
//             ? "All items selected"
//             : `${selectedCount} of ${filteredItems.length} selected`}
//         </span>
//         <Pagination
//           isCompact
//           showControls
//           showShadow
//           color="primary"
//           page={page}
//           total={pages}
//           onChange={setPage}
//         />
//         <div className="hidden sm:flex w-[30%] justify-end gap-2">
//           <Button
//             isDisabled={pages === 1}
//             size="sm"
//             variant="flat"
//             onPress={onPreviousPage}
//           >
//             Previous
//           </Button>
//           <Button
//             isDisabled={pages === 1}
//             size="sm"
//             variant="flat"
//             onPress={onNextPage}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     );
//   }, [
//     selectedKeys,
//     filteredItems.length,
//     page,
//     pages,
//     onPreviousPage,
//     onNextPage,
//   ]);

//   return (
//     <>
//       <Table
//         isHeaderSticky
//         aria-label="Products table"
//         bottomContent={bottomContent}
//         bottomContentPlacement="outside"
//         classNames={{ wrapper: "max-h-[382px]" }}
//         selectedKeys={selectedKeys}
//         selectionMode="multiple"
//         sortDescriptor={sortDescriptor}
//         topContent={topContent}
//         topContentPlacement="outside"
//         onSelectionChange={setSelectedKeys}
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
//         <TableBody emptyContent={"No products found"} items={sortedItems}>
//           {(item) => (
//             <TableRow key={item.id}>
//               {(columnKey) => (
//                 <TableCell>{renderCell(item, columnKey)}</TableCell>
//               )}
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>

//       {/* Add/Edit modal */}
//       <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">
//                 {editingProduct ? "Edit Product" : "Add Product"}
//               </ModalHeader>
//               <ModalBody>
//                 <Input
//                   label="Name"
//                   variant="bordered"
//                   value={formValues.name}
//                   onValueChange={(v) =>
//                     setFormValues((prev) => ({ ...prev, name: v }))
//                   }
//                 />
//                 <Input
//                   label="Image URL (optional)"
//                   variant="bordered"
//                   value={formValues.image}
//                   onValueChange={(v) =>
//                     setFormValues((prev) => ({ ...prev, image: v }))
//                   }
//                 />
//                 <Input
//                   type="file"
//                   label="Upload Image"
//                   variant="bordered"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0] ?? null;
//                     setImageFile(file);
//                   }}
//                 />
//                 <Input
//                   label="Short Description"
//                   variant="bordered"
//                   value={formValues.short_description}
//                   onValueChange={(v) =>
//                     setFormValues((prev) => ({
//                       ...prev,
//                       short_description: v,
//                     }))
//                   }
//                 />
//                 <Textarea
//                   label="Long Description"
//                   variant="bordered"
//                   value={formValues.long_description}
//                   onValueChange={(v) =>
//                     setFormValues((prev) => ({
//                       ...prev,
//                       long_description: v,
//                     }))
//                   }
//                 />
//               </ModalBody>
//               <ModalFooter>
//                 <Button variant="flat" onPress={onClose}>
//                   Cancel
//                 </Button>
//                 <Button
//                   color="primary"
//                   isLoading={saving}
//                   onPress={() => handleSave(onClose)}
//                 >
//                   {editingProduct ? "Save changes" : "Create"}
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
import type { SortDescriptor } from "@heroui/react";
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
};

type ProductsTableProps = {
  initialProducts: Product[];
};

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "SHORT DESCRIPTION", uid: "short_description", sortable: false },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["name", "short_description", "actions"];

export default function ProductsTable({ initialProducts }: ProductsTableProps) {
  const [products, setProducts] = React.useState<Product[]>(initialProducts);

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

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [existingImage, setExistingImage] = React.useState<string | null>(null);

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

  function openAddModal() {
    setEditingProduct(null);
    setFormValues({
      name: "",
      short_description: "",
      long_description: "",
    });
    setExistingImage(null);
    setImageFile(null);
    onOpen();
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);
    setFormValues({
      name: product.name,
      short_description: product.short_description,
      long_description: product.long_description,
    });
    setExistingImage(product.image);
    setImageFile(null);
    onOpen();
  }

  async function handleSave(close: () => void) {
    setSaving(true);
    try {
      let finalImageUrl =
        editingProduct && !imageFile ? editingProduct.image : "";

      if (!editingProduct && !imageFile) {
        console.error("Image is required for new product");
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
          return;
        }

        const data = await uploadRes.json();
        finalImageUrl = data.url;
      }

      const payload = {
        name: formValues.name,
        image: finalImageUrl,
        short_description: formValues.short_description,
        long_description: formValues.long_description,
      };

      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          console.error("Failed to update");
          return;
        }

        const updated = await res.json();
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
          return;
        }

        const created = await res.json();
        setProducts((prev) => [created, ...prev]);
      }

      close();
      setImageFile(null);
      setExistingImage(null);
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
          return product[key];
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

            <Button color="primary" variant="flat" endContent={<PlusIcon />} onPress={openAddModal}>
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
  }, [filterValue, visibleColumns, filteredItems.length]);

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
                required
                  label="Name"
                  variant="bordered"
                  value={formValues.name}
                  onValueChange={(v) =>
                    setFormValues((p) => ({ ...p, name: v }))
                  }
                />

                {existingImage && !imageFile && (
                  <div className="flex flex-col gap-2">
                    <img
                      src={existingImage}
                      className="w-24 h-24 rounded object-cover"
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
                  label="Short Description"
                  variant="bordered"
                  value={formValues.short_description}
                  onValueChange={(v) =>
                    setFormValues((p) => ({ ...p, short_description: v }))
                  }
                />

                <Textarea
                required
                  label="Long Description"
                  variant="bordered"
                  value={formValues.long_description}
                  onValueChange={(v) =>
                    setFormValues((p) => ({ ...p, long_description: v }))
                  }
                />
              </ModalBody>

              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
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