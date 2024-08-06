import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-20 px-4 z-50 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between  ">
        <Logo />
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
