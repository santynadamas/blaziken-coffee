/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { urlFor } from "@/lib/image";
import { useCategories } from "@/hooks/useGetCategories";
import Link from "next/link";

export default function ChooseCategories() {
  const { categories, loading } = useCategories(3);

  const skeletonArray = [1, 2, 3];

  return (
    <section className="w-full px-4 py-12 bg-[#F8F4E3] dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Choose your favorite category
          </h2>
          <p className="mt-3 font-semibold text-gray-700 dark:text-gray-400">
            Explore our wide range of products
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {loading
            ? skeletonArray.map((skeleton) => (
                <Card
                  key={skeleton}
                  className="bg-[#E6D8A3] dark:bg-gray-800 rounded-2xl animate-pulse"
                >
                  <div className="w-full h-56 bg-gray-300 dark:bg-gray-700 rounded-t-2xl" />
                  <CardContent className="flex flex-col justify-between h-full">
                    <div className="space-y-2">
                      <div className="w-3/4 h-6 bg-gray-300 rounded dark:bg-gray-700"></div>
                      <div className="w-full h-4 bg-gray-300 rounded dark:bg-gray-700"></div>
                    </div>
                    <div className="w-1/3 h-5 mt-4 bg-gray-300 rounded dark:bg-gray-700"></div>
                  </CardContent>
                </Card>
              ))
            : categories.map((category) => (
                <Card
                  key={category._id}
                  className="bg-[#E6D8A3] text-gray-900 dark:bg-gray-800 dark:text-white 
                    rounded-2xl transition-transform duration-300 cursor-pointer 
                    hover:-translate-y-1 hover:shadow-lg"
                >
                  {category.image && (
                    <img
                      src={urlFor(category.image).width(400).height(250).url()}
                      alt={category.name}
                      className="object-cover w-full h-56 rounded-t-2xl"
                    />
                  )}

                  <CardContent className="flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-lg font-bold">{category.name}</h3>
                      {category.description && (
                        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                          {category.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <Link
                        href={
                          category.name.toLowerCase() === "beans"
                            ? "/coffees/beans"
                            : category.name.toLowerCase() === "ground"
                            ? "/coffees/ground"
                            : category.name.toLowerCase() === "capsules"
                            ? "/coffees/capsules"
                            : "/coffees"
                        }
                        className="text-sm font-semibold text-[#1b0f0c] dark:text-amber-200 hover:underline"
                      >
                        See Products →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}