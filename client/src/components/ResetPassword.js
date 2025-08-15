"use client";
import Image from "next/image";
import img from "../assets/desktop.png";
import reset from "../assets/reset.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axiosPublic.post("/api/reset-password", {
        token,
        newPassword: data.password,
      });
      const message = response.data.message || "Password reset successful!";

      Swal.fire({
        title: "Success",
        text: message,
        icon: "success",
        showConfirmButton: false,
        timer: 2000, // 2 seconds
        timerProgressBar: true,
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg font-semibold">
          Invalid or missing reset token.
        </p>
      </div>
    );
  }

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
              Reset your Password
            </h1>
            <p className="jakarta text-base font-medium text-[#667085]">
              Strong passwords include numbers, letters, and punctuation marks.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Password */}
            <div className="space-y-2">
              <label className="poppins text-base font-semibold text-[#1F1F1F]">
                Enter New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="***********"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full border border-gray-300 px-[20px] shadow-md py-[13px] rounded-[5px]"
                />
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="poppins text-base font-semibold text-[#1F1F1F]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Retype password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="w-full border border-gray-300 px-[20px] shadow-md py-[13px] rounded-[5px]"
                />
                <div
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#60E5AE] jakarta cursor-pointer text-[#1F1F1F] font-semibold text-lg transition-colors duration-300 py-[15px] rounded-[8px]"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>

            {/* Message */}
            {message && <h1 className="text-center text-sm">{message}</h1>}
          </form>
        </div>
      </div>

      <div className="h-[400px]" />
    </div>
  );
};

export default ResetPassword;
