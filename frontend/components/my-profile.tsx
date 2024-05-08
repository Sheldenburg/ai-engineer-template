"use client";
import { Button } from "./ui/button";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { updateProfile } from "@/app/(protected)/settings/actions";
import { useToast } from "./ui/use-toast";

function MyProfile({
  fullName,
  email,
}: {
  fullName: string | null | undefined;
  email: string;
}) {
  const [edit, setEdit] = useState(false);
  const [fullNameClient, setFullNameClient] = useState("");
  const [emailClient, setEmailClient] = useState("");
  const { toast } = useToast();
  const handleCanel = () => {
    setEdit(false);
    setFullNameClient("");
    setEmailClient("");
  };
  return (
    <div className="m-4 space-y-4">
      <h2 className="text-md font-bold">User Information</h2>
      {!edit ? (
        <>
          <div className="mt-4 space-y-3">
            <Label className="text-base font-bold">Full name</Label>
            <p className={fullName ? "" : "text-gray-300"}>
              {fullName ? fullName : "N/A"}
            </p>
          </div>
          <div className="mt-4 space-y-3">
            <Label className="text-base font-bold">Email</Label>
            <p>{email}</p>
          </div>
          <Button
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </Button>
        </>
      ) : (
        <form>
          <div className="mt-4 space-y-3">
            <Label className="text-base font-bold">Full name</Label>
            <Input
              id="fullName"
              name="fullName"
              className="w-full md:w-2/3"
              placeholder="Full name"
              value={fullNameClient}
              onChange={(e) => setFullNameClient(e.target.value)}
            />
          </div>
          <div className="mt-4 space-y-3">
            <Label className="text-base font-bold">Email</Label>
            <Input
              id="email"
              name="email"
              className="w-full md:w-2/3"
              placeholder="Email"
              type="email"
              value={emailClient}
              onChange={(e) => setEmailClient(e.target.value)}
            />
          </div>
          <div className="space-x-3 mt-4">
            <Button
              className={emailClient ? "" : "bg-gray-300"}
              formAction={async (formData) => {
                await updateProfile(formData);
                handleCanel();
                toast({
                  title: "Success",
                  description: "Your profile was updated successfully.",
                });
              }}
            >
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                handleCanel();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default MyProfile;
