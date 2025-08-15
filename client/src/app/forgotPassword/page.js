"use client";
import Image from "next/image";
import img from "../../assets/desktop.png";
import reset from "../../assets/reset.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const router = useRouter();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axiosPublic.post("/api/forgot-password", {
        email: data.email,
      });
      const resetLink = response?.data?.resetURL;

      if (resetLink) {
        router.push(resetLink);
      } else {
        setMessage(
          "If this email is registered, you will receive a password reset link shortly."
        );
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      <div className="relative w-full h-[174px]">
        <Image src={img} alt="image" fill priority className="object-cover" />
      </div>
      <div className="absolute top-[90px] left-[60px] w-11/12 mx-auto flex flex-col justify-center items-center drop-shadow-lg bg-white p-14 rounded-[15px]">
        <div className="w-4/5 mx-auto flex flex-col space-y-5">
          <div className="relative h-[96.75px] w-[96.75px] mx-auto">
            <Image
              src={reset}
              alt="reset"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="text-center space-y-1">
            <h1 className="poppins text-[40px] font-semibold text-[#1F1F1F]">
              Give email here
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <div>
                  <label className="poppins text-base font-semibold text-[#1F1F1F]">
                    Email Address
                  </label>
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="m32220@gmail.com"
                    {...register("email", { required: "Email is required" })}
                    className="w-full border border-gray-300 px-[20px] shadow-md py-[13px] rounded-[5px]"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 w-full">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 text-center py-2 sm:py-3 bg-[#008080] text-white hover:bg-[#006666] font-semibold text-xs sm:text-sm md:text-base lg:text-lg rounded-md transition-all duration-200"
                >
                  {loading ? "Resetting Password..." : "Reset Password"}
                </button>

                <Link
                  href={"/"}
                  className="flex-1 text-center py-2 sm:py-3 bg-white text-[#006666] hover:text-white border-[2px] border-[#006666] hover:border-transparent hover:bg-[#006666] font-semibold text-xs sm:text-sm md:text-base lg:text-lg rounded-md transition-all duration-200"
                >
                  Back
                </Link>
              </div>

              {message.length > 0 && <h1 className="text-center">{message}</h1>}
            </form>
          </div>
        </div>
      </div>
      <div className="h-[400px]" />
    </div>
  );
};

export default ForgotPassword;
