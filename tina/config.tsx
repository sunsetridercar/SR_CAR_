import { defineConfig } from "tinacms";
import nextConfig from '../next.config'

import Global from "./collection/global";
import Page from "./collection/page";

const config = defineConfig({
  telemetry: 'disabled',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH || // override explicite
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // branche Vercel
    process.env.HEAD || // branche Netlify
    "main", // fallback par défaut
  token: process.env.TINA_TOKEN!,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
    basePath: nextConfig.basePath?.replace(/^\//, '') || '', // The base path of the app (could be /blog)
  },
  schema: {
    collections: [Page, Global],
  },
});

export default config;
