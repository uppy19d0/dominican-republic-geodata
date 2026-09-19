import provinceData from "./data/provinces.json";
import { matchesPlaceName } from "./normalize";
import { findRegion, isRegionId } from "./regions";
import type { Province, ProvinceId, RegionId } from "./types";

export const PROVINCES = Object.freeze(
  provinceData.map((province) => Object.freeze(province)),
) as readonly Province[];

export const PROVINCE_IDS = Object.freeze(
  PROVINCES.map((province) => province.id),
) as readonly ProvinceId[];

export const PROVINCE_BY_ID = Object.freeze(
  Object.fromEntries(PROVINCES.map((province) => [province.id, province])),
) as Readonly<Record<ProvinceId, Province>>;

export function isProvinceId(value: string): value is ProvinceId {
  return Object.prototype.hasOwnProperty.call(PROVINCE_BY_ID, value);
}

export function getProvince(id: ProvinceId): Province {
  return PROVINCE_BY_ID[id];
}

export function findProvince(query: string): Province | undefined {
  return PROVINCES.find((province) =>
    matchesPlaceName(query, [
      province.id,
      province.code,
      province.name,
      province.capital,
      province.abbreviation,
      ...province.aliases,
    ]),
  );
}

export function getProvincesByRegion(
  region: RegionId | string,
): readonly Province[] {
  const regionId = isRegionId(region) ? region : findRegion(region)?.id;
  if (!regionId) return [];
  return PROVINCES.filter((province) => province.regionId === regionId);
}
