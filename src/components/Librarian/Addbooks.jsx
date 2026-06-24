'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  TextArea,
  Select,
  ListBox,
} from "@heroui/react";
import { Check, TriangleExclamation, ArrowUp, Xmark } from "@gravity-ui/icons";
import { PostingBooks } from "@/lib/action/action";
import { authClient } from "@/lib/auth-client";
import { Bounce, toast } from "react-toastify";

// List of common book genres including Fiction, Non-Fiction, and Religious categories
const GENRES = [
  { id: "fiction", name: "Fiction" },
  { id: "non-fiction", name: "Non-Fiction" },
  { id: "sci-fi", name: "Science Fiction" },
  { id: "fantasy", name: "Fantasy" },
  { id: "mystery-thriller", name: "Mystery & Thriller" },
  { id: "biography-memoir", name: "Biography & Memoir" },
  { id: "history", name: "History" },
  { id: "religion-spirituality", name: "Religion & Spirituality" },
  { id: "science-tech", name: "Science & Technology" },
  { id: "self-help", name: "Self-Help" },
  { id: "business-finance", name: "Business & Finance" },
  { id: "poetry", name: "Poetry" },
  { id: "classics", name: "Classics" },
];

const AddBook = () => {
  const { data: session } = authClient.useSession();

  const librarianStatus = session?.user?.role == "librarian" ? session?.user?.status : "";

  // State Management
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [coverUrl, setCoverUrl] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Image Upload handler utilizing ImgBB API
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(10);
    setUploadError("");

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 85) {
          clearInterval(progressInterval);
          return 85;
        }
        return prev + 10;
      });
    }, 150);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;

      if (!apiKey) {
        throw new Error(
          "ImgBB API Key is missing. Define NEXT_PUBLIC_IMGBB_KEY or IMGBB_KEY in your env file."
        );
      }

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Unable to connect or upload to ImgBB API.");
      }

      const result = await response.json();

      if (result?.success && result?.data?.url) {
        setCoverUrl(result.data.url);
        setUploadProgress(100);
      } else {
        throw new Error(result?.error?.message || "Upload failed.");
      }
    } catch (err) {
      setUploadError(err.message || "An error occurred during file upload.");
      setUploadProgress(0);
    } finally {
      clearInterval(progressInterval);
      setIsUploading(false);
    }
  };

  const resetCoverImage = () => {
    setCoverUrl("");
    setUploadProgress(0);
    setUploadError("");
  };

  // Form submit handler with custom API placement area
const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    setIsSubmitting(true);

    // Convert FormData to raw object
    const rawData = Object.fromEntries(new FormData(formElement));

    // Convert key numeric values to actual numbers before payload submission
    const data = {
      ...rawData,
      quantity: rawData?.quantity ? Number(rawData.quantity) : 0,
      deliveryFee: rawData?.deliveryFee ? Number(rawData.deliveryFee) : 0,
      coverImage: coverUrl,
      librarianEmail: session?.user?.email,
      librarianId: session?.user?.id
    };

    try {
      // Send data to backend
      const res = await PostingBooks(data);
      if (res?.insertedId) {
        toast.success(`"${data.title || 'Book'}" has been submitted successfully!`, {
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
        
        // Reset form and cover image only on successful post
        formElement.reset();
        resetCoverImage();
      } else {
        toast.error("Failed to submit the book. Please try again.", {
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
    } catch (error) {
      console.error("Error occurred while posting form:", error);
      toast.error("An error occurred while posting the form.", {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    /* 
      1. Matched with Inventory's outer container class 
         to align positioning, padding, and spacing.
    */
    <div className="relative w-full bg-transparent text-[#192230] dark:text-white transition-colors duration-300 space-y-6">

      {/* HEADER SECTION (Spans full width, matching Inventory's alignment) */}
      <div className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8">
        <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }} className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
          Grow Your <span className="text-[#856a26] dark:text-[#ffcd00]">Library</span>
        </motion.h1>
        <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }} className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Enter the details of the books you want to track or read next.
        </motion.p>
      </div>

      {/* 
        2. Wrapped form content inside a max-width container 
           so the form stays neat and does not stretch excessively on desktop.
      */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {/* 1. PENDING LIBRARIAN SCREEN */}
          {librarianStatus === "pending" ? (
            <motion.div
              key="pending-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative max-w-xl mx-auto p-8 rounded-3xl border border-slate-200/50 dark:border-gray-800/50 bg-white/60 dark:bg-[#192230]/40 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-amber-500/10 dark:bg-[#ffcd00]/5 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-amber-600/10 dark:bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

              <div className="relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-amber-500/20 dark:bg-[#ffcd00]/10 blur-md"
                    animate={{
                      scale: [1, 1.25, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative flex items-center justify-center w-20 h-20 bg-linear-to-tr from-amber-500 to-[#856a26] dark:from-[#ffcd00] dark:to-amber-500 rounded-full shadow-lg shadow-amber-500/10">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-1.5 border-2 border-dashed border-white/40 dark:border-neutral-900/40 rounded-full"
                    />
                    <TriangleExclamation className="w-8 h-8 text-white dark:text-neutral-950" />
                  </div>
                </div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-2xl font-black tracking-tight text-slate-800 dark:text-white"
                >
                  Verification in Progress
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-sm leading-relaxed"
                >
                  Your application to join BiblioDrop's librarian team is currently undergoing credentials verification.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="w-full mt-8 p-5 bg-slate-50 dark:bg-[#12141c]/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-left space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-5 h-5 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold shrink-0">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Account Registered</h4>
                      <p className="text-[10px] text-slate-400">Security profile has been successfully initiated.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-5 h-5 bg-amber-500/20 text-amber-600 dark:text-[#ffcd00] rounded-full text-xs font-bold shrink-0 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500/30 opacity-75"></span>
                      •
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Reviewing Credentials</h4>
                      <p className="text-[10px] text-slate-400">Our operations team is reviewing catalog permissions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 opacity-40">
                    <div className="flex items-center justify-center w-5 h-5 bg-slate-200 dark:bg-slate-800 text-slate-500 rounded-full text-xs font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400">Librarian Access Granted</h4>
                      <p className="text-[10px] text-slate-500">Unlocks dashboard publishing & inventory management tools.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 flex items-center gap-2 text-xs text-slate-400 bg-slate-100 dark:bg-[#12141c]/30 px-3.5 py-1.5 rounded-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Response Time Estimate: 1–2 Business Days
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* 2. APPROVED FORM SCREEN */
            <motion.div
              key="add-book-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Form
                className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-[#192230] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-gray-800/80 shadow-sm"
                render={(props) => <form {...props} />}
                onSubmit={handleFormSubmit}
              >
                {/* Left Column: Metadata Inputs */}
                <div className="space-y-5">
                  <TextField isRequired name="title" type="text" className="flex flex-col gap-1">
                    <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Book Title</Label>
                    <Input placeholder="e.g. To Kill a Mockingbird" className="rounded-xl" />
                    <FieldError className="text-xs text-rose-500 mt-1" />
                  </TextField>

                  <TextField isRequired name="author" type="text" className="flex flex-col gap-1">
                    <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Author</Label>
                    <Input placeholder="e.g. Harper Lee" className="rounded-xl" />
                    <FieldError className="text-xs text-rose-500 mt-1" />
                  </TextField>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Genre Select Dropdown Component */}
                    <Select isRequired name="genre" placeholder="Select" className="flex flex-col gap-1">
                      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Genre</Label>
                      <Select.Trigger className="h-10 px-3 w-full rounded-xl border border-slate-200 dark:border-gray-800/80 bg-white dark:bg-[#12141c]/20 text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500 transition-colors cursor-pointer">
                        <Select.Value className="text-slate-800 dark:text-slate-200 truncate" />
                        <Select.Indicator className="text-slate-400" />
                      </Select.Trigger>
                      <Select.Popover className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#192230] rounded-xl shadow-xl mt-1 max-h-60 overflow-y-auto z-50">
                        <ListBox className="p-1.5 space-y-0.5">
                          {GENRES.map((genre) => (
                            <ListBox.Item
                              key={genre.id}
                              id={genre.id}
                              textValue={genre.name}
                              className="px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer flex items-center justify-between data-selected:bg-amber-100 dark:data-selected:bg-amber-900/40"
                            >
                              {genre.name}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                      <FieldError className="text-xs text-rose-500 mt-1" />
                    </Select>

                    {/* Quantity Input Field */}
                    <TextField
                      isRequired
                      name="quantity"
                      type="number"
                      className="flex flex-col gap-1"
                      validate={(value) => {
                        if (parseInt(value, 10) < 1) {
                          return "At least 1";
                        }
                        return null;
                      }}
                    >
                      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Quantity</Label>
                      <Input placeholder="1" min="1" className="rounded-xl" />
                      <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>

                    {/* Delivery Fee Input Field */}
                    <TextField
                      isRequired
                      name="deliveryFee"
                      type="number"
                      className="flex flex-col gap-1"
                      validate={(value) => {
                        const fee = parseFloat(value);
                        if (isNaN(fee) || fee < 0) {
                          return "Cannot be negative";
                        }
                        return null;
                      }}
                    >
                      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Delivery Fee ($)</Label>
                      <Input placeholder="0.00" min="0" step="0.01" className="rounded-xl" />
                      <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>
                  </div>

                  <TextField isRequired name="description" className="flex flex-col gap-1">
                    <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Description</Label>
                    <TextArea placeholder="Provide a summary of the book plot..." rows={4} className="rounded-xl" />
                    <FieldError className="text-xs text-rose-500 mt-1" />
                  </TextField>
                </div>

                {/* Right Column: Dynamic Image Handling & Actions */}
                <div className="flex flex-col gap-5 justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                      Book Cover Image
                    </span>

                    {!coverUrl ? (
                      <label className="group flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-[#12141c]/40 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl cursor-pointer hover:border-amber-600 dark:hover:border-[#ffcd00] hover:bg-slate-100/50 dark:hover:bg-[#12141c]/80 transition-all duration-200">
                        <div className="p-3 bg-white dark:bg-[#192230] rounded-2xl shadow-sm text-slate-400 group-hover:text-amber-600 dark:group-hover:text-[#ffcd00] transition-colors">
                          <ArrowUp width={24} height={24} />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-3">
                          Upload Cover Image
                        </span>
                        <span className="text-xs text-slate-400 mt-1">
                          PNG, JPG or JPEG up to 10MB
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                      </label>
                    ) : (
                      <div className="relative border border-slate-200 dark:border-slate-800 p-4 rounded-3xl flex items-center gap-4 bg-slate-50 dark:bg-[#12141c]/20">
                        <img
                          src={coverUrl}
                          alt="Uploaded Book Cover Preview"
                          className="h-24 w-16 object-cover rounded-xl shadow-md border dark:border-slate-800"
                        />
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
                            Cover uploaded successfully
                          </span>
                          <a
                            href={coverUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-amber-700 dark:text-[#ffcd00] hover:underline mt-1 truncate"
                          >
                            View Full Image
                          </a>
                        </div>
                        <Button
                          isIconOnly
                          type="button"
                          variant="light"
                          onClick={resetCoverImage}
                          className="text-slate-400 hover:text-rose-500 rounded-full cursor-pointer"
                        >
                          <Xmark width={18} height={18} />
                        </Button>
                      </div>
                    )}

                    {/* LOADING BAR */}
                    <AnimatePresence>
                      {isUploading && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mt-4"
                        >
                          <div className="flex justify-between items-center text-xs text-slate-500 mb-1.5 font-semibold">
                            <span>Converting and uploading via ImgBB...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border dark:border-slate-800">
                            <motion.div
                              className="h-full bg-linear-to-r from-amber-500 to-[#856a26] dark:from-[#ffcd00] dark:to-amber-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${uploadProgress}%` }}
                              transition={{ ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* File Upload Errors */}
                    {uploadError && (
                      <p className="text-xs font-semibold text-rose-500 mt-3 flex items-center gap-1.5">
                        <TriangleExclamation width={14} height={14} />
                        {uploadError}
                      </p>
                    )}
                  </div>

                  {/* Form Buttons */}
                  <div className="flex gap-3 justify-center md:justify-end pt-4 border-t border-slate-200/60 dark:border-gray-800/60">
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      disabled={isUploading}
                      className="w-full md:w-auto bg-[#856a26] dark:bg-[#ffcd00] text-white dark:text-[#192230] hover:bg-slate-800 dark:hover:bg-white font-extrabold px-6 h-11 rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      {!isSubmitting && <Check width={18} height={18} className="mr-2" />}
                      {isSubmitting ? "Posting Book..." : "Post Catalog"}
                    </Button>
                  </div>
                </div>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AddBook;