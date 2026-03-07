/**
 * Product category/subtype/filter tree.
 * - Main categories: Home Furniture, Office Furniture, Deco and Accessories, Furniture Packages.
 * - Home Furniture has subtypes (Living Room, Bedroom, Kitchen, Dining Room); each subtype has filters.
 * - Other categories have filters directly (no subtype).
 */

export type MainCategoryId =
  | "home_furniture"
  | "office_furniture"
  | "deco_accessories"
  | "furniture_packages";

export type SubTypeId =
  | "living_room"
  | "bedroom"
  | "kitchen"
  | "dining_room";

export interface FilterOption {
  id: string;
  label: string;
}

export interface SubTypeOption {
  id: SubTypeId;
  label: string;
  filters: FilterOption[];
}

export interface CategoryOption {
  id: MainCategoryId;
  label: string;
  /** Only home_furniture has subtypes; others have filters directly. */
  subtypes?: SubTypeOption[];
  /** Used when category has no subtypes (office, deco, packages). */
  filters?: FilterOption[];
}

export const CATEGORY_TREE: CategoryOption[] = [
  {
    id: "home_furniture",
    label: "Home Furniture",
    subtypes: [
      {
        id: "living_room",
        label: "Living Room",
        filters: [
          { id: "sofa_sets", label: "Sofa sets" },
          { id: "coffee_tables", label: "Coffee Tables" },
          { id: "tv_cabinets", label: "TV Cabinets" },
          { id: "display_shelves", label: "Display Shelves" },
          { id: "chairs", label: "Chairs" },
          { id: "entry_console_units", label: "Entry Console units" },
        ],
      },
      {
        id: "bedroom",
        label: "Bedroom",
        filters: [
          { id: "beds", label: "Beds" },
          { id: "bedside_cupboards", label: "Bedside Cupboards" },
          { id: "wardrobes", label: "Wardrobes" },
          { id: "dresser_units", label: "Dresser Units" },
          { id: "writing_tables", label: "Writing Tables" },
          { id: "chairs", label: "Chairs" },
          { id: "ottoman_stools_benches", label: "Ottoman Stools and benches" },
        ],
      },
      {
        id: "kitchen",
        label: "Kitchen",
        filters: [
          { id: "pantry", label: "Pantry" },
          { id: "utility_cupboard", label: "Utility Cupboard" },
          { id: "breakfast_counters", label: "Breakfast counters" },
          { id: "bar_chairs", label: "Bar chairs" },
        ],
      },
      {
        id: "dining_room",
        label: "Dining Room",
        filters: [
          { id: "dining_tables", label: "Dining tables" },
          { id: "dining_chairs", label: "Dining Chairs" },
          { id: "side_tables", label: "Side Tables" },
        ],
      },
    ],
  },
  {
    id: "office_furniture",
    label: "Office Furniture",
    filters: [
      { id: "reception_counters", label: "Reception Counters" },
      { id: "reception_seating", label: "Reception Seating" },
      { id: "desks_workstations", label: "Desks and Workstations" },
      { id: "meeting_room_table", label: "Meeting Room Table" },
      { id: "drawer_sets", label: "Drawer Sets" },
      { id: "office_cupboards", label: "Office Cupboards" },
      { id: "chairs", label: "Chairs" },
      { id: "floor_carpets", label: "Floor Carpets" },
    ],
  },
  {
    id: "deco_accessories",
    label: "Deco and Accessories",
    filters: [
      { id: "lighting", label: "Lighting" },
      { id: "flower_pots", label: "Flower pots" },
      { id: "wall_decoratives", label: "Wall decoratives" },
      { id: "curtains", label: "Curtains" },
      { id: "carpets_rugs", label: "Carpets and Rugs" },
      { id: "pillows", label: "Pillows" },
      { id: "other_accessories", label: "Other Accessories" },
    ],
  },
  {
    id: "furniture_packages",
    label: "Furniture Packages",
    filters: [
      { id: "2_bedroom_apartment", label: "2 Bedroom Apartment package" },
      { id: "3_bedroom_apartment", label: "3 Bedroom Apartment Package" },
    ],
  },
];

/** All valid main_category values. */
export const MAIN_CATEGORY_IDS = CATEGORY_TREE.map((c) => c.id) as MainCategoryId[];

/** Get category by id. */
export function getCategory(id: MainCategoryId): CategoryOption | undefined {
  return CATEGORY_TREE.find((c) => c.id === id);
}

/** Get subtype for home_furniture. */
export function getSubType(
  categoryId: MainCategoryId,
  subTypeId: string
): SubTypeOption | undefined {
  const cat = getCategory(categoryId);
  return cat?.subtypes?.find((s) => s.id === subTypeId);
}

/** Get all filter options for a given category + optional subtype. */
export function getFiltersForBranch(
  categoryId: MainCategoryId,
  subTypeId: string | null
): FilterOption[] {
  const cat = getCategory(categoryId);
  if (!cat) return [];
  if (cat.subtypes && subTypeId) {
    const st = cat.subtypes.find((s) => s.id === subTypeId);
    return st?.filters ?? [];
  }
  return cat.filters ?? [];
}

/** All filter IDs that exist in the tree (for validation). */
const allFilterIds = new Set<string>();
CATEGORY_TREE.forEach((c) => {
  if (c.filters) c.filters.forEach((f) => allFilterIds.add(f.id));
  c.subtypes?.forEach((s) => s.filters.forEach((f) => allFilterIds.add(f.id)));
});
export function isValidFilterId(id: string): boolean {
  return allFilterIds.has(id);
}

/** Label for a filter id (search in tree). */
export function getFilterLabel(filterId: string): string {
  for (const c of CATEGORY_TREE) {
    for (const f of c.filters ?? []) {
      if (f.id === filterId) return f.label;
    }
    for (const s of c.subtypes ?? []) {
      const found = s.filters.find((f) => f.id === filterId);
      if (found) return found.label;
    }
  }
  return filterId;
}

/** Label for main category. */
export function getCategoryLabel(categoryId: string): string {
  const c = getCategory(categoryId as MainCategoryId);
  return c?.label ?? categoryId;
}

/** Label for subtype. */
export function getSubTypeLabel(
  categoryId: MainCategoryId,
  subTypeId: string
): string {
  const s = getSubType(categoryId, subTypeId);
  return s?.label ?? subTypeId;
}
