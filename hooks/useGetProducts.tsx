// hooks/useGetProducts.tsx
import { useState, useEffect } from "react";
import { client } from "@/lib/sanity";
import { Product, Origin, Taste } from "@/types";

export const useProducts = (filters?: { origin?: Origin; taste?: Taste }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let query = `*[_type == "product" && available == true`;

    if (filters?.origin) query += ` && origin == "${filters.origin}"`;
    if (filters?.taste) query += ` && taste == "${filters.taste}"`;

    query += `]{
      _id,
      name,
      description,
      price,
      image,
      slug,
      available,
      origin,
      taste,
      category->{_id,name,slug}
    }`;

    client
      .fetch(query)
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [filters?.origin, filters?.taste]);

  return { products, loading, error };
};