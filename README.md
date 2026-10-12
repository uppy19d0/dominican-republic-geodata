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


## Supply-chain verification and runtime permissions

Runtime: local, typed territorial records and lookup functions. No package-initiated network requests, subprocesses or disk writes. Territorial records are not a substitute for current legal cartography.

Install the exact version required by your application and commit your lockfile. Releases request npm provenance from GitHub Actions, and CI checks the dependency graph and package contents before publication. The artifact guard rejects recognized credential patterns, private/environment files, unsafe paths, missing attribution/metadata and unexpected consumer install hooks. It is a focused release check, not proof that every secret or malicious behavior is detectable.

```sh
npm install --save-exact dominican-republic-geodata@0.2.2
npm audit
npm audit signatures
```

When the installed graph has no registry dependencies, npm may report that there are no dependency signatures to verify.

Inspect the exact-version [Socket report](https://socket.dev/npm/package/dominican-republic-geodata/overview/0.2.2) and the npm provenance link. A successful CI check is not the same as a package score of 100. Socket also weighs dependency counts and real adoption; no score, download history or security guarantee is fabricated. Report suspected issues through SECURITY.md.
