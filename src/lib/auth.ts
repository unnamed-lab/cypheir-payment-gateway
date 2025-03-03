import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db";
import Resend from "next-auth/providers/resend";
import { sendVerificationRequest } from "./authSendRequest";

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  logger: {
    error(code, ...message) {
      console.error(code, message);
    },
    warn(code, ...message) {
      console.warn(code, message);
    },
    debug(code, ...message) {
      console.debug(code, message);
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: "noreply@pay.cypheir.xyz",
      ...(process.env.NODE_ENV === "development"
        ? {
            sendVerificationRequest: async ({ identifier, url, provider }) => {
              const { host } = new URL(url);
              console.log(`
      ----------------------------------
      From: ${provider.from}
      To: ${identifier}
      Subject: Sign in to ${host}

      Sign in URL:

      ${url}
      ----------------------------------
        `);
            },
          }
        : {
            sendVerificationRequest({
              identifier: email,
              url,
              provider: { from },
            }) {
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
    }),
  ],
});
