"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { DeleteUserDialog } from "./delete-user-dialog";
import { EditUserDialog } from "./edit-user-dialog";
import { useState } from "react";
import { Dot } from "lucide-react";

function TableRowUser({
  user,
  me,
}: {
  user: {
    email: string;
    is_active?: boolean | undefined;
    is_superuser?: boolean | undefined;
    full_name?: string | null | undefined;
    id: number;
  },
  me: {
    email: string;
    is_active?: boolean | undefined;
    is_superuser?: boolean | undefined;
    full_name?: string | null | undefined;
    id: number;
  };
}) {
  const [popOverOpen, popOverSetOpen] = useState<boolean>(false);
  return (
    <TableRow key={user.id}>
      <TableCell className="font-medium">
        <div className="flex flex-row gap-1">
          <p>{`${user.full_name ? user.full_name : "N/A"}`}</p>
          {user.email === me.email && <p className="bg-gray-200">YOU</p>}
        </div>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{`${user.is_superuser ? "Superuser" : "User"}`}</TableCell>
      <TableCell>
        <div className="flex flex-row items-center">
          <Dot className="h-6 w-6" />
          {`${user.is_active ? "Active" : "Inactive"}`}
        </div>
      </TableCell>
      <TableCell>
        <Popover open={popOverOpen} onOpenChange={popOverSetOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost">
              <Image
                src="/three-dots-vertical.svg"
                alt="Edit"
                width={20}
                height={20}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-50">
            <form className="flex flex-col">
              <EditUserDialog
                user={user}
                popOverSetOpen={popOverSetOpen}
              />
              <DeleteUserDialog
                userId={user.id}
                popOverSetOpen={popOverSetOpen}
              />
            </form>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
}

export default TableRowUser;
