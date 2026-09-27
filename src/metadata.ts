import type { TerritorialDatasetMetadata } from "./types";

export const DATASET_METADATA = Object.freeze({
  name: "Dominican Republic territorial divisions",
  countryCode: "DO",
  referenceYear: 2021,
  source: "Oficina Nacional de Estadística (ONE)",
  sourceUrl:
    "https://www.one.gob.do/publicaciones/2021/division-territorial-2021/",
  scopes: ["regions", "provinces", "municipalities"],
  notes:
    "Includes regions, provinces and municipality records from the validated ONE territorial division reference. Geometry remains packaged by dominican-republic-map.",
} as const satisfies TerritorialDatasetMetadata);
