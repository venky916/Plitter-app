"use server";

import { auth } from "@/auth";
import { getUserByEmail } from "@/data/user";

const getCurrentUser = async () => {
  try {
    const session = await auth();
    const email = session?.user?.email;
    console.log(session,"session");

    if (email) {
      const currentsUser = await getUserByEmail(email);
      return currentsUser;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;
