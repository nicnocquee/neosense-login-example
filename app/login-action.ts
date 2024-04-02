"use server";

import "server-only";

import { z } from "zod";
import crypto from "crypto";

export const loginAction = async (data: FormData) => {
  const { email, password } = z
    .object({
      email: z.string().email(),
      password: z.string().min(1),
    })
    .parse({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });

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

  const timestamp = Date.now().toString();
  const userId = process.env.USER_ID || "";
  const signature = createSignature(timestamp, userId);

  const neosenseLoginUrl = `${process.env.NEOSENSE_BASE_URL}/api/integration/sso?timestamp=${timestamp}&user_id=${userId}&signature=${signature}&user_email=${email}`;

  return {
    type: "LOGIN_SUCCESS",
    payload: {
      redirect: neosenseLoginUrl,
    },
  };
};

const createSignature = (timestamp: string, userId: string) => {
  const privateKeyBase64 = process.env.PRIVATE_KEY || "";

  if (!privateKeyBase64) {
    throw new Error("Private key not found");
  }

  const privateKey = Buffer.from(privateKeyBase64, "base64");

  const data = `${timestamp},${userId}`;

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(data);
  const signature = signer.sign(privateKey, "base64");

  return signature;
};
