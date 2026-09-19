import type { TerritorialDatasetMetadata } from "./types";

export const DATASET_METADATA = Object.freeze({
  name: "Dominican Republic territorial divisions",
  countryCode: "DO",
  referenceYear: 2021,
  source: "Oficina Nacional de Estadística (ONE)",
  sourceUrl:
    "https://www.one.gob.do/publicaciones/2021/division-territorial-2021/",
  scopes: ["regions", "provinces"],
  notes:
    "Version 0.1 includes region and province records. Municipalities and geometry require separately validated source data.",
} as const satisfies TerritorialDatasetMetadata);
