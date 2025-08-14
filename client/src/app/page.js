import AuthForm from "@/components/auth/AuthForm";
import Head from "next/head";
import Image from "next/image";
import login from "@/assets/login.jpeg";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side - Image/Branding */}
        <div className="hidden relative md:flex md:w-1/2 text-white flex-col items-center justify-center p-10">
          <Image
            src={login}
            alt="login"
            fill
            priority
            className="h-full w-full"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full max-md:min-h-screen md:w-1/2 flex items-center justify-center bg-gray-50  px-2 sm:px-5 md:py-16 md:px-8">
          <AuthForm type="login" />
        </div>
      </div>
    </>
  );
}
