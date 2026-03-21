import Link from "next/link";
import Image from "next/image";
import { Separator } from "./ui/separator";
import blazikenImg from "@/public/blaziken-coffee.jpg";

const dataFooter = [
  { id: 1, name: "About Us", link: "/about/blazikencoffee" },
  { id: 2, name: "Products", link: "/#featured-products" },
  { id: 3, name: "My Account", link: "/profile" },
  { id: 4, name: "Policy & Privacy", link: "/policy" },
];

const Footer = () => {
  return (
    <footer className="bg-[#F8F4E3] dark:bg-gray-900">
      <div className="w-full max-w-screen-xl px-4 py-8 mx-auto">
        
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src={blazikenImg}
                alt="Blaziken Coffee Logo"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <p className="text-xl font-bold dark:text-white">
              BlazikenCoffee
            </p>
          </div>

          <ul className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-500 sm:justify-end sm:gap-6 dark:text-gray-400">
            {dataFooter.map((data) => (
              <li key={data.id}>
                <Link href={data.link} className="hover:underline">
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="my-6" />

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          &copy; 2026{" "}
          <Link href="#" className="hover:underline">
            Blaziken_Poke
          </Link>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;