"use client";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { editUser } from "@/app/(protected)/admin/actions";

export function EditUserDialog({
  user,
  popOverSetOpen,
}: {
  user: {
    email: string;
    is_active?: boolean | undefined;
    is_superuser?: boolean | undefined;
    full_name?: string | null | undefined;
    id: number;
  };
  popOverSetOpen: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(
    user.is_superuser ? user.is_superuser : false
  );
  const [isActive, setIsActive] = useState(
    user.is_active ? user.is_active : false
  );
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [fullName, setFullName] = useState(
    user.full_name ? user.full_name : ""
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  const editUserwithCheckbox = editUser.bind(
    null,
    `{"userId": ${user.id}, "isSuperUser": ${isSuperUser}, "isActive": ${isActive}}`
  ); // bind only works with string not number

  function resetForm() {
    setIsActive(false);
    setIsSuperUser(false);
    setEmail("");
    setFullName("");
    setPassword("");
    setConfirmPassword("");
  }
  async function handleSubmit(formData: FormData) {
    const result = await editUserwithCheckbox(formData);
    if (result?.error) {
      resetForm();
      setOpen(false);
      popOverSetOpen(false);
      return toast({
        title: "Something went wrong!",
        description: String(result.error),
        variant: "destructive",
      });
    } else {
      resetForm();
      setOpen(false);
      popOverSetOpen(false);
      return toast({
        title: "Success",
        description: "User was updated successfully!",
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <SquarePen className="w-5 h-5 mr-2" />
          Edit User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="email" className="text-right text-md">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                className="col-span-3"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="full-name" className="text-right text-md">
                Full name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                className="col-span-3"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="password" className="text-right text-md">
                Set Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                className="col-span-3"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="confirmPassword" className="text-right text-md">
                Confirm Password
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="col-span-3"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-row items-center justify-start space-x-8">
              <div>
                <Checkbox
                  id="isSuperUser"
                  name="isSuperUser"
                  checked={isSuperUser}
                  onClick={() => setIsSuperUser(!isSuperUser)}
                />
                <label
                  htmlFor="isSuperUser"
                  className="text-sm font-medium leading-none ml-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Is superuser?
                </label>
              </div>
              <div>
                <Checkbox
                  id="isActive"
                  name="isActive"
                  checked={isActive}
                  onClick={() => setIsActive(!isActive)}
                />
                <label
                  htmlFor="isActive"
                  className="text-sm font-medium leading-none ml-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Is active?
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" formAction={handleSubmit}>
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
