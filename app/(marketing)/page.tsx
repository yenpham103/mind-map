import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className="pt-28 flex items-center justify-center relative flex-col h-[760px] p-0 ">
      <div className="background"></div>
      <div
        className={cn(
          "flex items-center justify-center flex-col relative z-10 -translate-y-6 md:-translate-y-14",
          headingFont.className
        )}
      >
        <div className="mb-6 flex items-center border shadow-sm p-4 bg-[#ff0073] text-white rounded-full uppercase ">
          <Lightbulb className="h-6 w-6 mr-2" />
          <span className="mt-1">It all starts with an idea.</span>
        </div>
        <h1 className="text-2xl md:text-6xl text-center text-[#3D474D] mb-10 leading-4">
          <p className="flex flex-col gap-3 items-center justify-center dark:text-slate-100">
            <span>Collaborative</span>
            <span>Mind Mapping</span>
          </p>
        </h1>
        <div className="bg-white p-8 rounded-full mt-4 z-10">
          <div className="flex leading-[48px] h-[48px] md:leading-[60px] md:h-[60px] items-center gap-2.5 text-xl md:text-3xl bg-[#00AAFF] text-white text-center px-6 md:px-10 p-2 shadow-custom-blue rounded-full w-fit cursor-no-drop ">
            <div className="bg-white w-8 h-8 rounded-full p-[6px] ">
              <Image
                src={
                  "https://cdn5.mindmeister.com/assets/meisterlabs/services/gapps-e488a784777dabf6d5ce0024c56bc927941d9cf007ffebe4d8aef9004f602952.svg"
                }
                width={20}
                height={20}
                alt="Mind meister logo"
              />
            </div>
            Mind meister Flow
          </div>
        </div>
      </div>
      <Button
        className="mt-1 md:mt-6 z-10 bg-slate-700 text-neutral-100 hover:bg-slate-600"
        size="lg"
        asChild
      >
        <Link href="/sign-up">Get Mind Meister for free</Link>
      </Button>
      <div className="flex gap-1 items-center justify-center text-yellow-400 mt-4">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
      <div
        className={cn(
          "flex flex-col items-center justify-center mt-2 text-neutral-400 z-10 dark:text-slate-100",
          textFont.className
        )}
      >
        <span>
          Trusted by <b>37 million</b>
        </span>
        <span>happy users worldwide</span>
      </div>
    </div>
  );
};

export default MarketingPage;
