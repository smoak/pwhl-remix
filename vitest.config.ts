import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.test.ts", "**/test.tsx"],
    globals: true,
    environment: "jsdom",
    setupFiles: ["config//vitest.setup.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["app/**"],
      exclude: [
        "app/root.tsx",
        "app/entry.client.tsx",
        "app/entry.worker.ts",
        "app/routes/**",
      ],
    },
  },
});
