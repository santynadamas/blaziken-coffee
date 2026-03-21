const BannerProducts = () => {
  return (
    <section>
      <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] bg-[url('/slider-image.png')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-4xl px-4 text-center text-white">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl">
            Immerse yourself in a unique experience!
          </p>

          <h4 className="mt-2 text-3xl font-extrabold leading-tight uppercase sm:text-4xl md:text-5xl lg:text-6xl">
            ExquisiteCoffee
          </h4>

          <p className="my-2 text-sm text-gray-200 sm:text-base md:text-lg lg:text-xl">
            Awaken all your senses with every sip
          </p>
        </div>
      </div>
    </section>
  );
};

export default BannerProducts;