# dominican-republic-geodata

[![CI](https://github.com/uppy19d0/dominican-republic-geodata/actions/workflows/ci.yml/badge.svg)](https://github.com/uppy19d0/dominican-republic-geodata/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/dominican-republic-geodata.svg)](https://www.npmjs.com/package/dominican-republic-geodata)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

Typed, zero-dependency territorial data for the Dominican Republic. It contains the 10 planning regions, 32 province-level divisions, and 158 municipality records including the Distrito Nacional click unit, with stable codes, capitals, aliases, main municipalities, and parent relationships.

## Install

```bash
npm install dominican-republic-geodata
```

## Use

```ts
import {
  findMunicipality,
  findProvince,
  findRegion,
  getProvinceClickPayload,
  getProvinceMainMunicipality,
  getProvinceMunicipalities,
  getProvincesByRegion,
} from "dominican-republic-geodata";

findProvince("san jose de ocoa"); // DO-31; accents are optional
findProvince("DN"); // DO-01
findRegion("Metropolitana"); // region 10
getProvincesByRegion("Cibao Norte");

getProvinceMainMunicipality("DO-25")?.name; // Santiago de los Caballeros
getProvinceMunicipalities("DO-25").length; // 10
findMunicipality("San Victor")?.provinceId; // DO-09

const clickPayload = getProvinceClickPayload("DO-32");
clickPayload?.mainMunicipality.name; // Santo Domingo Este
clickPayload?.municipalities.map((municipality) => municipality.name);
```

Smaller entry points are also available:

```ts
import { PROVINCES, findProvince } from "dominican-republic-geodata/provinces";
import { REGIONS, findRegion } from "dominican-republic-geodata/regions";
import { MUNICIPALITIES, getProvinceMunicipalities } from "dominican-republic-geodata/municipalities";
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
0.2 covers regions, provinces, and municipalities using the territorial naming
and coding model published by the Dominican Republic's Oficina Nacional de
Estadística (ONE) in *División Territorial 2021*.

Municipal districts, sections, neighborhoods, geometry, and postal addresses are
outside the package scope. Province geometry is provided by
`dominican-republic-map`.

Source: [ONE — División Territorial 2021](https://www.one.gob.do/publicaciones/2021/division-territorial-2021/)

## License

The library code is MIT licensed. Source attribution and reference-year metadata
are retained with the territorial dataset.
