import regionData from "./data/regions.json";
import { matchesPlaceName } from "./normalize";
import type { Region, RegionId } from "./types";

export const REGIONS = Object.freeze(
  regionData.map((region) => Object.freeze(region)),
) as readonly Region[];

export const REGION_IDS = Object.freeze(
  REGIONS.map((region) => region.id),
) as readonly RegionId[];

export const REGION_BY_ID = Object.freeze(
  Object.fromEntries(REGIONS.map((region) => [region.id, region])),
) as Readonly<Record<RegionId, Region>>;

export function isRegionId(value: string): value is RegionId {
  return Object.prototype.hasOwnProperty.call(REGION_BY_ID, value);
}

export function getRegion(id: RegionId): Region {
  return REGION_BY_ID[id];
}

export function findRegion(query: string): Region | undefined {
  return REGIONS.find((region) =>
    matchesPlaceName(query, [region.id, region.name, ...region.aliases]),
  );
}
