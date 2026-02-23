import "./load-env.js";
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ["@travel-guide/ui"],
};

export default config;
