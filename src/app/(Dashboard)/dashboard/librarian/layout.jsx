import { requiredRole } from '@/lib/core/session';
import React from 'react';

const LibrarianLayout = async ({ children }) => {
  await requiredRole("librarian")
  return (
    <div>
      {children}
    </div>
  );
};

export default LibrarianLayout;