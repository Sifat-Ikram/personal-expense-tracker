"use client";
import Image from "next/image";
import img from "../../assets/desktop.png";
import reset from "../../assets/reset.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useRouter } from "next/navigation";

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
      console.log(resetLink);

      if (resetLink) {
        // Redirect to reset password page
        router.push(resetLink);
      } else {
        // No resetURL found, show success message anyway
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#60E5AE] jakarta cursor-pointer text-[#1F1F1F] font-semibold text-lg transition-colors duration-300 py-[15px] rounded-[8px]"
              >
                {loading ? "Resetting Password..." : "Reset Password"}
              </button>
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
