"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { loginAction } from "./login-to-neosense-action";

export default function LoginToNeosense({ email }: { email: string }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  return (
    <form
      className="flex flex-col space-y-4"
      action={async (data) => {
        setIsLoading(true);
        const result = await loginAction(data);

        if (result.type === "LOGIN_SUCCESS" && result.payload.redirect) {
          window.location.href = result.payload.redirect;
        } else {
          setError("Unknown error");
        }
        setIsLoading(false);
      }}
    >
      <input type="hidden" name="email" value={email} />
      <Button disabled={isLoading} type="submit">
        Login to Neosense
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
