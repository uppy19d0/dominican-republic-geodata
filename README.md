# dominican-republic-geodata

[![CI](https://github.com/uppy19d0/dominican-republic-geodata/actions/workflows/ci.yml/badge.svg)](https://github.com/uppy19d0/dominican-republic-geodata/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/dominican-republic-geodata.svg)](https://www.npmjs.com/package/dominican-republic-geodata)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

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

## Production readiness

- Zero runtime dependencies.
- Typed exports for Node, browsers, bundlers, and TypeScript projects.
- CI validates TypeScript, tests, build output, package exports, and npm package contents.
- Releases are published from version tags with npm provenance support.
- Public security, contribution, and code of conduct policies are included in the repository and npm package.

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
