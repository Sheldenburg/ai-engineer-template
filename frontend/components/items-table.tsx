import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import client from "@/lib/api";
import { cookies } from "next/headers";

async function getItems() {
  const {data, error} = await client.GET("/api/v1/items/",{
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
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
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items && (items as { data: { title: string; description?: string | null | undefined; id: number; owner_id: number; }[]; count: number; }).data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>action</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ItemsTable;