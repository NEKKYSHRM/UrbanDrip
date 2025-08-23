import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { dbconnect } from "@/db/index.js";
import { User } from "@/models/user.model.js";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      await dbconnect();

      if (user) {
        let existingUser = await User.findOne({ email: token.email });

        if (!existingUser) {
          const newUser = await User.create({
            name: user.name || "",
            email: user.email,
            avatar: user.image,
            googleId: user.id, // optional
            location: {},
            role: "customer", // ✅ default role
          });

          existingUser = newUser;
        }

        // ✅ Add role to token
        token._id = existingUser._id;
        token.avatar = existingUser.avatar;
        token.role = existingUser.role;
      }
      return token;
    },

    async session({ session, token }) {
      // ✅ Pass role & other fields to client
      session.user._id = token._id;
      session.user.avatar = token.avatar;
      session.user.role = token.role;

      return session;
    },
  },

  pages: {
    signIn: "/signup",
  },

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
