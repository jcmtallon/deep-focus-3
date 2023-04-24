import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
    // Build Chrome Extension
    crx({ manifest }),
    // Applies tsconfig file baseUrl configuration to Vite
    tsconfigPaths(),
  ],
});
