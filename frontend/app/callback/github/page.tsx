"use client";

// callback function to handle OAuth2 authorization code flow, authenticators will redirect to this page
// after the user has authenticated on their platoform (e.g., Google, GitHub, etc.)

import { useEffect, useState } from "react";
import { getAccessTokenGithubAuth } from "./actions";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Callback() {
  const [hasFetched, setHasFetched] = useState(false);
  useEffect(() => {
    if (!hasFetched) {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get("code");
      if (code) {
        const getAccessTokenGithubAuthwithCode = getAccessTokenGithubAuth.bind(
          null,
          code as string
        );
        getAccessTokenGithubAuthwithCode();
        setHasFetched(true);
      } else {
        console.error("Authorization code is missing");
      }
    }
  }, [hasFetched]);

  return <div>Processing login...</div>;
}
