# Astro Framework Comprehensive Reference

## Introduction to Astro

Astro is a modern web framework and static site builder designed for content-rich websites. It delivers **zero JavaScript by default**, sending only HTML and CSS to browsers unless interactive features are needed.

Astro follows an **"islands architecture"**, meaning interactive UI components ("islands") hydrate on the client only when necessary, preserving fast load times.

Key features of Astro include:

- **Component-based & framework-agnostic:** Astro uses reusable UI components and supports multiple popular frameworks (React, Vue, Svelte, Solid, etc.) in one project. Developers can mix and match frameworks as needed without additional setup.
- **Partial hydration for performance:** Static content is delivered first, and only interactive components are hydrated client-side. This selective hydration minimizes initial JavaScript and improves page speed.
- **Built-in Markdown/MDX support:** Astro treats Markdown as a first-class content format. Pages can be written in Markdown (and optionally MDX, with an integration) and include frontmatter for metadata. MDX allows embedding JSX components within Markdown content for interactive elements.
- **Automatic optimizations:** Astro automatically optimizes assets, bundles/minifies CSS and JS by default, and leverages Vite under the hood (fast dev server + HMR, tree-shaking for production builds).

Crucially, Astro began as a purely static site generator but now supports **Server-Side Rendering (SSR)** and hybrid rendering modes. This means you can choose to pre-render pages at build time or render on-demand per request: static generation for speed and SSR for dynamic content, while keeping shipped code lean.

## Setting Up an Astro Project

To start using Astro, you begin by creating a new project and installing dependencies:

- **Create a project:** Use the official starter CLI to scaffold a new project:
  ```bash
  npm create astro@latest
  # or
  pnpm create astro@latest
  ```
- **Install dependencies:** The starter installs Astro's packages and generates configuration. If starting from an empty project, install Astro via `npm install astro` (or use the starter template) and create an `astro.config.mjs`.
- **Project structure:** An Astro project typically has the following structure:
  - `src/pages/` - Pages (each `.astro`/`.md` file becomes a route) and API endpoints
  - `src/components/` - Reusable components (Astro components or framework components)
  - `public/` - Static assets (images, fonts, etc.) served as-is, accessible via root-relative URLs
  - `astro.config.mjs` - Astro configuration (site options, integrations, build output mode, etc.)
  - `package.json` - Dependencies and scripts (`dev`/`build`/`preview`)

After setup, the **development workflow** is straightforward:

- Use `npm run dev` (or `astro dev`) to start Astro's dev server with live reload (default: `http://localhost:4321`).
- During development, Astro compiles pages and components on the fly and provides error overlays/logs.
- Use `npm run build` (or `astro build`) to generate the production site. By default, this outputs a fully static site (HTML, CSS, assets) to the `dist/` directory.
- Use `astro preview` to test a built site locally. If SSR is enabled, `astro preview` runs a local server to simulate production.

Astro includes TypeScript support out of the box (Astro components can use TypeScript in their scripts), and provides rich CLI tooling for development and building.

## Pages, Components, and Routing

Astro's file-based routing makes it easy to create pages and endpoints. Any file created under `src/pages/` becomes a route in your site:

- **`.astro` pages:** Files with a `.astro` extension represent pages that output HTML. For example, `src/pages/index.astro` maps to `/`, and `src/pages/about.astro` maps to `/about`.
- **Markdown pages:** Content pages can be written in Markdown (`.md`). These are processed into HTML at build time and follow the same routing rules (e.g., `src/pages/blog/post1.md` becomes `/blog/post1`).
- **Dynamic routes:** Use `[param]` in filenames. For example, `src/pages/blog/[slug].astro` matches routes like `/blog/my-post` and makes the slug available to the page. Dynamic routes can also be used for API endpoints (e.g., `src/pages/api/[id].ts`).

Each Astro page or component file can consist of two parts:

1. **Frontmatter script** - An optional script section at the top, enclosed in `---` delimiters. In an `.astro` file, this is a TypeScript/JavaScript context that runs on the server (at build time for static sites, or on each request for SSR). Here you can import components, fetch data, define variables, and use logic.
2. **Template markup** - Following the frontmatter, the rest of the file is an HTML/JSX-like template. Astro's template syntax is similar to HTML, enhanced with the ability to embed JavaScript expressions (`{ ... }`) and use components.

Example:

```astro
---
import Layout from "../components/Layout.astro";

const data = await fetch("https://example.com/api.json").then((res) => res.json());
const title = "Welcome";
---

<Layout>
  <h1>{title}</h1>
  <p>Data count: {data.count}</p>
</Layout>
```

In Markdown (`.md`) files, the frontmatter section is written in YAML or TOML instead, to define static variables like `title`, `description`, `tags`, etc. For example:

```yaml
---
title: "MyBlogPost"
author: "Alice"
tags: ["astro", "learning"]
layout: "../layouts/BlogLayout.astro"
---
```

Astro files always produce HTML. When you use a component (Astro or framework) inside an Astro page, it renders to static HTML by default. Non-interactive components add zero client-side JavaScript.

**Layouts:** Astro supports layouts to avoid repetition. A layout is just an Astro component that wraps content. Markdown pages can specify a layout in their frontmatter to automatically use a layout component for rendering.

**Routing rules:**

- Nested folders under `src/pages/` translate to nested URL paths. For example, `src/pages/docs/install.astro` becomes `/docs/install`.
- `index.astro` or `index.md` in any folder becomes the root of that folder's route (e.g., `src/pages/blog/index.astro` is `/blog/`).
- `.astro`, `.md`, or `.mdx` (with MDX integration) produce HTML pages. Other extensions like `.json.ts` or `.xml.ts` can be used to create endpoints that output data or other formats.

Astro injects useful globals in page frontmatter (e.g., `Astro.request` in SSR or `Astro.props` for component props), though basic content pages often don't need them.

## Working with Components and UI Frameworks

Astro components (`.astro`) are framework-agnostic and can integrate components from other UI frameworks seamlessly. To use a React, Svelte, Vue, or Solid component inside an Astro page:

1. **Install the integration:** Add the appropriate integration for the framework (e.g., `@astrojs/react`, `@astrojs/svelte`, etc.). For example:
   ```bash
   npx astro add react
   ```
   This installs and configures the integration and updates `astro.config.mjs`.
2. **Import and use the component:** In your Astro component frontmatter, import the framework component, then include it in the Astro template:
   ```astro
   ---
   import MyReactWidget from "../components/MyReactWidget.jsx";
   import MySvelteWidget from "../components/MySvelteWidget.svelte";
   ---

   <h2>Dashboard</h2>
   <MyReactWidget />
   <MySvelteWidget />
   ```
   Astro will render these components on the server to static HTML by default. No client JavaScript is sent yet.
3. **Hydrate for interactivity:** To make a framework component interactive in the browser, Astro provides client directives (HTML attributes) that determine when to hydrate the component:
   - `client:load` - Hydrate as soon as the page loads (eagerly)
   - `client:idle` - Hydrate when the browser is idle
   - `client:visible` - Hydrate when the component becomes visible in the viewport
   - `client:media="(query)"` - Hydrate when a specified media query matches
   - `client:only="framework"` - Client-only mode: do not SSR the component; only render it on the client

Examples:

- Hydrate a React counter when it scrolls into view: `<Counter client:visible />`
- Hydrate a modal immediately on load: `<Modal client:load />`

**Multiple frameworks:** Astro allows using multiple frameworks side by side in the same `.astro` file. The framework is auto-detected by file extension (e.g., `.jsx` for React, `.svelte` for Svelte). If multiple components use the same framework, the runtime script is loaded only once on the page. Only `.astro` files can host mixed frameworks together.

**Passing data:** You can pass props from Astro to framework components like in native usage. For hydrated components, Astro serializes props to JSON to send to the client, so props must be serializable (no functions or complex class instances).

By leveraging integrations, Astro treats UI framework components as islands of interactivity: non-interactive parts remain static and avoid the cost of the framework runtime.

## Content Management and Data in Astro

Astro provides multiple ways to manage and fetch data: **Markdown/MDX files, Content Collections, remote data fetching**, and an integrated database option.

### Markdown and MDX Content

Astro includes built-in Markdown support. Any `.md` files in `src/pages/` are treated as pages and rendered to HTML, applying a layout if specified. Markdown files can include frontmatter for metadata; those properties are available to layouts via `Astro.props.frontmatter` (or by importing the Markdown as content).

**MDX** (Markdown with JSX) is supported via the official `@astrojs/mdx` integration. After installing it, you can create `.mdx` files and mix Markdown with interactive components.

Astro's Markdown pipeline supports code-fence syntax highlighting and can be extended with custom remark/rehype plugins if needed.

### Content Collections

For organizing lots of content (blogs, docs, products, etc.), Astro provides **Content Collections**. Content collections give you a type-safe way to structure content and query it.

**Defining collections:** Create a `src/content/config.*` file where you export a collection definition with a schema (via Zod) and a loader:

```ts
// src/content/config.ts
import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "blog/*.md" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    draft: z.boolean().optional(),
  }),
});

const product = defineCollection({
  loader: file("data/products.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
  }),
});

export const collections = { blog, product };
```

**Using collections:** Query content in your Astro pages using `getCollection()`:

```ts
import { getCollection } from "astro:content";

const posts = await getCollection("blog");
```

This returns an array of entries; each entry contains validated `data` (frontmatter) and the entry body. Content collections keep content structured and make it safer to work with frontmatter fields via types.

### Fetching Remote Data

Astro supports using the Fetch API in components to retrieve data from external sources. In any Astro frontmatter script, you can call `fetch()` to request an API or endpoint. For example:

```ts
// Inside an Astro component frontmatter
const res = await fetch("https://api.example.com/data");
const json = await res.json();
```

Because Astro components run on the server during build (or per request in SSR), this fetch happens in a Node.js context. In hydrated framework components, `fetch` runs in the browser; for initial page-load data, it's common to fetch in Astro frontmatter so the HTML is pre-rendered with that data.

### Astro DB (Database Integration)

Astro includes an optional integrated database solution called **Astro DB**. It's a fully-managed SQLite (libSQL)-compatible database that works locally during development (stored in `.astro/content.db`) and can sync to a remote database for production.

To use it, install the official integration (`npx astro add db`). This generates a `db/config.ts` file where you define your database schema using a code-first approach:

- Define **tables** using `defineTable()` and column definitions.
- Columns can be text, number, boolean, date, JSON, etc., with constraints (primary keys, references, etc.).
- Export the config with `defineDb()` listing all tables.

Astro generates TypeScript types and a query interface from this config. During development, a local database is created automatically and can be seeded with initial data via `db/seed.ts`.

Example query:

```ts
import { Comment, db } from "astro:db";

const allComments = await db.select(Comment);
```

For deployment, Astro DB can connect to any libSQL-compatible database (for example, Turso or Cloudflare D1) to persist data in production.

## Server-Side Features and Hybrid Rendering

Astro's default build outputs a static site (SSG). For dynamic behavior, Astro supports **Server-Side Rendering (SSR)** on a per-route or whole-site basis, as well as other server capabilities like API routes, actions, sessions, and middleware.

### Enabling SSR and Adapters

To use SSR in Astro, add a **server adapter integration**. An adapter connects Astro to a specific hosting environment (Node, Vercel, Netlify, Cloudflare, etc.).

Install an adapter via the CLI (for example, `npx astro add netlify`). This installs the package and updates `astro.config.mjs`. Once an adapter is added, your build can generate server output.

Even with an adapter, Astro still pre-renders all pages by default unless told otherwise. Two common ways to enable on-demand SSR are:

- **Per-route SSR (hybrid):** On a specific page or endpoint, export `prerender = false` to opt that route out of static generation. The route is rendered on demand at runtime; all other routes remain fully static.
- **Full SSR mode:** Set `output: "server"` in `astro.config.mjs` (and include an adapter). All routes become dynamic by default.

With SSR enabled, Astro produces a server bundle (a Node app or a set of function files) instead of static HTML for those routes.

**Dynamic capabilities in SSR:** Server-rendered pages can access incoming request data (headers/cookies) via `Astro.request`, personalize content per request, and safely use secret keys from environment variables.

Astro also supports **HTML streaming** in SSR: sending chunks of HTML as they're ready to improve time-to-first-byte for pages with slower data sources.

### Server Islands (Deferred Components)

**Server Islands** allow you to defer rendering of certain parts of the page until after the initial response. By adding the `server:defer` directive to an Astro component, that component is not included in the initial HTML; it is rendered separately and injected later.

Typical usage:

- Enable SSR and install an adapter.
- Mark a component with `<Component server:defer />`.
- Optionally provide fallback UI via a `slot="fallback"` child so Astro can render a placeholder until the real content is ready.

Deferred components can use server capabilities (fetching data, reading cookies via `Astro.cookies`, etc.). Astro splits the deferred island out and serves it via a special endpoint (e.g., `/_server-islands/ComponentName`). The client fetches these endpoints and swaps the fallback with the real content.

Astro encrypts props passed to server islands and supports caching via HTTP headers, enabling CDN/browser caching for the fetched island content.

### API Endpoints (Serverless Functions)

Besides pages, Astro allows creating API endpoints (often called serverless functions or API routes). An endpoint is a file in `src/pages/` that exports HTTP method functions instead of a component (for example, `src/pages/api/data.json.ts` exporting `GET` and `POST`).

**Defining endpoints:** In an endpoint file, export functions named after HTTP methods (`GET`, `POST`, `PUT`, etc.). Each function receives a context argument with details about the request (`params`, `request`, etc.).

Endpoints can return:

- A `Response` object (Fetch API), giving full control over status/headers/body.
- Convenience return values (like objects/strings) that Astro serializes into a proper HTTP response.

Example:

```ts
// src/pages/api/users/[id].ts
export async function GET({ params }: { params: { id: string } }) {
  const user = await getUserFromDB(params.id);

  if (!user) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
```

**Static vs SSR:** In a static build, a `GET` endpoint can execute once during `astro build` to produce a static output file. To make endpoints dynamic (run on every request), enable SSR for that route (e.g., export `prerender = false` or use `output: "server"`).

### Actions (Type-Safe Server Functions)

Astro **Actions** are a higher-level abstraction for client-server communication (for example: form handling). An action is a server function with a generated client interface, so you can call it without manually wiring up `fetch()` and endpoint files.

**Defining actions:** Create `src/actions/index.ts` (and optionally additional files) and export a `server` object with actions defined via `defineAction()`. Each action includes an input schema (often via Zod) and a handler function that runs on the server:

```ts
// src/actions/index.ts
import { defineAction } from "astro:actions";
import { z } from "astro:zod";

export const server = {
  addMessage: defineAction({
    input: z.object({ text: z.string() }),
    handler: async ({ text }) => {
      const id = await db.insertMessage(text);
      return { id, text };
    },
  }),
};
```

**Using actions:** Import actions from `astro:actions` in client-side code and call them directly. Astro handles sending the request, running the handler, returning the response, and type-checking based on the schema.

Actions can integrate with HTML forms as well, making server-side form handling easier without writing separate API routes.

### Sessions and Authentication

When building dynamic applications, you often need to maintain user session state (login, cart, preferences, etc.). Astro provides a **Sessions** API to store data on the server across requests.

- **Session data:** Stored server-side (memory, database, etc.) and identified via a cookie with a session ID.
- **Enabling sessions:** Some adapters auto-enable a default session store; others require specifying a `session.driver` in `astro.config.mjs`. For example:
  ```ts
  import { defineConfig } from "astro/config";

  export default defineConfig({
    session: { driver: "redis" },
  });
  ```
- **Using sessions in pages:** In an SSR Astro page/component, access the session via `Astro.session`:
  ```astro
  ---
  const cart = (await Astro.session.get("cart")) ?? [];
  cart.push("apple");
  await Astro.session.set("cart", cart);
  ---
  ```
  If a page is prerendered (static), `Astro.session` would be `undefined`.
- **Using sessions in endpoints/actions:** Session data is also available in API routes, middleware, and action handlers via the request context (e.g., `context.session.get("user")`).

By default session values are untyped (`any`), but you can add types by declaring an `App.SessionData` interface (for example in `src/env.d.ts`) that defines allowed keys and their types.

### Middleware

Astro supports middleware functions that run on every request (in SSR mode) before reaching your page or endpoint. Middleware can be used for authentication checks, logging, or modifying the request/response.

Create `src/middleware.ts` and export an `onRequest` function using `defineMiddleware()` from `astro:middleware`:

```ts
// src/middleware.ts
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  if (url.pathname.startsWith("/admin")) {
    const user = await context.session.get("user");
    if (!user) return new Response("Unauthorized", { status: 401 });
  }

  return next();
});
```

Middleware runs only in SSR contexts and may have adapter-specific limitations (for example, some edge environments may not support it).

## Integrations and Plugins

Astro's integration system extends functionality: adding UI framework support, SSR adapters, and other enhancements. Official integrations include:

- **UI framework renderers:** React, Preact, Svelte, Vue, Solid, Alpine.js, etc.
- **SSR adapters:** Node.js, Vercel, Netlify, Cloudflare, and others for server-rendered deployment targets.
- **Miscellaneous:** MDX (`@astrojs/mdx`), sitemap generation (`@astrojs/sitemap`), Partytown, Astro DB (`@astrojs/db`), and more.

There is also a community ecosystem of integrations for CMS support, search indexing, and other features.

**Adding integrations:** Use the CLI wizard:

```bash
npx astro add react tailwind sitemap
```

This updates `astro.config.mjs` and installs required packages. Example config snippet:

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [react(), sitemap()],
});
```

If you need to remove an integration, remove it from `integrations` and uninstall the package.

**Vite plugins:** Since Astro is built on Vite, you can use Vite plugins directly if needed by configuring the `vite` key in `astro.config.mjs`:

```js
export default defineConfig({
  vite: {
    plugins: [require("vite-plugin-example")({ /* options */ })],
  },
});
```

## Deployment of Astro Sites

Astro can generate pure static assets or server-rendered apps, so deployment depends on the chosen rendering mode.

**Static (pre-rendered) deployment:** Astro's default static build outputs a set of files in `dist/`. You can host these on any static hosting service or CDN (Netlify, GitHub Pages, Vercel static, Cloudflare Pages static, S3, etc.). Deployment is typically as simple as uploading `dist/`.

**SSR deployment:** If SSR is enabled (adapter installed and dynamic routes in use), deployment involves a server or serverless functions; the details depend on the adapter:

- **Node adapter (`@astrojs/node`):** Produces a Node server entry point. Run `astro build` and then run the generated `server/entry.mjs` with Node (or deploy via Docker/VPS).
- **Vercel adapter:** Integrates with Vercel serverless functions. Deploy via the Vercel CLI or Git integration.
- **Netlify adapter:** Builds a Netlify Functions bundle; deploy via Netlify CLI or Git integration.
- **Cloudflare adapter:** Targets Workers/Pages Functions and bundles output for the Workers environment.
- **Others:** Community adapters exist for platforms like Fly.io and Deno Deploy.

**Hybrid deployment:** If only some routes are SSR (`prerender = false` on a few routes), Astro outputs a mix of static files for pre-rendered pages and a functions/server bundle for dynamic ones; adapters handle the combined output for deployment.
