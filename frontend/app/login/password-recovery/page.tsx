import Link from "next/link";

import {SubmitButton} from "@/components/ui/submit-button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export default function PasswordRecoveryPage({searchParams}: {searchParams: {message?: string}}) {
  return (
    <form className="fixed inset-0 m-auto flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Password Recovery</CardTitle>
          <CardDescription className="text-center">
            A password recovery email will be sent to the registered account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" type="email" placeholder="m@example.com" required />
            </div>
            <SubmitButton
              type="submit"
              className="w-full"
              // TODO: implement password recovery
              //   formAction={login}
              pendingText="loading..."
            >
              Continue
            </SubmitButton>
          </div>
          {searchParams?.message && (
            <p className="mt-4 w-auto bg-foreground/10 p-4 text-center text-foreground">
              {searchParams.message}
            </p>
          )}
        </CardContent>
      </Card>
    </form>
  );
}
