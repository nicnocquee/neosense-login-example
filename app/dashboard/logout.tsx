"use client";

import { Button } from "@/components/ui/button";
import { logoutAction } from "./logout-action";

export default function Logout() {
  return (
    <form
      action={async () => {
        const result = await logoutAction();

        if (result.type === "LOGOUT_SUCCESS" && result.payload.redirect) {
          window.location.href = result.payload.redirect;
        }
      }}
    >
      <Button variant={"ghost"} type="submit">
        Logout
      </Button>
    </form>
  );
}
