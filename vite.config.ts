import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
      sourcemap: true,
    },
    // in addition to the default VITE_ prefix, also support REACT_APP_ and CREDITCHAIN_ prefixed environment variables for compatibility with legacy create-react-app and CreditChain-specific settings.
    envPrefix: ["VITE_", "REACT_APP_", "CREDITCHAIN_"],
    plugins: [react(), svgr()],

    preview: {
      port: 3000,
      allowedHosts: [
        "localhost",
        "explorer.creditchain.org",
        "scan.creditchain.org",
      ],
    },
  };
});
