"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, Label, TextField, FieldError } from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";

// Asset Import
import SideImage from "@/asset/books_2.jpg";
import { authClient } from '@/lib/auth-client';

const SignIn = () => {
  const router = useRouter();

  // Loading and Error state
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // Email and Password Login Form Submission
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const rememberMe = formData.get("rememberMe") === "on";

    try {
      await authClient.signIn.email({
        email,
        password,
        rememberMe,
      }, {
        onRequest: () => {
          setIsSubmitting(true);
        },
        onSuccess: (ctx) => {
          setIsSubmitting(false);
          
          // Role-based routing
          const userRole = ctx.data?.user?.role || 'reader';
          
          if (userRole === 'librarian') {
            router.push('/dashboard/librarian/overview'); 
          } else if (userRole === 'admin') {
            router.push('/dashboard/admin/overview');
          } else {
            router.push('/dashboard/reader/overview');
          }
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          setErrorMsg(ctx.error.message || "Invalid credentials. Please verify and try again.");
        }
      });
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg("A server or network error occurred. Please try again.");
    }
  };

  // Google Sign-in Trigger
  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: "/", 
      });
    } catch (err) {
      setErrorMsg("Failed to initiate Google authentication.");
    }
  };

  return (
    <div className="flex h-screen w-full overflow-y-auto lg:overflow-hidden bg-[#FFFFFF] text-[#192230] dark:bg-[#192230] dark:text-[#FFFFFF] transition-colors duration-300">

      {/* LEFT SIDEBAR: Static height, high contrast brand elements */}
      <div className="hidden lg:flex relative w-1/2 h-full overflow-hidden bg-[#192230]">
        <Image
          src={SideImage}
          alt="Library Backdrop"
          fill
          priority
          className="object-cover opacity-85 pointer-events-none"
        />
        {/* Dark brand gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-[#192230]/95 via-[#192230]/70 to-[#192230]/40 z-10" />

        {/* Editorial Brand Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-12 z-20">
          <div className="flex items-center gap-2">
            <svg
              className="h-7 w-7 text-[#ffcd00]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill="currentColor" fillOpacity="0.1" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" fill="currentColor" fillOpacity="0.1" />
              <path d="M12 6c0 0-1.2 1.8-1.2 3.2a1.2 1.2 0 1 0 2.4 0C13.2 7.8 12 6 12 6z" fill="currentColor" />
            </svg>
            <span className="font-serif text-2xl font-light tracking-wide text-white">
              Biblio<span className="font-extrabold text-[#ffcd00]">Drop</span>
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif text-3xl font-semibold leading-tight max-w-lg text-white">
              Your reading sanctuary awaits
            </h2>
            <p className="text-gray-300 text-xs max-w-md font-light leading-relaxed">
              Log back in to manage your active borrows, tracking requests, or coordinate library inventories in your collective workspace.
            </p>
            {/* Carousel indicator matching brand specs */}
            <div className="flex gap-2 pt-2">
              <span className="h-1 w-1.5 rounded-full bg-white/50" />
              <span className="h-1 w-6 rounded-full bg-[#ffcd00]" />
              <span className="h-1 w-1.5 rounded-full bg-white/50" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Form Area */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-8 sm:px-12 lg:w-1/2 h-full">
        <div className="w-full max-w-md flex flex-col justify-center h-full max-h-160 space-y-5">

          {/* Header Element */}
          <div className="space-y-1">
            <h1 className="text-2xl font-serif font-bold tracking-tight text-[#192230] dark:text-white">
              Welcome back
            </h1>
            <p className="text-xs text-[#3d474e] dark:text-gray-400 font-light">
              Sign in to manage your bookshelf and requests.
            </p>
          </div>

          {/* Form */}
          <Form
            className="flex flex-col gap-3.5 w-full"
            onSubmit={handleSignInSubmit}
          >
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? "Invalid email" : null}
            >
              <Label className="text-xs font-semibold text-[#192230] dark:text-gray-200">Email Address</Label>
              <Input
                placeholder="john@example.com"
                className="border border-gray-200 dark:border-[#2c2f38] rounded-md h-9 bg-transparent px-3 text-xs focus:outline-none focus:border-[#856a26] dark:focus:border-[#ffcd00]"
              />
              <FieldError className="text-[10px] text-red-500 mt-0.5" />
            </TextField>

            <TextField
              isRequired
              name="password"
              type={showPassword ? "text" : "password"}
            >
              <Label className="text-xs font-semibold text-[#192230] dark:text-gray-200">Password</Label>
              <div className="relative flex items-center">
                <Input
                  placeholder="••••••••"
                  className="w-full border border-gray-200 dark:border-[#2c2f38] rounded-md h-9 bg-transparent pl-3 pr-9 text-xs focus:outline-none focus:border-[#856a26] dark:focus:border-[#ffcd00]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                >
                  {showPassword ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <FieldError className="text-[10px] text-red-500 mt-0.5" />
            </TextField>

            {/* Remember Me and Forgot Password Utilities */}
            <div className="flex items-center justify-between mt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="rounded border-gray-200 text-[#856a26] focus:ring-[#856a26] dark:border-[#2c2f38] dark:bg-transparent dark:checked:bg-[#ffcd00] h-3.5 w-3.5"
                />
                <span className="text-[11px] text-[#3d474e] dark:text-gray-400 font-light">Remember me</span>
              </label>

              <Link 
                href="/forgot-password" 
                className="text-[11px] font-semibold text-[#856a26] dark:text-[#ffcd00] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {errorMsg && (
              <p className="text-[11px] text-red-500 text-center">{errorMsg}</p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-9 bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] rounded-md font-semibold text-xs transition-all duration-200 mt-1 disabled:opacity-50"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>

            {/* Social Divider */}
            <div className="relative my-1.5 flex items-center justify-center">
              <span className="absolute px-3 bg-[#FFFFFF] dark:bg-[#192230] text-[10px] text-gray-400">Or continue with</span>
              <div className="w-full border-t border-gray-100 dark:border-[#2c2f38]" />
            </div>

            {/* Full-width Google OAuth Block */}
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full h-9 border border-gray-200 dark:border-[#2c2f38] bg-transparent text-[#192230] dark:text-white rounded-md text-[11px] font-semibold hover:bg-gray-50 dark:hover:bg-[#2c2f38]/50 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                Continue with Google
              </Button>
            </div>

            <p className="text-center text-[11px] text-[#3d474e] dark:text-gray-400 mt-2">
              Don't have an account? <Link href="/signup" className="font-semibold text-[#856a26] dark:text-[#ffcd00] hover:underline">Sign up</Link>
            </p>
          </Form>

        </div>
      </div>

    </div>
  );
};

export default SignIn;