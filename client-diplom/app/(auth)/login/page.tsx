"use client";

import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="absolute inset-0 flex flex-col">
          <div className="h-2/5 bg-blue-300"></div>
        </div>
        <div className="relative flex justify-center items-center min-h-screen z-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
