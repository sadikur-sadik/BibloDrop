import ManageUsersByAdmin from '@/components/admin/AdminManageUsers/ManageUsers';
import { getAllUsersForAdmin} from '@/lib/fetch/users';
import React from 'react';

const ManageUsers = async() => {
  const users = await getAllUsersForAdmin()
  
  return (
    <div>
      <ManageUsersByAdmin users={users}/>
    </div>
  );
};

export default ManageUsers;