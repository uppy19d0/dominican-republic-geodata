import assert from "node:assert/strict";
import { createRequire } from "node:module";

const esm = await import("../dist/index.js");
assert.equal(esm.PROVINCES.length, 32);
assert.equal(esm.findProvince("dajabon")?.id, "DO-05");

const require = createRequire(import.meta.url);
const commonJs = require("../dist/index.cjs");
assert.equal(commonJs.REGIONS.length, 10);
assert.equal(commonJs.findRegion("Ozama")?.id, "10");

console.log("Package imports passed for ESM and CommonJS.");
