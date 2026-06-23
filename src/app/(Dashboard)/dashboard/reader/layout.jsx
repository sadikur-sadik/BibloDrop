import { requiredRole } from '@/lib/core/session';
import React from 'react';

const AdminLayout = async({children}) => {
  await requiredRole("reader")
  return (
    <div>
      {children}
    </div>
  );
};

export default AdminLayout;