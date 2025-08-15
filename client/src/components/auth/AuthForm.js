"use client";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaUniversity } from "react-icons/fa";
import InputField from "./InputField";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import useAxiosPublic from "@/hooks/useAxiosPublic.js";
import Swal from "sweetalert2";

export default function AuthForm({ type }) {
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    const savedPassword = localStorage.getItem("rememberPassword");
    if (savedEmail && savedPassword) {
      setValue("email", savedEmail);
      setValue("password", savedPassword);
      setRememberMe(true);
    }
  }, [setValue]);



  const onSubmit = async (data) => {
    if (rememberMe) {
      localStorage.setItem("rememberEmail", data.email);
      localStorage.setItem("rememberPassword", data.password);
    } else {
      localStorage.removeItem("rememberEmail");
      localStorage.removeItem("rememberPassword");
    }
    
    try {
      const endpoint =
        type === "login" ? "/api/user/login" : "/api/user/register";
      const res = await axiosPublic.post(endpoint, data);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title:
          type === "login"
            ? "Logged in successfully"
            : "Registered successfully",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });

      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("expiresIn", res.data.expiresIn);
      router.push(type === "login" ? "/dashboard/allExpenses" : "/");
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title:"Something went wrong. Try again please.",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      console.error(error);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md bg-white font-roboto shadow-xl p-10 rounded-2xl space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-[#008080] flex items-center justify-center gap-2">
        <FaUniversity />{" "}
        {type === "login" ? "Login First!" : "Registration here"}
      </h2>

      {type === "register" && (
        <InputField
          label="Full Name"
          type="text"
          placeholder="Enter Your Full Name"
          {...register("name", { required: "Name is required" })}
          error={errors.username && errors.username.message}
        />
      )}

      <InputField
        label="Email"
        placeholder="Enter you email"
        type="email"
        {...register("email", { required: "Email is required" })}
        error={errors.email && errors.email.message}
      />

      <div className="relative space-y-1">
        <InputField
          label="Password"
          placeholder="******"
          type={showPassword ? "text" : "password"}
          {...register("password", { required: "Password is required" })}
          error={errors.password && errors.password.message}
        />
        <button
          type="button"
          className="absolute right-3 top-[40px] text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4"
            />
            Remember Me
          </label>

          {type === "login" && (
            <a
              href="/forgot-password"
              className="text-[#008080] hover:underline text-sm"
            >
              Forgot Password?
            </a>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#008080] text-white hover:bg-[#006666] buttons font-semibold text-lg"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Please wait..."
          : type === "login"
          ? "Login"
          : "Register"}
      </button>

      <p className="text-center text-sm">
        {type === "login" ? (
          <>
            New here?{" "}
            <Link href="/register" className="text-[#008080] hover:underline">
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/" className="text-[#008080] hover:underline">
              Login
            </Link>
          </>
        )}
      </p>
    </motion.form>
  );
}
