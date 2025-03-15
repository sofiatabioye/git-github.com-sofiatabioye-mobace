import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "./db";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await db.user.findUnique({ where: { email: credentials.email } }) as AdapterUser;

        if (!user) {
          throw new Error("Incorrect email and/or password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // When signing in, attach the user id if available.
      if (user && "id" in user) {
        token.sub = user.id;
        if ("firstname" in user && "lastname" in user) {
          token.name = `${user.firstname} ${user.lastname}`;
        }
      }
      return token;
    },
    async session({ session, token }: {session: any, token: any}) {
      session.user.id = token.sub; // Attach user ID to session
      return session;
    },
  },
};

// ✅ Correctly fetch session using request context
export const getAuthSession = async () => {
  return await getServerSession(authOptions);
};
