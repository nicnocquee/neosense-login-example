"use server";

import { cookies } from "next/headers";
import "server-only";

import { z } from "zod";

export const loginAction = async (data: FormData) => {
  // validate the form data
  const { email, password } = z
    .object({
      email: z.string().email(),
      password: z.string().min(1),
    })
    .parse({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });

  // Check if the email and password are valid. For demo purposes, we're using hardcoded email and password values from the env variables.
  if (
    email !== process.env.USER_EMAIL ||
    password !== process.env.USER_PASSWORD
  ) {
    return {
      type: "LOGIN_FAILED",
      payload: {
        error: "Invalid credentials",
      },
    };
  }

  cookies().set("email", email);

  return {
    type: "LOGIN_SUCCESS",
    payload: {
      redirect: "/dashboard",
    },
  };
};
