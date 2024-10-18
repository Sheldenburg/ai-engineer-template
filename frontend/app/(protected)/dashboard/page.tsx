"use client";

import React from "react";
import { useUser } from "@/lib/context/userContext";

function Page() {
  const user = useUser();
  return (
    <div className="pl-8 pt-6">
      <h1 className="text-2xl">Hi, {user?.email} 👋🏼</h1>
      <h3>Welcome back, nice to see you again!</h3>
    </div>
  );
}

export default Page;
