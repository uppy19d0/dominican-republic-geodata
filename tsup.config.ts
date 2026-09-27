import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    provinces: "src/provinces.ts",
    regions: "src/regions.ts",
    metadata: "src/metadata.ts",
    municipalities: "src/municipalities.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  minify: false,
  target: "es2020",
});
