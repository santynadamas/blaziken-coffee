// app/coffees/[type]/page.tsx
import ProductClient from "@/components/product-client";
import { getProductsByCategory } from "@/lib/api";


interface PageProps {
  params: Promise<{ type: string }>;
}

export default async function CoffeeTypePage({ params }: PageProps) {
  const { type } = await params;

  if (!type) return <div>No coffee type specified.</div>;

  const products = await getProductsByCategory(type);

  return (
    <div className="p-6">
      <ProductClient products={products} />
    </div>
  );
}