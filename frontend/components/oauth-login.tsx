"use client";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

export function OAuthLogin() {
  async function loginGoogle() {
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

    if (!GOOGLE_CLIENT_ID || !GOOGLE_REDIRECT_URI) {
      console.error("Google Client ID or Redirect URI is not defined");
    }
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile`;
    window.location.href = googleAuthUrl;
  }
  async function loginGithub() {
    const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const GITHUB_REDIRECT_URI = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI;

    if (!GITHUB_CLIENT_ID || !GITHUB_REDIRECT_URI) {
      console.error("GitHub Client ID or Redirect URI is not defined");
    }
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=read:user user:email`;
    window.location.href = githubAuthUrl;
  }
  return (
    <div className="grid grid-cols-2 gap-6 mt-3">
      <Button variant="outline" onClick={loginGoogle}>
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        Google
      </Button>
      <Button variant="outline" onClick={loginGithub}>
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}
