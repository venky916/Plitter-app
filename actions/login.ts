"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (data: any) => {
  console.log(data, "login");
  const { email, password } = data;

  try {
    const user = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    // console.log(user);

    return {
      success: user,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid Credentials",
          };

        default:
          return {
            error: "Something went Wrong",
          };
      }
    }
    throw error;
  }
};
