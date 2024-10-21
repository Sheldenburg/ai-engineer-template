import Link from "next/link";
import { SubmitButton } from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
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
import { Github, Mail } from "lucide-react";
import { OAuthLogin } from "@/components/oauth-login";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  return (
    <div className="fixed inset-0 m-auto flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form>
              {/* <div className="grid gap-2"> */}
              <div className="space-y-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="username"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {/* </div> */}
                {/* <div className="grid gap-2"> */}
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
              {/* </div> */}
              <div className="space-y-2 mt-5">
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
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
          </div>
          {searchParams?.message && (
            <p className="mt-4 w-auto bg-foreground/10 p-4 text-center text-foreground">
              {searchParams.message}
            </p>
          )}
          <OAuthLogin />
        </CardContent>
      </Card>
    </div>
  );
}
