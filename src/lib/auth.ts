import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db";
import Resend from "next-auth/providers/resend";
import { sendVerificationRequest } from "./authSendRequest";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "noreply@pay.cypheir.xyz",
      sendVerificationRequest({ identifier: email, url, provider: { from } }) {
        const apiKey = process.env.AUTH_RESEND_KEY;
        if (!from || !apiKey) return;

        return sendVerificationRequest({
          identifier: email,
          url,
          provider: { apiKey, from },
          theme: {
            brandColor: "#346df1",
            buttonText: "Sign in",
          },
        });
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
