// lib/api.ts

import { client } from "./sanity";
import {
  getProductsQuery,
  getProductBySlugQuery,
  getCategoriesQuery,
  getProductsByCategoryQuery,
} from "./queries";
import { Product, Category, Origin, Taste } from "@/types";

export async function getProducts(filters?: {
  origin?: Origin;
  taste?: Taste;
}): Promise<Product[]> {
  return await client.fetch<Product[]>(getProductsQuery, {
    origin: filters?.origin,
    taste: filters?.taste,
  });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!slug) return null;

  return await client.fetch<Product | null>(getProductBySlugQuery, { slug });
}

export async function getCategories(): Promise<Category[]> {
  return await client.fetch<Category[]>(getCategoriesQuery);
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  if (!categorySlug) return [];

  return await client.fetch<Product[]>(getProductsByCategoryQuery, {
    categorySlug,
  });
}