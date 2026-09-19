export type RegionId =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10";

export type ProvinceId =
  | "DO-01"
  | "DO-02"
  | "DO-03"
  | "DO-04"
  | "DO-05"
  | "DO-06"
  | "DO-07"
  | "DO-08"
  | "DO-09"
  | "DO-10"
  | "DO-11"
  | "DO-12"
  | "DO-13"
  | "DO-14"
  | "DO-15"
  | "DO-16"
  | "DO-17"
  | "DO-18"
  | "DO-19"
  | "DO-20"
  | "DO-21"
  | "DO-22"
  | "DO-23"
  | "DO-24"
  | "DO-25"
  | "DO-26"
  | "DO-27"
  | "DO-28"
  | "DO-29"
  | "DO-30"
  | "DO-31"
  | "DO-32";

export interface Region {
  id: RegionId;
  name: string;
  aliases: readonly string[];
}

export interface Province {
  id: ProvinceId;
  code: string;
  name: string;
  capital: string;
  abbreviation: string;
  regionId: RegionId;
  aliases: readonly string[];
}

export interface TerritorialDatasetMetadata {
  name: string;
  countryCode: "DO";
  referenceYear: number;
  source: string;
  sourceUrl: string;
  scopes: readonly ("regions" | "provinces")[];
  notes: string;
}
