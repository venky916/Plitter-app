import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials: any) {
        const { email, password } = credentials;
        // console.log(email, password);

        const user = await getUserByEmail(email);
        if (!user || !user.hashedPassword) return null;
        // console.log(user);

        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        // console.log(passwordsMatch);

        if (passwordsMatch) return user;

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
