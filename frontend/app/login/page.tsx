import Link from "next/link";

import { SubmitButton } from "@/components/ui/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signup } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  return (
    <form className="fixed inset-0 m-auto flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="username"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/login/password-recovery"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input name="password" type="password" required />
            </div>
            <SubmitButton
              type="submit"
              className="w-full"
              formAction={login}
              pendingText="logging in..."
            >
              Login
            </SubmitButton>
            <SubmitButton
              variant="outline"
              className="w-full"
              formAction={signup}
              pendingText="signing up..."
            >
              Sign up
            </SubmitButton>
          </div>
          {/* <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div> */}
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
