"use server";

import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/libs/db";

export const signUp = async (data: any) => {
  // console.log(data);
  const { email, password, name, username } = data;
  if (!email || !name || !password) {
    return {
      error: "Missing Info",
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      username,
      email,
      hashedPassword,
    },
  });
  return {
    success: "User created",
  };
};
