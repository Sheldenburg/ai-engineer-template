import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import client from "@/lib/api";
import TableRowItem from "@/components/table-row-item";

async function getItems() {
  const { data, error } = await client.GET("/api/v1/items/", {
    cache: "no-store",
  });
  if (error) {
    console.log(error);
    // return [];
  }
  return data;
}

async function ItemsTable() {
  const items = await getItems();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items &&
          (
            items as {
              data: {
                title: string;
                description?: string | null | undefined;
                id: number;
                owner_id: number;
              }[];
              count: number;
            }
          ).data.map((item) => <TableRowItem key={item.id} item={item} />)}
      </TableBody>
    </Table>
  );
}

export default ItemsTable;
