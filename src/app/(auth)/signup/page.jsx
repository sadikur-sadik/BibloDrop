"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, Label, TextField, FieldError } from "@heroui/react";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { authClient } from '@/lib/auth-client';
import { Bounce, toast } from 'react-toastify';

const SignUp = () => {
  const router = useRouter();

  // State variables for dynamic multi-step flow
  const [step, setStep] = useState(1); // Step 1: Account details, Step 2: Role selection, Step 3: Success Completed
  const [accountData, setAccountData] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null); // 'reader' or 'librarian'
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handling Step 1 Data Submission
  const handleAccountSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirmPassword")?.toString() || "";
    const photoUrl = formData.get("photoUrl")?.toString() || "";

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setAccountData({
      fullName,
      email,
      password,
      photoUrl
    });

    setStep(2);
  };

  // Handling Google Social Sign-In
  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard/reader/overview'
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
          const msg = ctx.error.message || "Failed to initialize Google sign-in. Please try again.";
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
      const errMsg = "Failed to initialize Google sign-in. Please try again.";
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

  // Handling Final Role Confirmation and Sign-Up Registration Submission
  const handleCompleteSignUp = async () => {
    if (!selectedRole) {
      setErrorMsg("Please select your platform role to complete sign up.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);
    try {
      const { data, error } = await authClient.signUp.email({
        email: accountData.email,
        password: accountData.password,
        name: accountData.fullName,
        image: accountData.photoUrl || undefined,
        role: selectedRole,
        status: selectedRole === 'librarian' ? 'pending' : "active"
      });

      if (error) {
        const errMsg = error.message || "An error occurred during registration. Please try again.";
        setErrorMsg(errMsg);
        setIsSubmitting(false);
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
        return;
      }

      setIsSubmitting(false);
      setStep(3);

      toast.success("Account created successfully!", {
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

      setTimeout(() => {
        router.push('/');
      }, 2500);

    } catch (err) {
      const errMsg = "A server or network error occurred. Please try again.";
      setErrorMsg(errMsg);
      setIsSubmitting(false);
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

      {/* Centered Sign Up Card Container */}
      <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl dark:shadow-black/40 space-y-6 relative z-10 my-auto">

        {/* Step Indicator Header Bar */}
        {step < 3 && (
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === 1 ? 'bg-[#856a26] text-white dark:bg-[#ffcd00] dark:text-[#192230]' : 'bg-emerald-500 text-white'}`}>
                {step > 1 ? '✓' : '1'}
              </span>
              <span className={`text-xs sm:text-sm font-semibold ${step === 1 ? 'text-[#192230] dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                Account Details
              </span>
            </div>
            <div className="h-0.5 flex-1 bg-slate-200 dark:bg-white/10 mx-2 rounded-full overflow-hidden">
              <div className={`h-full bg-[#856a26] dark:bg-[#ffcd00] transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`} />
            </div>
            <div className="flex items-center gap-2">
              <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === 2 ? 'bg-[#856a26] text-white dark:bg-[#ffcd00] dark:text-[#192230]' : 'bg-slate-100 dark:bg-[#192230] text-slate-400 dark:text-slate-500'}`}>
                2
              </span>
              <span className={`text-xs sm:text-sm font-semibold ${step === 2 ? 'text-[#192230] dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                Choose Role
              </span>
            </div>
          </div>
        )}

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

          {step === 1 && (
            <>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-[#192230] dark:text-white pt-1">
                Create Your Account
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
                Sign up to begin requesting and lending books
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-[#192230] dark:text-white pt-1">
                Choose Your Role
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
                Select your workspace role to finalize account creation
              </p>
            </>
          )}

          {step === 3 && (
            <div className="space-y-3 text-center flex flex-col items-center pt-4 pb-2">
              <div className="h-16 w-16 bg-[#856a26] text-white dark:bg-[#ffcd00] dark:text-[#192230] rounded-full flex items-center justify-center shadow-lg mb-2 animate-bounce">
                <Check className="h-8 w-8 stroke-3" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-[#192230] dark:text-white">
                Welcome Aboard!
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium max-w-sm leading-relaxed">
                Your account was created successfully. Redirecting you to the platform home page...
              </p>
            </div>
          )}
        </div>

        {/* STEP 1: Registration Entry */}
        {step === 1 && (
          <Form
            className="flex flex-col gap-4.5 w-full"
            onSubmit={handleAccountSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField isRequired name="fullName" type="text" className="flex flex-col gap-1.5">
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Full Name</Label>
                <Input
                  name="fullName"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full border border-slate-200 dark:border-white/10 rounded-xl h-12 bg-slate-50/70 dark:bg-[#192230]/70 px-4 text-base sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#856a26]/20 dark:focus:ring-[#ffcd00]/20 focus:border-[#856a26] dark:focus:border-[#ffcd00] transition-all"
                />
                <FieldError className="text-xs sm:text-sm text-rose-500 font-medium mt-0.5" />
              </TextField>

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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                isRequired
                name="password"
                type={showPassword ? "text" : "password"}
                validate={(value) => value.length < 8 ? "Must be 8+ characters" : null}
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

              <TextField
                isRequired
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="flex flex-col gap-1.5"
              >
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Confirm Password</Label>
                <div className="relative flex items-center">
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full border border-slate-200 dark:border-white/10 rounded-xl h-12 bg-slate-50/70 dark:bg-[#192230]/70 pl-4 pr-12 text-base sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#856a26]/20 dark:focus:ring-[#ffcd00]/20 focus:border-[#856a26] dark:focus:border-[#ffcd00] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 h-9 w-9 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none cursor-pointer rounded-lg hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeSlash className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <FieldError className="text-xs sm:text-sm text-rose-500 font-medium mt-0.5" />
              </TextField>
            </div>

            <TextField name="photoUrl" type="url" className="flex flex-col gap-1.5">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Photo URL <span className="text-xs font-normal text-slate-400">(Optional)</span></Label>
              <Input
                name="photoUrl"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="w-full border border-slate-200 dark:border-white/10 rounded-xl h-12 bg-slate-50/70 dark:bg-[#192230]/70 px-4 text-base sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#856a26]/20 dark:focus:ring-[#ffcd00]/20 focus:border-[#856a26] dark:focus:border-[#ffcd00] transition-all"
              />
              <FieldError className="text-xs sm:text-sm text-rose-500 font-medium mt-0.5" />
            </TextField>

            {errorMsg && (
              <p className="text-sm text-rose-500 font-semibold text-center bg-rose-50 dark:bg-rose-950/40 p-3 rounded-xl border border-rose-200 dark:border-rose-900/60">{errorMsg}</p>
            )}

            <Button
              type="submit"
              className="w-full h-12 sm:h-13 bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] rounded-xl font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer mt-1"
            >
              Continue
            </Button>

            {/* Social Divider */}
            <div className="relative my-2.5 flex items-center justify-center">
              <span className="absolute px-3 bg-white dark:bg-[#2c2f38] text-xs font-bold uppercase tracking-wider text-slate-400">Or continue with</span>
              <div className="w-full border-t border-slate-200 dark:border-white/10" />
            </div>

            <div className="flex flex-col gap-2.5">
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

              <p className="text-xs text-center text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
                Note: Registering with Google assigns the Reader role by default.
              </p>
            </div>

            <p className="text-center text-sm text-slate-600 dark:text-slate-300 font-medium pt-2">
              Already have an account?{" "}
              <Link href="/signin" className="font-bold text-[#856a26] dark:text-[#ffcd00] hover:underline">
                Log in
              </Link>
            </p>

            <div className="text-center pt-1">
              <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white inline-flex items-center gap-1.5 transition-colors">
                <span>←</span> Back to Home
              </Link>
            </div>
          </Form>
        )}

        {/* STEP 2: Role Selection */}
        {step === 2 && (
          <div className="w-full space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Role Block: Reader */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setSelectedRole('reader')}
                className={`p-6 rounded-2xl border-2 flex flex-col items-start text-left gap-4 transition-all duration-200 cursor-pointer relative ${selectedRole === 'reader'
                  ? 'border-[#856a26] bg-[#856a26]/10 dark:border-[#ffcd00] dark:bg-[#ffcd00]/10 shadow-lg ring-2 ring-[#856a26]/20 dark:ring-[#ffcd00]/20'
                  : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50/50 dark:hover:bg-white/5'
                  }`}
              >
                {selectedRole === 'reader' && (
                  <span className="absolute top-4 right-4 h-6 w-6 rounded-full bg-[#856a26] text-white dark:bg-[#ffcd00] dark:text-[#192230] flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                )}
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-2xl ${selectedRole === 'reader' ? 'bg-[#856a26] text-white dark:bg-[#ffcd00] dark:text-[#192230]' : 'bg-slate-100 dark:bg-[#192230] text-slate-500 dark:text-white'}`}>
                  📖
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[#192230] dark:text-white">Reader</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">Search libraries, request books, and manage lending structures.</p>
                </div>
              </button>

              {/* Role Block: Librarian */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setSelectedRole('librarian')}
                className={`p-6 rounded-2xl border-2 flex flex-col items-start text-left gap-4 transition-all duration-200 cursor-pointer relative ${selectedRole === 'librarian'
                  ? 'border-[#856a26] bg-[#856a26]/10 dark:border-[#ffcd00] dark:bg-[#ffcd00]/10 shadow-lg ring-2 ring-[#856a26]/20 dark:ring-[#ffcd00]/20'
                  : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50/50 dark:hover:bg-white/5'
                  }`}
              >
                {selectedRole === 'librarian' && (
                  <span className="absolute top-4 right-4 h-6 w-6 rounded-full bg-[#856a26] text-white dark:bg-[#ffcd00] dark:text-[#192230] flex items-center justify-center text-xs font-bold">
                    ✓
                  </span>
                )}
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-2xl ${selectedRole === 'librarian' ? 'bg-[#856a26] text-white dark:bg-[#ffcd00] dark:text-[#192230]' : 'bg-slate-100 dark:bg-[#192230] text-slate-500 dark:text-white'}`}>
                  🏛️
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[#192230] dark:text-white">Librarian</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">Manage catalog inventory parameters and track active borrows.</p>
                </div>
              </button>

            </div>

            {selectedRole === 'librarian' && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl text-xs sm:text-sm text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                <strong>Notice:</strong> Your Librarian status will start as <strong>Pending</strong>. Access is granted once verified by administration.
              </div>
            )}

            {errorMsg && (
              <p className="text-sm text-rose-500 font-semibold text-center bg-rose-50 dark:bg-rose-950/40 p-3 rounded-xl border border-rose-200 dark:border-rose-900/60">{errorMsg}</p>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  setStep(1);
                  setErrorMsg("");
                }}
                className="w-1/3 h-12 sm:h-13 border border-slate-200 dark:border-white/10 bg-transparent text-[#192230] dark:text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-slate-100 dark:hover:bg-[#192230] transition-colors cursor-pointer disabled:opacity-50"
              >
                Back
              </Button>

              <Button
                type="button"
                onClick={handleCompleteSignUp}
                disabled={!selectedRole || isSubmitting}
                className="w-2/3 h-12 sm:h-13 bg-[#192230] hover:bg-[#2c2f38] text-white dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-sm sm:text-base transition-all duration-200 shadow-md cursor-pointer"
              >
                {isSubmitting ? "Creating account..." : "Complete Sign Up"}
              </Button>
            </div>

            <div className="text-center pt-2">
              <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white inline-flex items-center gap-1.5 transition-colors">
                <span>←</span> Back to Home
              </Link>
            </div>

          </div>
        )}

        {/* STEP 3: Animated redirection placeholder */}
        {step === 3 && (
          <div className="w-full flex justify-center py-4">
            <div className="animate-pulse text-center text-sm text-slate-500 dark:text-slate-400 font-medium">
              Syncing profile details with database...
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default SignUp;