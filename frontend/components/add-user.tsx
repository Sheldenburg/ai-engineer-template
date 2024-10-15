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
import { addUsers } from "@/app/(protected)/admin/actions";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export function AddUser() {
  const [open, setOpen] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  function resetForm () {
    setIsActive(false);
    setIsSuperUser(false);
    setEmail("");
    setFullName("");
    setPassword("");
    setConfirmPassword("");
  }
  const addUserswithCheckbox = addUsers.bind(null, `{"isSuperUser": ${isSuperUser}, "isActive": ${isActive}}`);
  async function handleSubmit (formData: FormData) {
    const result = await addUserswithCheckbox(formData);
    if (result?.error) {
      resetForm();
      setOpen(false);
      return toast({
        title: "Something went wrong!",
        description: String(result.error),
        variant: "destructive",
      });
    } else {
      resetForm();
      setOpen(false);
      return toast({
        title: "Success",
        description: "User was created successfully!",
      });
    }
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="items-center justify-center gap-0.5"
          >
            <Plus className="h-5 w-5" />
            Add User
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
                  placeholder="email"
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
                  placeholder="Full name"
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
                  <Checkbox id="isSuperUser" name="isSuperUser" checked={isSuperUser} onClick={()=>setIsSuperUser(!isSuperUser)}/>
                  <label
                    htmlFor="isSuperUser"
                    className="text-sm font-medium leading-none ml-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Is superuser?
                  </label>
                </div>
                <div>
                  <Checkbox id="isActive" name="isActive" checked={isActive} onClick={()=>setIsActive(!isActive)}/>
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
              <Button
                type="submit"
                formAction={handleSubmit}
              >
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
