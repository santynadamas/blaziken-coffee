
import BannerFortune from "@/components/banner-fortune";
import { getProductBySlug } from "@/lib/api";
import { ProductClient } from "./ProductClient";


interface PageProps {
  params: Promise<{ slug: string }>;
}
export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) return <p className="py-20 text-center">Slug no proporcionado</p>;

  const product = await getProductBySlug(slug);

  if (!product) return <p className="py-20 text-center">Product not found</p>;

  return (
    <div className="min-h-screen bg-[#F8F4E3] dark:bg-gray-900">
      <BannerFortune />
      <div className="max-w-5xl px-4 py-16 mx-auto">
        <ProductClient product={product} />
      </div>
    </div>
  );
}
