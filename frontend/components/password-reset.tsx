"use client";
import { Button } from "./ui/button";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { updatePassword } from "@/app/(protected)/settings/actions";
import { useToast } from "./ui/use-toast";
import { unstable_noStore as noStore } from "next/cache";

function PasswordReset() {
  noStore();
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  const handleSubmit = async (formData: FormData) => {
    // validate the new and old password before making API call.
    // TODO: use zod. here is a simple one for now
    if (!currentPassword || !newPassword || !confirmPassword) {
      resetForm();
      return toast({
        title: "Something went wrong!",
        description: "All fields must be filled",
        variant: "destructive",
      });
    }
    if (formData.get("newPassword") !== formData.get("confirmPassword")) {
      resetForm();
      return toast({
        title: "Something went wrong!",
        description: "Passwords do not match",
        variant: "destructive",
      });
    }
    if (formData.get("newPassword") === formData.get("currentPassword")) {
      resetForm();
      return toast({
        title: "Something went wrong!",
        description: "New password cannot be the same as the current password",
        variant: "destructive",
      });
    }
    const result = await updatePassword(formData);
    if (result?.error) {
      resetForm();
      return toast({
        title: "Something went wrong!",
        description: String(result.error),
        variant: "destructive",
      });
    } else {
      resetForm();
      return toast({
        title: "Success",
        description: "Your password was updated successfully!",
      });
    }
  };
  return (
    <div className="m-4 space-y-4">
      <h2 className="text-md font-bold">User Information</h2>
      <form>
        <div className="mt-4 space-y-3">
          <Label className="text-base font-bold">Current password</Label>
          <Input
            id="currentPassword"
            name="currentPassword"
            className="w-full md:w-2/3"
            placeholder="Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="mt-4 space-y-3">
          <Label className="text-base font-bold">Set password</Label>
          <Input
            id="newPassword"
            name="newPassword"
            className="w-full md:w-2/3"
            placeholder="Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mt-4 space-y-3">
          <Label className="text-base font-bold">Confirm password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            className="w-full md:w-2/3"
            placeholder="Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="space-x-3 mt-4">
          <Button formAction={handleSubmit}>Save</Button>
        </div>
      </form>
    </div>
  );
}

export default PasswordReset;
