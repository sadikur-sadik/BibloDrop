'use client';

import React, { useState } from 'react';
import { 
  Modal, 
  Button, 
  FieldError, 
  Form, 
  Label, 
  TextField, 
  TextArea, 
  Select, 
  ListBox 
} from "@heroui/react";
import { motion } from 'motion/react';
import { Pencil, Check } from '@gravity-ui/icons';

const RATINGS = [
  { id: "5", name: "5 Stars (Excellent)" },
  { id: "4", name: "4 Stars (Good)" },
  { id: "3", name: "3 Stars (Average)" },
  { id: "2", name: "2 Stars (Poor)" },
  { id: "1", name: "1 Star (Unsatisfying)" },
];

const EditReview = ({ review, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(review?.rating?.toString() || "5");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataObj = Object.fromEntries(new FormData(e.currentTarget));
    
    // Assemble completed update data payload
    const updatedData = {
      ...formDataObj,
      rating: Number(rating)
    };

    try {
      await onEdit(review._id, updatedData);
      setIsOpen(false);
    } catch (error) {
      console.error("Error occurred while updating review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-xl bg-slate-200/60 hover:bg-slate-200 dark:bg-[#3d474e]/40 dark:hover:bg-[#3d474e]/60 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer flex items-center justify-center"
        title="Edit Review"
      >
        <Pencil className="w-4 h-4" />
      </motion.button>

      {/* Controlled Overlay Modal */}
      <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen} className="bg-black/60 backdrop-blur-xs transition-all">
        <Modal.Container placement="center" className="p-4 flex items-center justify-center">
          <Modal.Dialog className="relative w-full max-w-xl bg-white dark:bg-[#192230] text-[#192230] dark:text-white rounded-3xl border border-slate-200/80 dark:border-gray-800/80 shadow-2xl overflow-hidden p-6 md:p-8 outline-hidden transition-colors duration-300">
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
                    Edit Review Details
                  </Modal.Heading>
                </Modal.Header>

                <Form
                  onSubmit={handleFormSubmit}
                  className="space-y-6 mt-6"
                >
                  {/* Context Metadata Block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Read-Only Book Indicator Card */}
                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#12141c]/20 border border-slate-200/60 dark:border-gray-800/60">
                      {review?.bookImage && (
                        <img 
                          src={review.bookImage} 
                          alt={review.bookName} 
                          className="w-9 h-12 object-cover rounded-md shadow-xs border border-slate-200 dark:border-gray-800"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Book Details</span>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">{review?.bookName || "Untitled Book"}</h4>
                      </div>
                    </div>

                    {/* Read-Only User Avatar Card */}
                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#12141c]/20 border border-slate-200/60 dark:border-gray-800/60">
                      {review?.reviewerImage && (
                        <img 
                          src={review.reviewerImage} 
                          alt={review.reviewerName} 
                          className="w-10 h-10 object-cover rounded-full shadow-xs border border-slate-200 dark:border-gray-800"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Author feedback</span>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">{review?.reviewerName || "Anonymous"}</h4>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{review?.reviewerEmail}</p>
                      </div>
                    </div>
                  </div>

                  {/* Rating Selector */}
                  <Select 
                    isRequired 
                    name="rating" 
                    placeholder="Select a rating" 
                    selectedKey={rating}
                    onSelectionChange={(key) => setRating(key)}
                    className="flex flex-col gap-1"
                  >
                    <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Rating Grade</Label>
                    <Select.Trigger className="h-10 px-3 w-full rounded-xl border border-slate-200 dark:border-gray-800/80 bg-white dark:bg-[#12141c]/20 text-sm text-slate-800 dark:text-slate-200 flex items-center justify-between focus-within:border-[#856a26] dark:focus-within:border-[#ffcd00] transition-colors cursor-pointer">
                      <Select.Value className="text-slate-800 dark:text-slate-200" />
                      <Select.Indicator className="text-slate-400" />
                    </Select.Trigger>
                    <Select.Popover className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#192230] rounded-xl shadow-xl mt-1 max-h-48 overflow-y-auto z-50">
                      <ListBox className="p-1.5 space-y-0.5">
                        {RATINGS.map((r) => (
                          <ListBox.Item 
                            key={r.id} 
                            id={r.id} 
                            textValue={r.name}
                            className="px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer flex items-center justify-between data-selected:bg-amber-100 dark:data-selected:bg-amber-900/40"
                          >
                            {r.name}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                    <FieldError className="text-xs text-rose-500 mt-1" />
                  </Select>

                  {/* Comments Text Field */}
                  <TextField isRequired name="comment" defaultValue={review?.comment} className="flex flex-col gap-1">
                    <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Comments</Label>
                    <TextArea placeholder="Share your opinions on content quality and printing layout..." rows={4} className="rounded-xl" />
                    <FieldError className="text-xs text-rose-500 mt-1" />
                  </TextField>

                  {/* Modal Action Controls */}
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
                      className="px-5 h-10 rounded-xl text-xs font-bold bg-[#856a26] dark:bg-[#ffcd00] text-white dark:text-[#192230] hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer"
                    >
                      {!isSubmitting && <Check width={14} height={14} className="mr-1.5" />}
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
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

export default EditReview;