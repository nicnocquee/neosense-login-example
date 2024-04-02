"use client";

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
import { loginAction } from "./login-action";
import React from "react";

export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to dummy BGN Gio dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          action={async (data) => {
            console.log("data", data);
            setIsLoading(true);
            const result = await loginAction(data);

            if (result.type === "LOGIN_SUCCESS" && result.payload.redirect) {
              window.location.href = result.payload.redirect;
            } else if (result.type === "LOGIN_FAILED" && result.payload.error) {
              setError(result.payload.error);
            } else {
              setError("Unknown error");
            }
            setIsLoading(false);
          }}
        >
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                disabled={isLoading}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                name="password"
                disabled={isLoading}
                id="password"
                type="password"
                required
              />
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
              Login
            </Button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
