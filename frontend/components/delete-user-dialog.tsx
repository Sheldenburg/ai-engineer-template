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
import {deleteUser} from "@/app/(protected)/admin/actions";
import {useToast} from "./ui/use-toast";

export function DeleteUserDialog({
  userId,
  popOverSetOpen,
}: {
  userId: number;
  popOverSetOpen: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const {toast} = useToast();
  const deleteUserwithId = deleteUser.bind(null, userId.toString()); // bind only works with string not number
  async function handleSubmit() {
    const result = await deleteUserwithId();
    if (result?.error) {
      setOpen(false);
      popOverSetOpen(false);
      return toast({
        title: "Something went wrong!",
        description: String(result.error),
        variant: "destructive",
      });
    } else {
      setOpen(false);
      popOverSetOpen(false);
      return toast({
        title: "Success",
        description: "User was deleted successfully!",
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start"
          //   formAction={deleteItemwithId}
        >
          <Trash2 className="w-5 h-5 mr-2 text-red-400" />
          <p className="text-red-400">Delete User</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              All items associated with this user will also be <strong>permantly deleted.</strong>{" "}
              Are you sure? You will not be able to undo this action.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="destructive" type="submit" formAction={handleSubmit}>
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
