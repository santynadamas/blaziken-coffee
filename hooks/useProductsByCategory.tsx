// hooks/useProductsByCategory.ts

"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";

export function useProductsByCategory(categorySlug: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categorySlug) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products?category=${categorySlug}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  return { products, loading };
}