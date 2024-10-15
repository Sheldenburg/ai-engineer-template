"use client";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {useState} from "react";
import {Trash2} from "lucide-react";
import {deleteItem} from "@/app/(protected)/items/actions";
import {useToast} from "./ui/use-toast";

export function DeleteItemDialog({
  itemId,
  popOverSetOpen,
}: {
  itemId: number;
  popOverSetOpen: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const {toast} = useToast();
  const deleteItemwithId = deleteItem.bind(null, itemId.toString()); // bind only works with string not number
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start"
          //   formAction={deleteItemwithId}
        >
          <Trash2 className="w-5 h-5 mr-2 text-red-400" />
          <p className="text-red-400">Delete Item</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              Are you sure? You will not be able to undo this action.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              variant="destructive"
              type="submit"
              formAction={async () => {
                await deleteItemwithId();
                setOpen(false);
                popOverSetOpen(false);
                toast({
                  title: "Success",
                  description: "Your item was deleted successfully.",
                });
              }}
            >
              Delete
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
