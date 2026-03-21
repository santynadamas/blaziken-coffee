// types/index.ts

import { SanityImage } from "./sanity";

export interface Slug {
  current: string;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  slug: Slug;
  image?: SanityImage;
}

export type Origin = "america" | "europa" | "asia" | "oceania" | "africa";
export type Taste = "citric" | "sweet";

export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image?: SanityImage | null;
  category: {
    _id: string;
    name: string;
    slug: Slug;
    image?: SanityImage;
  };
  available: boolean;
  slug: Slug;
  origin?: Origin;
  taste?: Taste;
  type: "beans" | "ground" | "capsules";
}