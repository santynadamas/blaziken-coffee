"use client";

import { useState, useEffect } from "react";
import { Category } from "@/types";
import { getCategories } from "@/lib/api";

export function useCategories(limit?: number) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCategories().then((data) => {
      if (limit) {
        setCategories(data.slice(0, limit));
      } else {
        setCategories(data);
      }
      setLoading(false);
    });
  }, [limit]);

  return { categories, loading };
}