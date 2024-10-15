"use client";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {TableCell, TableRow} from "@/components/ui/table";
import {DeleteItemDialog} from "@/components/delete-item-dialog";
import {EditItemDialog} from "@/components/edit-item-dialog";
import {useState} from "react";

function TableRowItem({
  item,
}: {
  item: {
    title: string;
    description?: string | null | undefined;
    id: number;
    owner_id: number;
  };
}) {
  const [popOverOpen, popOverSetOpen] = useState<boolean>(false);
  return (
    <TableRow key={item.id}>
      <TableCell className="font-medium">{item.id}</TableCell>
      <TableCell>{item.title}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>
        <Popover open={popOverOpen} onOpenChange={popOverSetOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost">
              <Image src="/three-dots-vertical.svg" alt="Edit" width={20} height={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-50">
            <form className="flex flex-col">
              <EditItemDialog itemId={item.id} popOverSetOpen={popOverSetOpen} />
              <DeleteItemDialog itemId={item.id} popOverSetOpen={popOverSetOpen} />
            </form>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
}

export default TableRowItem;
