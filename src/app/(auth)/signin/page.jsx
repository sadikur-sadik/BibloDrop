"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, Label, TextField, FieldError } from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { authClient } from '@/lib/auth-client';
import { Bounce, toast } from 'react-toastify';

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

          toast.success("Welcome back! Signed in successfully.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });

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
          const msg = ctx.error.message || "Invalid credentials. Please verify and try again.";
          setErrorMsg(msg);
          toast.error(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      });
    } catch (err) {
      setIsSubmitting(false);
      const errMsg = "A server or network error occurred. Please try again.";
      setErrorMsg(errMsg);
      toast.error(errMsg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  // Google Sign-in Trigger
  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: "/dashboard/reader/overview",
      }, {
        onRequest: () => {
          setIsSubmitting(true);
        },
        onSuccess: () => {
          setIsSubmitting(false);

          toast.success("Welcome back! Signed in successfully.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });

          router.push('/dashboard/reader/overview');
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          const msg = ctx.error.message || "Failed to initiate Google authentication.";
          setErrorMsg(msg);
          toast.error(msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      });
    } catch (err) {
      setIsSubmitting(false);
      const errMsg = "Failed to initiate Google authentication.";
      setErrorMsg(errMsg);
      toast.error(errMsg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] xl:min-h-[calc(100vh-6rem)] w-full flex items-center justify-center py-6 sm:py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white transition-colors duration-300 relative overflow-hidden select-none">

      {/* Background Visual Accents */}
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#856a26]/15 dark:bg-[#ffcd00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Centered Sign In Card Container */}
      <div className="w-full max-w-md sm:max-w-lg bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl dark:shadow-black/40 space-y-6 relative z-10 my-auto">

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-1 group">
            <svg
              className="h-8 w-8 text-[#856a26] dark:text-[#ffcd00] transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill="currentColor" fillOpacity="0.1" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" fill="currentColor" fillOpacity="0.1" />
              <path d="M12 6c0 0-1.2 1.8-1.2 3.2a1.2 1.2 0 1 0 2.4 0C13.2 7.8 12 6 12 6z" fill="currentColor" />
            </svg>
            <span className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-[#192230] dark:text-white">
              Biblio<span className="font-extrabold text-[#856a26] dark:text-[#ffcd00]">Drop</span>
            </span>
          </Link>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-[#192230] dark:text-white pt-1">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
            Sign in to manage your bookshelf and requests
          </p>
        </div>

        {/* Form */}
        <Form
          className="flex flex-col gap-4.5 w-full"
          onSubmit={handleSignInSubmit}
        >
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? "Invalid email address" : null}
            className="flex flex-col gap-1.5"
          >
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email Address</Label>
            <Input
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className="w-full border border-slate-200 dark:border-white/10 rounded-xl h-12 bg-slate-50/70 dark:bg-[#192230]/70 px-4 text-base sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#856a26]/20 dark:focus:ring-[#ffcd00]/20 focus:border-[#856a26] dark:focus:border-[#ffcd00] transition-all"
            />
            <FieldError className="text-xs sm:text-sm text-rose-500 font-medium mt-0.5" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type={showPassword ? "text" : "password"}
            className="flex flex-col gap-1.5"
          >
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Password</Label>
            <div className="relative flex items-center">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full border border-slate-200 dark:border-white/10 rounded-xl h-12 bg-slate-50/70 dark:bg-[#192230]/70 pl-4 pr-12 text-base sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#856a26]/20 dark:focus:ring-[#ffcd00]/20 focus:border-[#856a26] dark:focus:border-[#ffcd00] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 h-9 w-9 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none cursor-pointer rounded-lg hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeSlash className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <FieldError className="text-xs sm:text-sm text-rose-500 font-medium mt-0.5" />
          </TextField>

          {/* Remember Me and Forgot Password Utilities */}
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                name="rememberMe"
                className="rounded border-slate-300 text-[#856a26] focus:ring-[#856a26] dark:border-white/20 dark:bg-transparent dark:checked:bg-[#ffcd00] h-4.5 w-4.5 cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Remember me</span>
            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-[#856a26] dark:text-[#ffcd00] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {errorMsg && (
            <p className="text-sm text-rose-500 font-semibold text-center bg-rose-50 dark:bg-rose-950/40 p-3 rounded-xl border border-rose-200 dark:border-rose-900/60">{errorMsg}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 sm:h-13 bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] rounded-xl font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer disabled:opacity-50 mt-1"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>

          {/* Social Divider */}
          <div className="relative my-2.5 flex items-center justify-center">
            <span className="absolute px-3 bg-white dark:bg-[#2c2f38] text-xs font-bold uppercase tracking-wider text-slate-400">Or continue with</span>
            <div className="w-full border-t border-slate-200 dark:border-white/10" />
          </div>

          {/* Full-width Google OAuth Block */}
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full h-12 sm:h-13 border border-slate-200 dark:border-white/10 bg-slate-50/70 hover:bg-slate-100 dark:bg-[#192230]/40 dark:hover:bg-[#192230] text-[#192230] dark:text-white rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer shadow-xs"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          {/* Footer Signup Link */}
          <p className="text-center text-sm text-slate-600 dark:text-slate-300 font-medium pt-2">
            Don't have an account?{" "}
            <Link href="/signup" className="font-bold text-[#856a26] dark:text-[#ffcd00] hover:underline">
              Sign up
            </Link>
          </p>

          <div className="text-center pt-1">
            <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white inline-flex items-center gap-1.5 transition-colors">
              <span>←</span> Back to Home
            </Link>
          </div>
        </Form>

      </div>

    </div>
  );
};

export default SignIn;