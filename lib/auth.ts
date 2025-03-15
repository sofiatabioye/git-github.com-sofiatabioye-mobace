import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { AdapterUser } from "next-auth/adapters";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await db.user.findUnique({ where: { email: credentials.email } });
        if (!user) {
          throw new Error("User not found");
        }

        if (!user.emailVerified) {
          throw new Error("Email not verified");
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }
        console.log(user)

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstname} ${user.lastname}`,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: { strategy: "jwt" as const },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.name = user.name;
        console.log("JWT callback - new token:", token);
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Add the name from token to the session object
      if (session.user) {
        console.log(session, token)
        if (token.sub) {
          const dbUser = await db.user.findUnique({ where: { id: token.sub } });
          if (dbUser) {
            session.user.name = `${dbUser.firstname} ${dbUser.lastname}`;
          }
        }
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
