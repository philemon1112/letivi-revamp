

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap() {
  // Example: dynamic route data from an API or DB
  const posts = await fetch(
    `https://api.letivi.com/api/v1/explore/posts?search=&page=1&limit=1000`,
    {
      method: "GET", // or 'POST', 'PUT', etc.
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "letivi-2023-v1",
        "x-api-secret": "s0meR3ndomP@$$Word",
      },
    },
  ).then((res) => res.json());

  const eventWorkspaces = await fetch(
    `https://api.letivi.com/api/v1/events?search=&page=1&limit=1000`,
    {
      method: "GET", // or 'POST', 'PUT', etc.
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "letivi-2023-v1",
        "x-api-secret": "s0meR3ndomP@$$Word",
      },
    },
  ).then((res) => res.json());

  const businessWorkspaces = await fetch(
    `https://api.letivi.com/api/v1/businesses?search=&page=1&limit=1000`,
    {
      method: "GET", // or 'POST', 'PUT', etc.
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "letivi-2023-v1",
        "x-api-secret": "s0meR3ndomP@$$Word",
      },
    },
  ).then((res) => res.json());

  const projectWorkspaces = await fetch(
    `https://api.letivi.com/api/v1/projects?search=&page=1&limit=1000`,
    {
      method: "GET", // or 'POST', 'PUT', etc.
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "letivi-2023-v1",
        "x-api-secret": "s0meR3ndomP@$$Word",
      },
    },
  ).then((res) => res.json());

  const professionals = await fetch(
    `https://api.letivi.com/api/v1/users?search=&page=1&limit=1000`,
    {
      method: "GET", // or 'POST', 'PUT', etc.
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "letivi-2023-v1",
        "x-api-secret": "s0meR3ndomP@$$Word",
      },
    },
  ).then((res) => res.json());

  const eventsRoutes = eventWorkspaces.data.map((post: { slug: string }) => ({
    url: `${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 1,
  }));

  const projectsRoutes = projectWorkspaces.data.map(
    (post: { slug: string }) => ({
      url: `${post.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    }),
  );

  const businessRoutes = businessWorkspaces.data.map(
    (post: { slug: string }) => ({
      url: `${post.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    }),
  );

  const professionalsRoutes = professionals.data.map((user: any) => ({
    url: `${user?.profile?.profile}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postRoutes = posts?.data.map((post: { slug: string }) => ({
    url: `${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://letivi.com/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://letivi.com/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://letivi.com/signup",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://letivi.com/explore",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://letivi.com/workspaces",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://letivi.com/professionals",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://letivi.com/nature",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://letivi.com/culture",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://letivi.com/lifestyle",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://letivi.com/animals",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://letivi.com/career",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://letivi.com/faqs",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://letivi.com/about",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://letivi.com/contact",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://letivi.com/support",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://letivi.com/partner",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://letivi.com/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://letivi.com/forgotpassword",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...postRoutes,
    ...professionalsRoutes,
    ...eventsRoutes,
    ...projectsRoutes,
    ...businessRoutes,
  ];
}
