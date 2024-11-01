import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    home: "/",

    afterSignIn: "/app",
    afterSignUp: "/app",
    afterSignOut: "/",
  },
});
