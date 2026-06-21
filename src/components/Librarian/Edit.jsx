'use client';

import React, { useState } from 'react';
import { 
  Modal, 
  Button, 
  FieldError, 
  Form, 
  Input, 
  Label, 
  TextField, 
  TextArea, 
  Select, 
  ListBox 
} from "@heroui/react";
import { motion, AnimatePresence } from 'motion/react';
import { Pencil, Check, TriangleExclamation, ArrowUp, Xmark } from '@gravity-ui/icons';

// Sync matching genres list from Catalog Form
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

const EditBooks = ({ book, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coverUrl, setCoverUrl] = useState(book?.coverImage || "");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Controlled Select value state
  const [genre, setGenre] = useState(book?.genre || "");

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
          "ImgBB API Key is missing. Define NEXT_PUBLIC_IMGBB_KEY in your env file."
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataObj = Object.fromEntries(new FormData(e.currentTarget));
    
    // Assemble completed update data payload
    const updatedData = {
      ...formDataObj,
      genre, // Selected genre key
      coverImage: coverUrl, // Processed ImgBB url
    };

    try {
      await onEdit(book._id, updatedData);
      setIsOpen(false);
    } catch (error) {
      console.error("Error occurred while updating form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Trigger Button with parent element animation presets */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-xl bg-slate-200/60 hover:bg-slate-200 dark:bg-[#3d474e]/40 dark:hover:bg-[#3d474e]/60 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer flex items-center justify-center"
        title="Edit Book"
      >
        <Pencil className="w-4 h-4" />
      </motion.button>

      {/* HeroUI Controlled Overlay Modal */}
      <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen} className="bg-black/60 backdrop-blur-xs transition-all">
        <Modal.Container placement="center" className="p-4 flex items-center justify-center">
          <Modal.Dialog className="relative w-full max-w-2xl bg-white dark:bg-[#192230] text-[#192230] dark:text-white rounded-3xl border border-slate-200/80 dark:border-gray-800/80 shadow-2xl overflow-hidden p-6 md:p-8 outline-hidden transition-colors duration-300">
            {({ close }) => (
              <>
                <Modal.CloseTrigger 
                  onPress={close}
                  className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#2c2f38] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer" 
                />
                
                <Modal.Header className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-gray-800/60">
                  <Modal.Icon className="text-[#856a26] dark:text-[#ffcd00]">
                    <Pencil className="w-5 h-5" />
                  </Modal.Icon>
                  <Modal.Heading className="text-lg font-black tracking-tight">
                    Edit Book Details
                  </Modal.Heading>
                </Modal.Header>

                <Form
                  onSubmit={handleFormSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
                >
                  {/* Left Column: Input Forms */}
                  <div className="space-y-4">
                    <TextField isRequired name="title" type="text" defaultValue={book?.title} className="flex flex-col gap-1">
                      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Book Title</Label>
                      <Input placeholder="e.g. To Kill a Mockingbird" className="rounded-xl" />
                      <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>

                    <TextField isRequired name="author" type="text" defaultValue={book?.author} className="flex flex-col gap-1">
                      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Author</Label>
                      <Input placeholder="e.g. Harper Lee" className="rounded-xl" />
                      <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Selected value linked dynamically through state */}
                      <Select 
                        isRequired 
                        name="genre" 
                        placeholder="Select a genre" 
                        selectedKey={genre}
                        onSelectionChange={(key) => setGenre(key)}
                        className="flex flex-col gap-1"
                      >
                        <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Genre</Label>
                        <Select.Trigger className="h-10 px-3 w-full rounded-xl border border-slate-200 dark:border-gray-800/80 bg-white dark:bg-[#12141c]/20 text-sm text-slate-800 dark:text-slate-200 flex items-center justify-between focus-within:border-[#856a26] dark:focus-within:border-[#ffcd00] transition-colors cursor-pointer">
                          <Select.Value className="text-slate-800 dark:text-slate-200" />
                          <Select.Indicator className="text-slate-400" />
                        </Select.Trigger>
                        <Select.Popover className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#192230] rounded-xl shadow-xl mt-1 max-h-48 overflow-y-auto z-50">
                          <ListBox className="p-1.5 space-y-0.5">
                            {GENRES.map((g) => (
                              <ListBox.Item 
                                key={g.id} 
                                id={g.id} 
                                textValue={g.name}
                                className="px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer flex items-center justify-between data-selected:bg-amber-100 dark:data-selected:bg-amber-900/40"
                              >
                                {g.name}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                        <FieldError className="text-xs text-rose-500 mt-1" />
                      </Select>

                      <TextField
                        isRequired
                        name="quantity"
                        type="number"
                        defaultValue={book?.quantity?.toString() || "1"}
                        className="flex flex-col gap-1"
                        validate={(value) => {
                          if (parseInt(value, 10) < 1) {
                            return "Quantity must be at least 1";
                          }
                          return null;
                        }}
                      >
                        <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Quantity</Label>
                        <Input min="1" className="rounded-xl" />
                        <FieldError className="text-xs text-rose-500 mt-1" />
                      </TextField>
                    </div>

                    <TextField isRequired name="description" defaultValue={book?.description} className="flex flex-col gap-1">
                      <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Description</Label>
                      <TextArea placeholder="Provide a summary of the book plot..." rows={3} className="rounded-xl" />
                      <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>
                  </div>

                  {/* Right Column: Book Cover & Form Actions */}
                  <div className="flex flex-col gap-4 justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                        Book Cover Image
                      </span>

                      {!coverUrl ? (
                        <label className="group flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-[#12141c]/40 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl cursor-pointer hover:border-amber-600 dark:hover:border-[#ffcd00] hover:bg-slate-100/50 dark:hover:bg-[#12141c]/80 transition-all duration-200">
                          <div className="p-2.5 bg-white dark:bg-[#192230] rounded-xl shadow-xs text-slate-400 group-hover:text-amber-600 dark:group-hover:text-[#ffcd00] transition-colors">
                            <ArrowUp width={20} height={20} />
                          </div>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-2">
                            Upload New Cover
                          </span>
                          <span className="text-[10px] text-slate-400 mt-0.5">
                            PNG, JPG, or JPEG up to 10MB
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
                        <div className="relative border border-slate-200 dark:border-slate-800 p-3 rounded-2xl flex items-center gap-3 bg-slate-50 dark:bg-[#12141c]/20">
                          <img
                            src={coverUrl}
                            alt="Book Cover Preview"
                            className="h-20 w-14 object-cover rounded-lg shadow-sm border dark:border-slate-800"
                          />
                          <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">
                              Cover image loaded
                            </span>
                            <a
                              href={coverUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-amber-700 dark:text-[#ffcd00] hover:underline mt-0.5 truncate"
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
                            <Xmark width={16} height={16} />
                          </Button>
                        </div>
                      )}

                      {/* File Upload Loading Bar */}
                      <AnimatePresence>
                        {isUploading && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-3"
                          >
                            <div className="flex justify-between items-center text-[10px] text-slate-500 mb-1 font-semibold">
                              <span>Converting and uploading via ImgBB...</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border dark:border-slate-800">
                              <motion.div
                                className="h-full bg-[#856a26] dark:bg-[#ffcd00] rounded-full"
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
                        <p className="text-[11px] font-semibold text-rose-500 mt-2 flex items-center gap-1">
                          <TriangleExclamation width={12} height={12} />
                          {uploadError}
                        </p>
                      )}
                    </div>

                    {/* Modal Footer Controls */}
                    <div className="flex gap-2.5 justify-end pt-4 border-t border-slate-100 dark:border-gray-800/60">
                      <Button 
                        onPress={close}
                        className="px-4 h-10 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200/80 dark:bg-[#2c2f38]/60 dark:hover:bg-[#2c2f38] text-slate-700 dark:text-[#9ea7b3] transition-colors cursor-pointer"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        isLoading={isSubmitting}
                        disabled={isUploading}
                        className="px-5 h-10 rounded-xl text-xs font-bold bg-[#856a26] dark:bg-[#ffcd00] text-white dark:text-[#192230] hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer"
                      >
                        {!isSubmitting && <Check width={14} height={14} className="mr-1.5" />}
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </Form>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  );
};

export default EditBooks;