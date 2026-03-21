"use client";

import { Carousel, CarouselItem, CarouselContent } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const dataCarouselTop = [
  {
    id: 1,
    title: "Delivery in 24 to 48 hours!",
    description: "Get your favorite coffee blends delivered straight to your door.",
    link: ""
  },
  {
    id: 2,
    title: "Get a 25% discount on purchases over $40.",
    description: "Use code ROJAX25 at checkout to enjoy your discount.",
    link: ""
  },
  {
    id: 3,
    title: "Free returns and deliveries.",
    description: "Enjoy free returns and deliveries on all orders.",
    link: ""
  },
  {
    id: 4,
    title: "Buy new items now!",
    description: "Explore our latest coffee blends and accessories in the shop.",
    link: ""
  },
];

const CarouselTextBanner = () => {
  return (
    <div className="py-8 bg-white dark:bg-black">
      <Carousel
        className="relative w-full max-w-4xl mx-auto"
        plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
      >
        <CarouselContent>
          {dataCarouselTop.map(({ id, title, description }) => (
            <CarouselItem
              key={id}
              className="flex flex-col items-center justify-center p-6 text-center cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
                {title}
              </h3>
              <p className="max-w-md mt-2 text-sm text-gray-700 sm:text-base dark:text-gray-300">
                {description}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CarouselTextBanner;
