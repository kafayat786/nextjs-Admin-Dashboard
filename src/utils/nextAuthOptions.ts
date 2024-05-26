import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", name: "email", type: "email" },
        password: { label: "Password", name: "password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials,'credentials');
        
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }: any) {
      if (user) {
        // token.accessToken = user.accessToken;
        token.user = user.user;
      }

      return token;
    },

    async session({ token, user, session }: any) {
      // if (token.accessToken) {
        // session.accessToken = token.accessToken;
        session.user = token.user;
        return session;
      // }

      // return null;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 1,
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default nextAuthOptions;
