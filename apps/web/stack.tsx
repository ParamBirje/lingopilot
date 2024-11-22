import "server-only";

import { StackServerApp } from "@stackframe/stack";
import { siteConfig } from "./config/site";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    home: "/",

    afterSignIn: siteConfig.links.dashboard,
    afterSignUp: siteConfig.links.dashboard,
    afterSignOut: siteConfig.links.signin,
  },
});
