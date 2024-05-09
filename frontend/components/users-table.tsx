import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import client from "@/lib/api";
import TableRowUser from "@/components/table-row-user";

async function getUsers() {
  const { data, error } = await client.GET("/api/v1/users/", {
    cache: "no-store",
  });
  if (error) {
    console.log(error);
    // return [];
  }
  return data;
}
async function getMe() {
  const { data, error } = await client.GET("/api/v1/users/me", {
    cache: "no-store",
  });
  if (error) {
    console.log(error);
    // return [];
  }
  return data;
}

async function UsersTable() {
  const users = await getUsers();
  const me = await getMe();
  return (
    <div className="overflow-x-auto">
      <Table className="text-xs md:text-base">
        <TableHeader>
          <TableRow>
            <TableHead >FULL NAME</TableHead>
            <TableHead className="hidden md:table-cell">EMAIL</TableHead>
            <TableHead className="hidden md:table-cell">ROLE</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users &&
            (
              users as {
                data: {
                  email: string;
                  is_active?: boolean | undefined;
                  is_superuser?: boolean | undefined;
                  full_name?: string | null | undefined;
                  id: number;
                }[];
                count: number;
              }
            ).data.map((user) => (
              <TableRowUser key={user.id} user={user} me={me} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UsersTable;
