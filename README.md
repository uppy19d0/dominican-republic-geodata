# dominican-republic-geodata

Typed, zero-dependency territorial data for the Dominican Republic. The first
release contains the 10 planning regions and 32 province-level divisions with
stable codes, capitals, aliases, and parent relationships.

## Install

```bash
npm install dominican-republic-geodata
```

## Use

```ts
import {
  findProvince,
  findRegion,
  getProvincesByRegion,
} from "dominican-republic-geodata";

findProvince("san jose de ocoa"); // DO-31; accents are optional
findProvince("DN"); // DO-01
findRegion("Metropolitana"); // region 10
getProvincesByRegion("Cibao Norte");
```

Smaller entry points are also available:

```ts
import { PROVINCES, findProvince } from "dominican-republic-geodata/provinces";
import { REGIONS, findRegion } from "dominican-republic-geodata/regions";
import { DATASET_METADATA } from "dominican-republic-geodata/metadata";
```

## Data scope and source

The package records the source and reference year in `DATASET_METADATA`. Version
0.1 covers regions and provinces using the territorial naming and coding model
published by the Dominican Republic's Oficina Nacional de Estadística (ONE) in
*División Territorial 2021*.

Municipalities, municipal districts, sections, neighborhoods, geometry, and
postal addresses are intentionally outside version 0.1 until their source data
and redistribution terms are validated.

Source: [ONE — División Territorial 2021](https://www.one.gob.do/publicaciones/2021/division-territorial-2021/)

## License

The library code is MIT licensed. Source attribution and reference-year metadata
are retained with the territorial dataset.
