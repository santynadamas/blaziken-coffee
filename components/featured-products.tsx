/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { urlFor } from "@/lib/image";
import Link from "next/link";
import { useProducts } from "@/hooks/useGetProducts";
import { Origin, Taste } from "@/types";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

interface FeaturedProductsProps {
  filters?: {
    origin?: Origin;
    taste?: Taste;
  };
}

export default function FeaturedProducts({ filters }: FeaturedProductsProps) {
  const { products, loading, error } = useProducts(filters);

  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!embla) return;

    const update = () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
    };

    update();
    embla.on("select", update);

    return () => {
      embla.off("select", update);
    };
  }, [embla]);

  const skeletonArray = [1, 2, 3, 4];

  if (error)
    return <p className="py-12 text-center text-red-500">{error}</p>;

  return (
    <section id="featured-products" className="w-full px-4 py-12 bg-[#F8F4E3] dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Featured Products
          </h2>
          <p className="mt-3 font-semibold text-gray-700 dark:text-gray-400">
            Check out our best selections
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {loading
                ? skeletonArray.map((skeleton) => (
                    <div
                      key={skeleton}
                      className="flex-[0_0_100%] sm:flex-[0_0_60%] md:flex-[0_0_40%] lg:flex-[0_0_25%]"
                    >
                      <Card className="overflow-hidden rounded-2xl p-0 bg-[#E6D8A3] dark:bg-gray-800 animate-pulse">
                        <div className="w-full aspect-[16/9] bg-gray-300 dark:bg-gray-700" />
                        <CardContent className="p-4 space-y-2 text-gray-900 dark:text-white">
                          <div className="w-3/4 h-6 bg-gray-300 rounded dark:bg-gray-700"></div>
                          <div className="w-full h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
                          <div className="w-1/2 h-4 mt-2 bg-gray-300 rounded dark:bg-gray-700"></div>
                          <div className="w-1/3 h-5 mt-4 bg-gray-300 rounded dark:bg-gray-700"></div>
                        </CardContent>
                      </Card>
                    </div>
                  ))
                : products.map((product) => (
                    <div
                      key={product._id}
                      className="flex-[0_0_100%] sm:flex-[0_0_60%] md:flex-[0_0_40%] lg:flex-[0_0_25%]"
                    >
                      <Card className="overflow-hidden rounded-2xl p-0 bg-[#E6D8A3] dark:bg-gray-800">
                        <Link
                          href={`/product/${product.slug.current}`}
                          className="block h-full"
                        >
                          {product.image && (
                            <img
                              src={urlFor(product.image)
                                .width(600)
                                .height(400)
                                .url()}
                              alt={product.name}
                              className="w-full aspect-[16/9] object-cover transition-transform duration-500 hover:scale-105 rounded-t-2xl"
                            />
                          )}

                          <CardContent className="p-4 text-gray-900 dark:text-white">
                            <h3 className="text-lg font-bold">{product.name}</h3>
                            {product.description && (
                              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                                {product.description}
                              </p>
                            )}
                            <div className="mt-2 space-y-1 text-sm">
                              <p className="text-blue-700 dark:text-blue-300">
                                <span className="font-semibold">Origin:</span>{" "}
                                {product.origin ?? "-"}
                              </p>
                              <p className="text-green-700 dark:text-green-300">
                                <span className="font-semibold">Taste:</span>{" "}
                                {product.taste ?? "-"}
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <p className="font-bold text-amber-700 dark:text-amber-400">
                                ${product.price ? product.price.toFixed(2) : "0.00"}
                              </p>
                              <span className="text-sm font-semibold text-[#1b0f0c] dark:text-amber-200 hover:underline">
                                View →
                              </span>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    </div>
                  ))}
            </div>
          </div>

          <button
            onClick={() => embla?.scrollPrev()}
            disabled={!canPrev}
            className="absolute z-20 p-3 text-white transition -translate-y-1/2 
            bg-[#1b0f0c] rounded-full top-1/2 -left-3 hover:bg-[#3b2c28] 
            disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ◀
          </button>

          <button
            onClick={() => embla?.scrollNext()}
            disabled={!canNext}
            className="absolute z-20 p-3 text-white transition -translate-y-1/2 
            bg-[#1b0f0c] rounded-full top-1/2 -right-3 hover:bg-[#3b2c28] 
            disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
