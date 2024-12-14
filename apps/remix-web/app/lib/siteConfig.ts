export const siteConfig = {
  links: {
    signin: "/login",
    onboarding: "/onboarding",
    dashboard: "/dashboard",

    modes: {
      characterConvo: "/dashboard/character-convo",
      characterConvoSession: (id: number) => `/dashboard/character-convo/${id}`,
    },

    navItems: [
      {
        label: "Features",
        href: "#",
      },
      {
        label: "Pricing",
        href: "#",
      },
      {
        label: "Docs",
        href: "#",
      },
    ],

    dashboardNavItems: [
      {
        label: "Modes",
        href: "/dashboard",
      },
    ],
  },
};
