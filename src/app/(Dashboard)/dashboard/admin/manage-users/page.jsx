import ManageUsersByAdmin from '@/components/admin/AdminManageUsers/ManageUsers';
import { getUsersAPI } from '@/lib/fetch/users';
import React from 'react';

const ManageUsers = async() => {
  const users = await getUsersAPI()
  
  return (
    <div>
      <ManageUsersByAdmin users={users}/>
    </div>
  );
};

export default ManageUsers;