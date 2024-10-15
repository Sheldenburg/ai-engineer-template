"use client";
import {Button} from "@/components/ui/button";
import {Label} from "./ui/label";
import {Input} from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {useState} from "react";
import {SquarePen} from "lucide-react";
import {editItem} from "@/app/(protected)/items/actions";
import {useToast} from "./ui/use-toast";

export function EditItemDialog({
  itemId,
  popOverSetOpen,
}: {
  itemId: number;
  popOverSetOpen: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const {toast} = useToast();
  const editItemwithId = editItem.bind(null, itemId.toString()); // bind only works with string not number
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <SquarePen className="w-5 h-5 mr-2" />
          Edit Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="name" className="text-right text-md">
                Title
              </Label>
              <Input id="title" name="title" placeholder="title" className="col-span-3" required />
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
                await editItemwithId(formData);
                setOpen(false);
                popOverSetOpen(false);
                toast({
                  title: "Success",
                  description: "Your item was updated successfully.",
                });
              }}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                popOverSetOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
