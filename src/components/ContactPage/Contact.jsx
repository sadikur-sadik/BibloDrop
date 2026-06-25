'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Card,
} from '@heroui/react';
import {
  Envelope,
  MapPin,
  Comment,
  PaperPlane,
  CircleCheck
} from '@gravity-ui/icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Restored page animation settings
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.12
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const recipient = 'sadikursadik541@gmail.com';
    const emailSubject = encodeURIComponent(formData.subject || 'Inquiry from BiblioDrop');
    const emailBody = encodeURIComponent(
      `Hello,\n\n${formData.message}\n\nSincerely,\n${formData.name}\nDirect Email: ${formData.email}`
    );

    const mailtoUrl = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="w-full max-w-360 mx-auto bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden select-none flex flex-col justify-center">
      {/* Background accents */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#856a26]/5 dark:bg-[#ffcd00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={containerVariants}
        className="max-w-7xl mx-auto w-full space-y-12 relative z-10"
      >
        {/* Header Section - Matched to BrowseBooks formatting and animated via itemVariants */}
        <div className="border-b border-slate-200/80 dark:border-gray-800/80 pb-6 mb-8">
          <motion.h1
            variants={itemVariants}
            className="text-2xl font-black tracking-tight text-slate-800 dark:text-white"
          >
            Connect <span className="text-[#856a26] dark:text-[#ffcd00]">With Us</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xs text-slate-500 dark:text-slate-400 mt-1"
          >
            Have inquiries regarding book delivery, community library setups, or host applications? Drop a message below and we will get back to you.
          </motion.p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Column 1: Contact Form Container */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <Card className="bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 shadow-md rounded-[2rem] overflow-hidden">
              <div className="p-6 sm:p-10">
                {isSubmitted ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
                      <CircleCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-[#192230] dark:text-white">
                      Message Dispatched
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Your local mail client was requested. Please verify and send the pre-filled compose window to reach us.
                    </p>
                    <Button
                      onPress={() => setIsSubmitted(false)}
                      className="mt-6 font-bold bg-[#192230] text-white dark:bg-[#ffcd00] dark:text-[#192230] rounded-full cursor-pointer hover:opacity-90 px-6 py-2"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <Form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      {/* Full Name */}
                      <TextField isRequired name="name" type="text" className="flex flex-col gap-1.5">
                        <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Full Name
                        </Label>
                        <Input
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white rounded-2xl border border-slate-200/80 dark:border-gray-800/80 p-4 text-sm focus:outline-none focus:border-[#856a26] dark:focus:border-[#ffcd00] transition-colors"
                        />
                        <FieldError className="text-xs text-rose-500 mt-1" />
                      </TextField>

                      {/* Email Address */}
                      <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                        <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Email Address
                        </Label>
                        <Input
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white rounded-2xl border border-slate-200/80 dark:border-gray-800/80 p-4 text-sm focus:outline-none focus:border-[#856a26] dark:focus:border-[#ffcd00] transition-colors"
                        />
                        <FieldError className="text-xs text-rose-500 mt-1" />
                      </TextField>

                    </div>

                    {/* Subject */}
                    <TextField isRequired name="subject" type="text" className="flex flex-col gap-1.5">
                      <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Subject
                      </Label>
                      <Input
                        placeholder="Inquiry about library hosting..."
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white rounded-2xl border border-slate-200/80 dark:border-gray-800/80 p-4 text-sm focus:outline-none focus:border-[#856a26] dark:focus:border-[#ffcd00] transition-colors"
                      />
                      <FieldError className="text-xs text-rose-500 mt-1" />
                    </TextField>

                    {/* Your Message */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Your Message
                      </Label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you..."
                        className="w-full bg-slate-50 dark:bg-[#192230] text-[#192230] dark:text-white rounded-2xl border border-slate-200/80 dark:border-gray-800/80 p-4 text-sm focus:outline-none focus:border-[#856a26] dark:focus:border-[#ffcd00] transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-2xl text-xs font-bold bg-[#192230] text-white dark:bg-[#ffcd00] dark:text-[#192230] hover:bg-[#2c2f38] dark:hover:bg-[#ffe066] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="w-4 h-4 border-2 border-white dark:border-[#192230] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <PaperPlane className="w-4 h-4" />
                          <span>Open Mail Client</span>
                        </>
                      )}
                    </Button>
                  </Form>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Column 2: Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-6">

            {/* Direct Email Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex items-start gap-4 hover:border-[#856a26]/30 dark:hover:border-[#ffcd00]/30 transition-all duration-300"
            >
              <div className="bg-slate-100 dark:bg-[#192230] p-3.5 rounded-2xl text-[#856a26] dark:text-[#ffcd00] border border-slate-200/60 dark:border-gray-700/50">
                <Envelope className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  Direct Mailbox
                </span>
                <a
                  href="mailto:sadikursadik541@gmail.com"
                  className="text-sm font-bold text-[#192230] dark:text-white hover:text-[#856a26] dark:hover:text-[#ffcd00] transition-colors"
                >
                  sadikursadik541@gmail.com
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Expect a reply within business hours.
                </p>
              </div>
            </motion.div>

            {/* Support Channels Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex items-start gap-4 hover:border-[#856a26]/30 dark:hover:border-[#ffcd00]/30 transition-all duration-300"
            >
              <div className="bg-slate-100 dark:bg-[#192230] p-3.5 rounded-2xl text-[#856a26] dark:text-[#ffcd00] border border-slate-200/60 dark:border-gray-700/50">
                <Comment className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  Community Comment
                </span>
                <h4 className="text-sm font-bold text-[#192230] dark:text-white">
                  Join Discord Community
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Get instant troubleshooting tips from peer hosts and readers globally.
                </p>
              </div>
            </motion.div>

            {/* Logistics Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-[#2c2f38] border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex items-start gap-4 hover:border-[#856a26]/30 dark:hover:border-[#ffcd00]/30 transition-all duration-300"
            >
              <div className="bg-slate-100 dark:bg-[#192230] p-3.5 rounded-2xl text-[#856a26] dark:text-[#ffcd00] border border-slate-200/60 dark:border-gray-700/50">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  Main Depot Hub
                </span>
                <h4 className="text-sm font-bold text-[#192230] dark:text-white">
                  Decentralized Library Network
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Distributed physical hubs handling secure transits, package scaling, and book inspections.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Contact;