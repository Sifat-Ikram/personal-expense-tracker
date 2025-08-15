"use client";
import Image from "next/image";
import img from "../assets/desktop.png";
import error from "../assets/error.png";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full relative min-h-screen bg-gray-50">
      <div className="relative w-full h-[120px] sm:h-[150px] md:h-[174px]">
        <Image src={img} alt="image" fill priority className="object-cover" />
      </div>

      <div className="absolute top-[60px] sm:top-[80px] md:top-[90px] left-1/2 -translate-x-1/2 w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto flex flex-col justify-center items-center drop-shadow-lg bg-white p-6 sm:p-8 md:p-10 lg:p-14 rounded-lg sm:rounded-xl md:rounded-[15px]">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl flex flex-col space-y-10 sm:space-y-14 md:space-y-16 lg:space-y-20">
          <div className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[520px]">
            <Image
              src={error}
              alt="error"
              fill
              priority
              className="object-contain"
            />
          </div>

          <Link
            href="/"
            className="w-full text-center py-2 sm:py-3 bg-[#008080] text-white hover:bg-[#006666] font-semibold text-base sm:text-lg rounded-md transition-all duration-200"
          >
            Back To Home
          </Link>
        </div>
      </div>

      <div className="h-[200px] sm:h-[300px] md:h-[400px]" />
    </div>
  );
};

export default NotFound;
