"use client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return path === pathname
      ? "flex items-center gap-1 font-semibold text-[17px] text-[#00AAFF] leading-[22px]"
      : "flex items-center gap-1 font-semibold text-[17px] text-[#3D474D] leading-[22px] hover:text-[#00AAFF]";
  };

  return (
    <div className="fixed top-0 w-full h-20 px-4 z-50 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between  ">
        <Logo />
        <ul className="hidden lg:flex gap-8 xl:gap-16">
          <li>
            <Link href="/product" className={isActive("/product")}>
              <p>Product</p>
              <ChevronDown className="h-4 w-4" />
            </Link>
          </li>
          <li>
            <Link href="/solutions" className={isActive("/solutions")}>
              Solutions
              <ChevronDown className="h-4 w-4" />
            </Link>
          </li>
          <li>
            <Link href="/pricing" className={isActive("/pricing")}>
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/contact-sales" className={isActive("/contact-sales")}>
              Contact Sales
            </Link>
          </li>
        </ul>
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full  ">
          <Button size="sm" variant="textBlue" asChild>
            <Link href="/sign-in">Log In</Link>
          </Button>
          <Button variant="bgBlue" asChild>
            <Link href="/sign-up">
              Sign Up <ArrowRight className="ml-2" />{" "}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
