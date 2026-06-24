"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, Label, TextField, FieldError } from "@heroui/react";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";

// Asset Import
import SideImage from "@/asset/books.jpg";
import { authClient } from '@/lib/auth-client';

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
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/'
      });
    } catch (err) {
      setErrorMsg("Failed to initialize Google sign-in. Please try again.");
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
        setErrorMsg(error.message || "An error occurred during registration. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setStep(3);

      setTimeout(() => {
        router.push('/');
      }, 2500);

    } catch (err) {
      setErrorMsg("A server or network error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-y-auto lg:overflow-hidden bg-[#FFFFFF] text-[#192230] dark:bg-[#192230] dark:text-[#FFFFFF] transition-colors duration-300">

      {/* LEFT SIDEBAR: Static height, high contrast brand elements */}
      <div className="hidden lg:flex relative w-1/2 h-full overflow-hidden bg-[#192230]">
        <Image
          src={SideImage}
          alt="Books & Library Backdrop"
          fill
          priority
          className="object-cover opacity-80 pointer-events-none"
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
              Unlock a world of collective wisdom
            </h2>
            <p className="text-gray-300 text-xs max-w-md font-light leading-relaxed">
              Connect with local libraries and book owners. Doorstep deliveries, organized catalog trackers, and shared physical copies.
            </p>
            {/* Carousel indicator matching brand specs */}
            <div className="flex gap-2 pt-2">
              <span className="h-1 w-6 rounded-full bg-[#ffcd00]" />
              <span className="h-1 w-1.5 rounded-full bg-white/50" />
              <span className="h-1 w-1.5 rounded-full bg-white/50" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Form Area styled to avoid overflow scrolling on large displays */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-8 sm:px-12 lg:w-1/2 h-full">
        <div className="w-full max-w-md flex flex-col justify-center h-full max-h-160 space-y-5">

          {/* Header element based on current step */}
          <div className="space-y-1">
            {step === 1 && (
              <>
                <h1 className="text-2xl font-serif font-bold tracking-tight text-[#192230] dark:text-white">
                  Create your account
                </h1>
                <p className="text-xs text-[#3d474e] dark:text-gray-400 font-light">
                  Sign up to begin requesting and lending books.
                </p>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="text-2xl font-serif font-bold tracking-tight text-[#192230] dark:text-white">
                  Choose your role
                </h1>
                <p className="text-xs text-[#3d474e] dark:text-gray-400 font-light">
                  Please select your workspace role to finalize account creation.
                </p>
              </>
            )}

            {step === 3 && (
              <div className="space-y-2 text-center flex flex-col items-center pt-4">
                <div className="h-14 w-14 bg-[#856a26] text-white dark:bg-[#ffcd00] dark:text-[#192230] rounded-full flex items-center justify-center shadow-md mb-2 animate-bounce">
                  <Check className="h-6 w-6 stroke-3" />
                </div>
                <h1 className="text-2xl font-serif font-bold tracking-tight text-[#192230] dark:text-white">
                  Welcome Aboard!
                </h1>
                <p className="text-xs text-[#3d474e] dark:text-gray-400 font-light max-w-xs leading-relaxed">
                  Your account was created successfully. Redirecting you to the platform home page...
                </p>
              </div>
            )}
          </div>

          {/* STEP 1: Main registration entry (Height optimized) */}
          {step === 1 && (
            <Form
              className="flex flex-col gap-3 w-full"
              onSubmit={handleAccountSubmit}
            >
              <div className="grid grid-cols-2 gap-3">
                <TextField isRequired name="fullName" type="text">
                  <Label className="text-xs font-semibold text-[#192230] dark:text-gray-200">Full Name</Label>
                  <Input
                    placeholder="John Doe"
                    className="border border-gray-200 dark:border-[#2c2f38] rounded-md h-9 bg-transparent px-3 text-xs focus:outline-none focus:border-[#856a26] dark:focus:border-[#ffcd00]"
                  />
                  <FieldError className="text-[10px] text-red-500 mt-0.5" />
                </TextField>

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
              </div>

              <div className="grid grid-cols-2 gap-3">
                <TextField
                  isRequired
                  name="password"
                  type={showPassword ? "text" : "password"}
                  validate={(value) => value.length < 8 ? "Must be 8+ chars" : null}
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

                <TextField 
                  isRequired 
                  name="confirmPassword" 
                  type={showConfirmPassword ? "text" : "password"}
                >
                  <Label className="text-xs font-semibold text-[#192230] dark:text-gray-200">Confirm Password</Label>
                  <div className="relative flex items-center">
                    <Input
                      placeholder="••••••••"
                      className="w-full border border-gray-200 dark:border-[#2c2f38] rounded-md h-9 bg-transparent pl-3 pr-9 text-xs focus:outline-none focus:border-[#856a26] dark:focus:border-[#ffcd00]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <FieldError className="text-[10px] text-red-500 mt-0.5" />
                </TextField>
              </div>

              <TextField name="photoUrl" type="url">
                <Label className="text-xs font-semibold text-[#192230] dark:text-gray-200">Photo URL (Optional)</Label>
                <Input
                  placeholder="https://example.com/photo.jpg"
                  className="border border-gray-200 dark:border-[#2c2f38] rounded-md h-9 bg-transparent px-3 text-xs focus:outline-none focus:border-[#856a26] dark:focus:border-[#ffcd00]"
                />
                <FieldError className="text-[10px] text-red-500 mt-0.5" />
              </TextField>

              {errorMsg && (
                <p className="text-[11px] text-red-500 text-center">{errorMsg}</p>
              )}

              <Button
                type="submit"
                className="w-full h-9 bg-[#192230] text-white hover:bg-[#2c2f38] dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] rounded-md font-semibold text-xs transition-all duration-200 mt-1"
              >
                Continue
              </Button>

              {/* Social authentication elements */}
              <div className="relative my-1.5 flex items-center justify-center">
                <span className="absolute px-3 bg-[#FFFFFF] dark:bg-[#192230] text-[10px] text-gray-400">Or continue with</span>
                <div className="w-full border-t border-gray-100 dark:border-[#2c2f38]" />
              </div>

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
                  Google
                </Button>
                
                {/* Note indicating default role registration */}
                <p className="text-[10px] text-center text-gray-400 dark:text-gray-500 leading-normal">
                  Note: If you sign up with Google, you will be registered as a reader only.
                </p>
              </div>

              <p className="text-center text-[11px] text-[#3d474e] dark:text-gray-400 mt-2">
                Already have an account? <Link href="/signin" className="font-semibold text-[#856a26] dark:text-[#ffcd00] hover:underline">Log in</Link>
              </p>
            </Form>
          )}

          {/* STEP 2: Role Selection (Adaptive & color consistent) */}
          {step === 2 && (
            <div className="w-full space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

                {/* Role Block: Reader */}
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setSelectedRole('reader')}
                  className={`p-4 border rounded-xl flex flex-col items-start text-left gap-2.5 transition-all duration-200 ${selectedRole === 'reader'
                      ? 'border-[#856a26] bg-[#856a26]/5 dark:border-[#ffcd00] dark:bg-[#ffcd00]/5 ring-2 ring-[#856a26] dark:ring-[#ffcd00]'
                      : 'border-gray-200 hover:border-gray-300 dark:border-[#2c2f38] dark:hover:border-[#3d474e]'
                    }`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs ${selectedRole === 'reader' ? 'bg-[#856a26] text-white dark:bg-[#ffcd00] dark:text-[#192230]' : 'bg-gray-100 dark:bg-[#2c2f38] text-gray-400 dark:text-white'}`}>
                    📖
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-[#192230] dark:text-white">Reader</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">Search libraries, request books, and manage lending structures.</p>
                  </div>
                </button>

                {/* Role Block: Librarian */}
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setSelectedRole('librarian')}
                  className={`p-4 border rounded-xl flex flex-col items-start text-left gap-2.5 transition-all duration-200 ${selectedRole === 'librarian'
                      ? 'border-[#856a26] bg-[#856a26]/5 dark:border-[#ffcd00] dark:bg-[#ffcd00]/5 ring-2 ring-[#856a26] dark:ring-[#ffcd00]'
                      : 'border-gray-200 hover:border-gray-300 dark:border-[#2c2f38] dark:hover:border-[#3d474e]'
                    }`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs ${selectedRole === 'librarian' ? 'bg-[#856a26] text-white dark:bg-[#ffcd00] dark:text-[#192230]' : 'bg-gray-100 dark:bg-[#2c2f38] text-gray-400 dark:text-white'}`}>
                    🏛️
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-[#192230] dark:text-white">Librarian</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">Manage catalog inventory parameters and track active borrows.</p>
                  </div>
                </button>

              </div>

              {selectedRole === 'librarian' && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-[10px] text-yellow-600 dark:text-yellow-400 leading-normal">
                  <strong>Notice:</strong> Your Librarian status will start as <strong>Pending</strong>. Access is granted once verified by administration.
                </div>
              )}

              {errorMsg && (
                <p className="text-[11px] text-red-500 text-center">{errorMsg}</p>
              )}

              <div className="flex gap-3 pt-1">
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    setStep(1);
                    setErrorMsg("");
                  }}
                  className="w-1/3 h-9 border border-gray-200 dark:border-[#2c2f38] bg-transparent text-[#192230] dark:text-white rounded-md text-xs font-semibold hover:bg-gray-50 dark:hover:bg-[#2c2f38]/50 transition-colors disabled:opacity-50"
                >
                  Back
                </Button>

                <Button
                  type="button"
                  onClick={handleCompleteSignUp}
                  disabled={!selectedRole || isSubmitting}
                  className="w-2/3 h-9 bg-[#192230] hover:bg-[#2c2f38] text-white dark:bg-[#ffcd00] dark:text-[#192230] dark:hover:bg-[#ffe066] disabled:opacity-50 disabled:cursor-not-allowed rounded-md font-semibold text-xs transition-all duration-200"
                >
                  {isSubmitting ? "Creating account..." : "Complete Sign Up"}
                </Button>
              </div>

            </div>
          )}

          {/* STEP 3: Animated redirection placeholder */}
          {step === 3 && (
            <div className="w-full flex justify-center py-2">
              <div className="animate-pulse text-center text-[11px] text-gray-400 font-light">
                Syncing profiles with database parameters...
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default SignUp;