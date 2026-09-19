import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  DATASET_METADATA,
  findProvince,
  findRegion,
  getProvincesByRegion,
  isProvinceId,
  isRegionId,
  normalizePlaceName,
  PROVINCES,
  REGIONS,
} from "../src/index";

describe("territorial dataset", () => {
  it("contains 10 regions and 32 unique provinces", () => {
    assert.equal(REGIONS.length, 10);
    assert.equal(PROVINCES.length, 32);
    assert.equal(new Set(PROVINCES.map((province) => province.id)).size, 32);
    assert.ok(PROVINCES.every((province) => isRegionId(province.regionId)));
  });

  it("uses stable province and region identifiers", () => {
    assert.equal(isProvinceId("DO-01"), true);
    assert.equal(isProvinceId("DO-99"), false);
    assert.equal(isRegionId("10"), true);
    assert.equal(isRegionId("11"), false);
  });

  it("finds places by names, aliases, codes and accents", () => {
    assert.equal(findProvince("san jose de ocoa")?.id, "DO-31");
    assert.equal(findProvince("San Juan de la Maguana")?.id, "DO-22");
    assert.equal(findProvince("DN")?.id, "DO-01");
    assert.equal(findProvince("06")?.name, "Duarte");
    assert.equal(findRegion("metropolitana")?.id, "10");
    assert.equal(normalizePlaceName("  Elías---Piña  "), "elias pina");
  });

  it("returns provinces by region id or name", () => {
    const byId = getProvincesByRegion("01");
    const byName = getProvincesByRegion("Cibao Norte");
    assert.deepEqual(byName, byId);
    assert.ok(byId.some((province) => province.id === "DO-25"));
    assert.deepEqual(getProvincesByRegion("unknown"), []);
  });

  it("includes explicit source metadata", () => {
    assert.equal(DATASET_METADATA.countryCode, "DO");
    assert.equal(DATASET_METADATA.referenceYear, 2021);
    assert.match(DATASET_METADATA.sourceUrl, /^https:\/\//);
  });
});
