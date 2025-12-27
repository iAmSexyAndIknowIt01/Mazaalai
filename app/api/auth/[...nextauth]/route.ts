// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "user@test.com" &&
          credentials.password === "123456"
        ) {
          return {
            id: "1",
            name: "Test User",
            email: "user@test.com",
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt", // ✅ Одоо type зөв танигдана
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
