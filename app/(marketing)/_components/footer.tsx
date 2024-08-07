import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Copyright } from "lucide-react";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 z-50  bg-slate-100 ">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between  ">
        <Logo />
        <div className=" hidden md:flex ml-12 md:w-auto  items-center justify-between w-full  ">
          <Copyright className="h-4 w-4" />
          <Button variant="ghost" size="sm">
            2024 Pham Yen. All rights reserved.
          </Button>
        </div>
        <div className="md:block md:w-auto flex items-center justify-between w-full  ">
          <Button variant="ghost" size="sm">
            Private Policy
          </Button>
          <Button variant="ghost" size="sm">
            Teams of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
