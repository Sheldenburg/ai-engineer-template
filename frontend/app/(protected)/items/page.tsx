import { AddItem } from "@/components/add-item";
import ItemsTable from "@/components/items-table";
import React from "react";

function ItemsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold pl-5">Items Management</h1>
      <div className="pl-5 mt-8">
        <AddItem />
        <div className="px-6 mt-3">
          <ItemsTable />
        </div>
      </div>
    </div>
  );
}

export default ItemsPage;
