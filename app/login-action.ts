"use server";

import "server-only";

import { z } from "zod";
import crypto from "crypto";

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

  const timestamp = Math.floor(new Date().getTime() / 1000);
  // For demo purposes, we're using a hardcoded userId value from the env variables.
  const userId = process.env.USER_ID || "";
  const signature = createSignature(`${timestamp}`, userId);

  // generate the neosense login url
  const neosenseLoginUrl = `${
    process.env.NEOSENSE_BASE_URL
  }/api/integration/sso?timestamp=${timestamp}&user_id=${userId}&signature=${encodeURIComponent(
    signature
  )}&user_email=${email}`;

  return {
    type: "LOGIN_SUCCESS",
    payload: {
      redirect: neosenseLoginUrl,
    },
  };
};

const createSignature = (timestamp: string, userId: string) => {
  // For demo purposes, we're using a hardcoded value of the private key from the env variables.
  const privateKeyBase64 = process.env.PRIVATE_KEY || ""; // base64 encoded private key

  if (!privateKeyBase64) {
    throw new Error("Private key not found");
  }

  // The private key is base64 encoded, so we need to decode it first.
  const privateKey = Buffer.from(privateKeyBase64, "base64").toString();

  const data = `${timestamp},${userId}`;

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(data);
  const signature = signer.sign(privateKey, "base64");

  return signature;
};
