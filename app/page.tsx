import BannerDiscount from "@/components/banner-discount";
import BannerProducts from "@/components/banner-products";
import CarouselTextBanner from "@/components/carousel-text-banner";
import ChooseCategories from "@/components/chooseCategories";
import FeaturedProducts from "@/components/featured-products";

export default function Home() {
  return (
    <div>
      <CarouselTextBanner />
      <ChooseCategories />
      <BannerDiscount />
      <FeaturedProducts />
      <BannerProducts />
    </div>
  );
}