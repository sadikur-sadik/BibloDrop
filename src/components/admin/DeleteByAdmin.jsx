'use client';

import React, { useState } from 'react';
import { Modal, Button } from "@heroui/react";
import { motion } from 'motion/react';
import { TrashBin } from '@gravity-ui/icons';

const DeletePendingBook = ({ book, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors cursor-pointer flex items-center justify-center"
        title="Delete Book"
      >
        <TrashBin className="w-4.5 h-4.5" />
      </motion.button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop className="bg-black/60 backdrop-blur-xs transition-all">
          <Modal.Container placement="center" className="p-4 flex items-center justify-center">
            <Modal.Dialog className="relative w-full max-w-md bg-white dark:bg-[#192230] text-[#192230] dark:text-white rounded-3xl border border-slate-200/80 dark:border-gray-800/80 shadow-2xl overflow-hidden p-6 outline-hidden transition-colors duration-300">
              {({ close }) => (
                <>
                  <Modal.CloseTrigger 
                    onPress={close}
                    className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#2c2f38] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer" 
                  />
                  
                  <Modal.Header className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-gray-800/60">
                    <Modal.Icon className="text-rose-500">
                      <TrashBin className="w-5 h-5" />
                    </Modal.Icon>
                    <Modal.Heading className="text-base font-black tracking-tight">
                      Confirm Deletion
                    </Modal.Heading>
                  </Modal.Header>

                  <Modal.Body className="py-5 text-sm text-slate-600 dark:text-[#9ea7b3] leading-relaxed">
                    Are you absolutely sure you want to delete <strong className="text-slate-900 dark:text-white font-extrabold">"{book?.title}"</strong>? This will permanently remove the record from the library inventory database.
                  </Modal.Body>

                  <Modal.Footer className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-gray-800/60">
                    <Button 
                      onPress={close}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200/80 dark:bg-[#2c2f38]/60 dark:hover:bg-[#2c2f38] text-slate-700 dark:text-[#9ea7b3] transition-colors cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button
                      onPress={() => {
                        onDelete(book);
                        close();
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                    >
                      Delete Book
                    </Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default DeletePendingBook;