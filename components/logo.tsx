import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex cursor-pointer">
        <Image
          src={
            "https://cdn6.mindmeister.com/assets/meisterlabs/products/mindmeister/logo-6c3670e1d72ddef5ef08c9348cafb0ff4f58e535dda501194f6bdf879a8b3089.svg"
          }
          width={110}
          height={110}
          alt="Mind meister logo"
        />
      </div>
    </Link>
  );
};
