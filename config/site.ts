export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "LingoPilot - AI Language Learning",
  description:
    "Your AI language learning copilot that supercharges your language learning journey through comprehensive input-based learning and speaking practice.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },

    // TEST:ING
    {
      label: "Dashboard",
      href: "/dashboard",
    },

    // {
    //   label: "Pricing",
    //   href: "/pricing",
    // },
    // {
    //   label: "About",
    //   href: "/about",
    // },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",

    signin: "/handler/sign-in",
    signup: "/handler/sign-up",
  },
};
