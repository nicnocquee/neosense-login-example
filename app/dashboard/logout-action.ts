"use server";
import "server-only";
import { cookies } from "next/headers";

export const logoutAction = async () => {
  cookies().delete("email");
  return {
    type: "LOGOUT_SUCCESS",
    payload: {
      redirect: "/",
    },
  };
};
