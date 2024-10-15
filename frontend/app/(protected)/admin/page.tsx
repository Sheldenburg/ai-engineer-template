import {AddUser} from "@/components/add-user";
import UsersTable from "@/components/users-table";
import React from "react";

function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold pl-5">User Management</h1>
      <div className="pl-5 mt-8">
        <AddUser />
        <div className="px-6 mt-3">
          <UsersTable />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
