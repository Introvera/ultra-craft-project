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
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@heroui/react";
import type { SortDescriptor } from "@heroui/react";
import {
  PlusIcon,
  SearchIcon,
  ChevronDownIcon,
  VerticalDotsIcon,
} from "../icons";

type Project = {
  id: number;
  name: string;
  image: string[]; // array of URLs
  description: string;
  location: string;
  created_at: string;
};

type ProjectsTableProps = {
  initialProjects: (Project & {
    image?: string[] | string | null;
  })[];
};

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "LOCATION", uid: "location", sortable: true },
  { name: "DESCRIPTION", uid: "description", sortable: false },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["name", "location", "description", "actions"];

function normalizeProject(p: any): Project {
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
}

type FormErrors = {
  name?: string;
  description?: string;
  location?: string;
  images?: string;
};

export default function ProjectsTable({ initialProjects }: ProjectsTableProps) {
  const [projects, setProjects] = React.useState<Project[]>(() =>
    initialProjects.map((p) => normalizeProject(p)),
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

  const [viewOpen, setViewOpen] = React.useState(false);
  const [viewProject, setViewProject] = React.useState<Project | null>(null);

  const [editingProject, setEditingProject] = React.useState<Project | null>(
    null,
  );

  const [formValues, setFormValues] = React.useState({
    name: "",
    description: "",
    location: "",
  });

  const [formErrors, setFormErrors] = React.useState<FormErrors>({});

  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);

  const [saving, setSaving] = React.useState(false);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let items = [...projects];
    if (hasSearchFilter) {
      const q = filterValue.toLowerCase();
      items = items.filter(
        (project) =>
          project.name.toLowerCase().includes(q) ||
          project.location.toLowerCase().includes(q),
      );
    }
    return items;
  }, [projects, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Project] as any;
      const second = b[sortDescriptor.column as keyof Project] as any;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  function resetForm() {
    setFormValues({
      name: "",
      description: "",
      location: "",
    });
    setFormErrors({});
    setImageUrls([]);
    setImageFiles([]);
  }

  function openAddModal() {
    setEditingProject(null);
    resetForm();
    onOpen();
  }

  function openEditModal(project: Project) {
    setEditingProject(project);
    setFormValues({
      name: project.name,
      description: project.description,
      location: project.location,
    });
    setFormErrors({});
    setImageUrls(project.image ?? []);
    setImageFiles([]);
    onOpen();
  }

  function validateForm(): boolean {
    const errors: FormErrors = {};

    const name = formValues.name.trim();
    const desc = formValues.description.trim();
    const loc = formValues.location.trim();

    if (!name) {
      errors.name = "Name is required.";
    } else if (name.length > 100) {
      errors.name = "Name must be 100 characters or less.";
    }

    if (!loc) {
      errors.location = "Location is required.";
    } else if (loc.length > 80) {
      errors.location = "Location must be 80 characters or less.";
    }

    if (!desc) {
      errors.description = "Description is required.";
    } else if (desc.length > 500) {
      errors.description = "Description must be 500 characters or less.";
    }

    // Image validation: at least one existing URL or new file
    const totalImages = imageUrls.length + imageFiles.length;
    if (totalImages === 0) {
      errors.images = "At least one image is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSave(close: () => void) {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const finalImages = [...imageUrls];

      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const fd = new FormData();
          fd.append("file", file);

          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: fd,
          });

          if (!uploadRes.ok) {
            // Upload failed – show a generic error on images
            setFormErrors((prev) => ({
              ...prev,
              images: "Image upload failed. Please try again.",
            }));
            setSaving(false);
            return;
          }

          const data = await uploadRes.json();
          finalImages.push(data.url);
        }
      }

      // Extra safety check (in case something went wrong above)
      if (!finalImages.length) {
        setFormErrors((prev) => ({
          ...prev,
          images: "At least one image is required.",
        }));
        setSaving(false);
        return;
      }

      const payload = {
        name: formValues.name.trim(),
        image: finalImages,
        description: formValues.description.trim(),
        location: formValues.location.trim(),
      };

      if (editingProject) {
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          setSaving(false);
          return;
        }

        const updatedFromApi = await res.json();
        const updated = normalizeProject(updatedFromApi);

        setProjects((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p)),
        );
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          setSaving(false);
          return;
        }

        const createdFromApi = await res.json();
        const created = normalizeProject(createdFromApi);

        setProjects((prev) => [created, ...prev]);
      }

      close();
      resetForm();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) {
      return;
    }
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  const renderCell = React.useCallback(
    (project: Project, columnKey: React.Key) => {
      const key = columnKey as keyof Project | "actions";

      switch (key) {
        case "name": {
          const firstImage = project.image[0];
          return (
            <div className="flex items-center gap-3">
              {firstImage ? (
                <img
                  src={firstImage}
                  className="w-8 h-8 rounded object-cover"
                  alt={project.name}
                />
              ) : (
                <div className="w-8 h-8 rounded bg-default-200" />
              )}
              <div className="flex flex-col">
                <span className="text-sm font-medium">{project.name}</span>
                <span className="text-xs text-default-400">#{project.id}</span>
              </div>
            </div>
          );
        }

        case "location":
          return <span className="text-sm">{project.location}</span>;

        case "description":
          return (
            <p className="text-sm line-clamp-2">
              {project.description}
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
                  if (key === "view") {
                    setViewProject(project);
                    setViewOpen(true);
                  }
                  if (key === "edit") openEditModal(project);
                  if (key === "delete") handleDelete(project.id);
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
          return project[key as keyof Project] as any;
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
            placeholder="Search by name or location..."
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
            Total {filteredItems.length} projects
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
        aria-label="Projects table"
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

        <TableBody emptyContent="No projects found" items={sortedItems}>
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
                {editingProject ? "Edit Project" : "Add Project"}
              </ModalHeader>

              <ModalBody>
                <Input
                  isRequired
                  label="Name"
                  variant="bordered"
                  value={formValues.name}
                  maxLength={100}
                  isInvalid={!!formErrors.name}
                  errorMessage={
                    formErrors.name ||
                    `${formValues.name.trim().length}/100 characters`
                  }
                  onValueChange={(v) => {
                    setFormValues((p) => ({ ...p, name: v }));
                    const trimmed = v.trim();
                    setFormErrors((prev) => {
                      const next = { ...prev };
                      if (!trimmed) {
                        next.name = "Name is required.";
                      } else if (trimmed.length > 100) {
                        next.name = "Name must be 100 characters or less.";
                      } else {
                        next.name = undefined;
                      }
                      return next;
                    });
                  }}
                />

                <Input
                  isRequired
                  label="Location"
                  variant="bordered"
                  value={formValues.location}
                  maxLength={80}
                  isInvalid={!!formErrors.location}
                  errorMessage={
                    formErrors.location ||
                    `${formValues.location.trim().length}/80 characters`
                  }
                  onValueChange={(v) => {
                    setFormValues((p) => ({ ...p, location: v }));
                    const trimmed = v.trim();
                    setFormErrors((prev) => {
                      const next = { ...prev };
                      if (!trimmed) {
                        next.location = "Location is required.";
                      } else if (trimmed.length > 80) {
                        next.location =
                          "Location must be 80 characters or less.";
                      } else {
                        next.location = undefined;
                      }
                      return next;
                    });
                  }}
                />

                {imageUrls.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium">Images</span>
                    <div className="flex flex-wrap gap-2">
                      {imageUrls.map((url, idx) => (
                        <div key={url} className="relative">
                          <img
                            src={url}
                            className="w-20 h-20 rounded object-cover"
                            alt={`Project image ${idx + 1}`}
                          />
                          <button
                            type="button"
                            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-xs text-white"
                            onClick={() =>
                              setImageUrls((prev) =>
                                prev.filter((_, i) => i !== idx),
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

                <Input
                  type="file"
                  label="Upload Images"
                  variant="bordered"
                  accept="image/*"
                  multiple
                  isInvalid={!!formErrors.images}
                  errorMessage={formErrors.images}
                  onChange={(e) => {
                    const files = Array.from(e.target.files ?? []);
                    if (!files.length) return;
                    setImageFiles((prev) => [...prev, ...files]);

                    // Clear image error if user selected files
                    setFormErrors((prev) => {
                      const next = { ...prev };
                      if ((imageUrls.length + files.length) > 0) {
                        next.images = undefined;
                      }
                      return next;
                    });
                  }}
                />

                <Textarea
                  isRequired
                  label="Description"
                  variant="bordered"
                  value={formValues.description}
                  maxLength={500}
                  isInvalid={!!formErrors.description}
                  errorMessage={
                    formErrors.description ||
                    `${formValues.description.trim().length}/500 characters`
                  }
                  onValueChange={(v) => {
                    setFormValues((p) => ({ ...p, description: v }));
                    const trimmed = v.trim();
                    setFormErrors((prev) => {
                      const next = { ...prev };
                      if (!trimmed) {
                        next.description = "Description is required.";
                      } else if (trimmed.length > 500) {
                        next.description =
                          "Description must be 500 characters or less.";
                      } else {
                        next.description = undefined;
                      }
                      return next;
                    });
                  }}
                />
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
                  {editingProject ? "Save Changes" : "Create"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* View details modal */}
      <Modal
        isOpen={viewOpen}
        placement="top-center"
        onOpenChange={setViewOpen}
      >
        <ModalContent>
          {() =>
            viewProject && (
              <>
                <ModalHeader>{viewProject.name}</ModalHeader>
                <ModalBody>
                  {viewProject.image.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {viewProject.image.map((url, idx) => (
                        <img
                          key={url}
                          src={url}
                          className="w-24 h-24 rounded object-cover"
                          alt={`Project image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  <p className="text-sm font-bold">Location:</p>
                  <p className="text-sm mb-2">{viewProject.location}</p>

                  <p className="text-sm font-medium">Description:</p>
                  <p className="text-sm whitespace-pre-line mb-3">
                    {viewProject.description}
                  </p>
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