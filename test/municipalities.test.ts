import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  findMunicipality,
  getMunicipalitiesByProvince,
  getProvinceClickPayload,
  getProvinceGeodata,
  getProvinceMainMunicipality,
  getProvinceMunicipalities,
  MUNICIPALITIES,
  MUNICIPALITIES_BY_PROVINCE,
  PROVINCES,
} from "../src/index";

describe("municipality dataset", () => {
  it("contains municipality records for every province and Distrito Nacional", () => {
    assert.equal(MUNICIPALITIES.length, 158);
    assert.equal(new Set(MUNICIPALITIES.map((municipality) => municipality.id)).size, 158);

    for (const province of PROVINCES) {
      const municipalities = MUNICIPALITIES_BY_PROVINCE[province.id];
      assert.ok(municipalities.length >= 1, province.id);
      assert.equal(municipalities.filter((municipality) => municipality.isMain).length, 1, province.id);
    }
  });

  it("returns municipalities and main city for clicked provinces", () => {
    assert.equal(getProvinceMainMunicipality("DO-25")?.name, "Santiago de los Caballeros");
    assert.equal(getProvinceMunicipalities("Santiago").length, 10);
    assert.equal(getMunicipalitiesByProvince("DN")[0]?.name, "Santo Domingo de Guzmán");

    const payload = getProvinceClickPayload("DO-09");
    assert.equal(payload?.province.name, "Espaillat");
    assert.equal(payload?.mainMunicipality.name, "Moca");
    assert.ok(payload?.municipalities.some((municipality) => municipality.name === "San Víctor"));
  });

  it("finds municipalities by name, alias, id, code and accents", () => {
    assert.equal(findMunicipality("san victor")?.provinceId, "DO-09");
    assert.equal(findMunicipality("Mao")?.name, "Santa Cruz de Mao");
    assert.equal(findMunicipality("25-01")?.name, "Santiago de los Caballeros");
    assert.equal(findMunicipality("DO-25-01")?.name, "Santiago de los Caballeros");
    assert.equal(findMunicipality("Higuey")?.name, "Salvaleón de Higüey");
  });

  it("builds province geodata with stable shape", () => {
    const geodata = getProvinceGeodata("Provincia Santo Domingo");
    assert.equal(geodata?.id, "DO-32");
    assert.equal(geodata?.mainMunicipality.name, "Santo Domingo Este");
    assert.equal(geodata?.municipalities.length, 7);
  });
});
