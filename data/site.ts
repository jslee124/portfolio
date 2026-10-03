export const site = {
  name: "Mori",
  description:
    "Software engineer building backend systems, developer tools, and AI agents with TypeScript, Go, and Python.",
  github: "https://github.com/jslee124",
  // Add your public contact details here. Empty values are not rendered.
  email: "",
  linkedin: "",
  // Set NEXT_PUBLIC_SITE_URL to your deployed origin for canonical URLs and sitemap.
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, ""),
};

export const technologies = [
  { category: "Languages", items: ["TypeScript", "Go", "Python"] },
  { category: "Frontend", items: ["React", "Next.js"] },
  { category: "Backend", items: ["Node.js", "PostgreSQL", "Redis"] },
  { category: "Infrastructure & tools", items: ["Docker", "Git", "Linux"] },
];
