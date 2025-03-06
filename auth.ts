import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./libs/db";
import { getUserById } from "./data/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
