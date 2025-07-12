import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          name: "Pooja Kavlekar",
          email: "pooja@gmail.com",
          token: "accesstoken123",
        };

        if (
          credentials?.email === "pooja@gmail.com" &&
          credentials?.password === "1234"
        ) {
          return user;
        }

        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token; // Add token to JWT
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // Expose token in session
      return session;
    }
  },
  pages: {
    signIn: "/login", // optional: your custom login page
  },
  secret: process.env.NEXTAUTH_SECRET, // Add in .env.local
});

export { handler as GET, handler as POST };