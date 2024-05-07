"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { addItems } from "@/app/(protected)/items/actions";
import { useState } from "react";

export function AddItem() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="items-center justify-center gap-0.5"
        >
          <Plus className="h-5 w-5" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <DialogTitle>Add Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="name" className="text-right text-md">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="title"
                className="col-span-3"
                required
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="username" className="text-right text-md">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="description"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              formAction={async (formData) => {
                await addItems(formData);
                setOpen(false);
              }}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={()=>{setOpen(false)}}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
