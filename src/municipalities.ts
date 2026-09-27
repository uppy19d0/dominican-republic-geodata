import { matchesPlaceName, normalizePlaceName } from "./normalize";
import { findProvince, getProvince, isProvinceId, PROVINCES } from "./provinces";
import type {
  Municipality,
  Province,
  ProvinceClickPayload,
  ProvinceGeodata,
  ProvinceId,
} from "./types";

type MunicipalityInput = string | readonly [name: string, aliases: readonly string[]];
type MunicipalityGroup = readonly [provinceId: ProvinceId, municipalities: readonly MunicipalityInput[]];

function slugify(value: string): string {
  return normalizePlaceName(value).replace(/\s+/g, "-");
}

const MUNICIPALITY_GROUPS = [
  ["DO-01", [["Santo Domingo de Guzmán", ["Santo Domingo", "Distrito Nacional"]]]],
  ["DO-02", ["Azua de Compostela", "Estebanía", "Guayabal", "Las Charcas", "Las Yayas de Viajama", "Padre Las Casas", "Peralta", "Pueblo Viejo", "Sabana Yegua", "Tábara Arriba"]],
  ["DO-03", ["Neiba", "Galván", "Los Ríos", "Tamayo", "Villa Jaragua"]],
  ["DO-04", ["Santa Cruz de Barahona", "Cabral", "El Peñón", "Enriquillo", "Fundación", "Jaquimeyes", "La Ciénaga", "Las Salinas", "Paraíso", "Polo", "Vicente Noble"]],
  ["DO-05", ["Dajabón", "El Pino", "Loma de Cabrera", "Partido", "Restauración"]],
  ["DO-06", ["San Francisco de Macorís", "Arenoso", "Castillo", "Eugenio María de Hostos", "Las Guáranas", "Pimentel", "Villa Riva"]],
  ["DO-07", ["Comendador", "Bánica", "El Llano", "Hondo Valle", "Juan Santiago", "Pedro Santana"]],
  ["DO-08", [["Santa Cruz de El Seibo", ["Santa Cruz del Seibo", "El Seibo"]], "Miches"]],
  ["DO-09", ["Moca", "Cayetano Germosén", "Gaspar Hernández", "Jamao al Norte", "San Víctor"]],
  ["DO-10", ["Jimaní", "Cristóbal", "Duvergé", "La Descubierta", "Mella", "Postrer Río"]],
  ["DO-11", [["Salvaleón de Higüey", ["Higüey", "Higuey"]], "San Rafael del Yuma"]],
  ["DO-12", ["La Romana", "Guaymate", "Villa Hermosa"]],
  ["DO-13", ["Concepción de La Vega", "Constanza", "Jarabacoa", "Jima Abajo"]],
  ["DO-14", ["Nagua", "Cabrera", "El Factor", "Río San Juan"]],
  ["DO-15", ["San Fernando de Monte Cristi", "Castañuelas", "Guayubín", "Las Matas de Santa Cruz", "Pepillo Salcedo", "Villa Vásquez"]],
  ["DO-16", ["Pedernales", "Oviedo"]],
  ["DO-17", ["Baní", "Matanzas", "Nizao"]],
  ["DO-18", ["San Felipe de Puerto Plata", "Altamira", "Guananico", "Imbert", "Los Hidalgos", "Luperón", "Sosúa", "Villa Isabela", "Villa Montellano"]],
  ["DO-19", ["Salcedo", "Tenares", "Villa Tapia"]],
  ["DO-20", ["Santa Bárbara de Samaná", "Las Terrenas", "Sánchez"]],
  ["DO-21", ["San Cristóbal", "Bajos de Haina", "Cambita Garabitos", "Los Cacaos", "Sabana Grande de Palenque", "San Gregorio de Nigua", "Villa Altagracia", "Yaguate"]],
  ["DO-22", ["San Juan de la Maguana", "Bohechío", "El Cercado", "Juan de Herrera", "Las Matas de Farfán", "Vallejuelo"]],
  ["DO-23", ["San Pedro de Macorís", "Consuelo", "Guayacanes", "Quisqueya", "Ramón Santana", "San José de Los Llanos"]],
  ["DO-24", ["Cotuí", "Cevicos", "Fantino", "La Mata"]],
  ["DO-25", ["Santiago de los Caballeros", "Baitoa", "Jánico", "Licey al Medio", "Puñal", "Sabana Iglesia", "San José de las Matas", "Tamboril", "Villa Bisonó", "Villa González"]],
  ["DO-26", ["San Ignacio de Sabaneta", "Los Almácigos", "Monción"]],
  ["DO-27", [["Santa Cruz de Mao", ["Mao"]], "Esperanza", "Laguna Salada"]],
  ["DO-28", ["Bonao", "Maimón", "Piedra Blanca"]],
  ["DO-29", ["Monte Plata", "Bayaguana", "Peralvillo", "Sabana Grande de Boyá", "Yamasá"]],
  ["DO-30", ["Hato Mayor del Rey", "El Valle", "Sabana de la Mar"]],
  ["DO-31", ["San José de Ocoa", "Rancho Arriba", "Sabana Larga"]],
  ["DO-32", ["Santo Domingo Este", "Boca Chica", "Los Alcarrizos", "Pedro Brand", "San Antonio de Guerra", "Santo Domingo Norte", "Santo Domingo Oeste"]],
] as const satisfies readonly MunicipalityGroup[];

function createMunicipality(
  provinceId: ProvinceId,
  entry: MunicipalityInput,
  index: number,
): Municipality {
  const [name, aliases] = Array.isArray(entry) ? entry : [entry, []];
  const order = String(index + 1).padStart(2, "0");

  return Object.freeze({
    id: `${provinceId}-${order}`,
    code: `${provinceId.replace("DO-", "")}-${order}`,
    provinceId,
    name,
    slug: slugify(name),
    isMain: index === 0,
    aliases,
  });
}

function resolveProvince(query: ProvinceId | string): Province | undefined {
  return isProvinceId(query) ? getProvince(query) : findProvince(query);
}

export const MUNICIPALITIES = Object.freeze(
  MUNICIPALITY_GROUPS.flatMap(([provinceId, municipalities]) =>
    municipalities.map((entry, index) => createMunicipality(provinceId, entry, index)),
  ),
) as readonly Municipality[];

export const MUNICIPALITY_IDS = Object.freeze(
  MUNICIPALITIES.map((municipality) => municipality.id),
) as readonly string[];

export const MUNICIPALITY_BY_ID = Object.freeze(
  Object.fromEntries(MUNICIPALITIES.map((municipality) => [municipality.id, municipality])),
) as Readonly<Record<string, Municipality>>;

export const MUNICIPALITIES_BY_PROVINCE = Object.freeze(
  Object.fromEntries(
    PROVINCES.map((province) => [
      province.id,
      Object.freeze(MUNICIPALITIES.filter((municipality) => municipality.provinceId === province.id)),
    ]),
  ),
) as Readonly<Record<ProvinceId, readonly Municipality[]>>;

export function isMunicipalityId(value: string): boolean {
  return Object.prototype.hasOwnProperty.call(MUNICIPALITY_BY_ID, value);
}

export function getMunicipality(id: string): Municipality | undefined {
  return MUNICIPALITY_BY_ID[id];
}

export function getProvinceMunicipalities(
  province: ProvinceId | string,
): readonly Municipality[] {
  const resolvedProvince = resolveProvince(province);
  if (!resolvedProvince) return [];
  return MUNICIPALITIES_BY_PROVINCE[resolvedProvince.id] ?? [];
}

export const getMunicipalitiesByProvince = getProvinceMunicipalities;

export function getProvinceMainMunicipality(
  province: ProvinceId | string,
): Municipality | undefined {
  return getProvinceMunicipalities(province).find((municipality) => municipality.isMain);
}

export function findMunicipality(
  query: string,
  province?: ProvinceId | string,
): Municipality | undefined {
  const candidates = province ? getProvinceMunicipalities(province) : MUNICIPALITIES;
  return candidates.find((municipality) =>
    matchesPlaceName(query, [
      municipality.id,
      municipality.code,
      municipality.name,
      municipality.slug,
      ...municipality.aliases,
    ]),
  );
}

export function getProvinceGeodata(
  province: ProvinceId | string,
): ProvinceGeodata | undefined {
  const resolvedProvince = resolveProvince(province);
  if (!resolvedProvince) return undefined;

  const municipalities = getProvinceMunicipalities(resolvedProvince.id);
  const mainMunicipality = getProvinceMainMunicipality(resolvedProvince.id);
  if (!mainMunicipality) return undefined;

  return Object.freeze({
    ...resolvedProvince,
    municipalities,
    mainMunicipality,
  });
}

export function getProvinceClickPayload(
  province: ProvinceId | string,
): ProvinceClickPayload | undefined {
  const resolvedProvince = resolveProvince(province);
  if (!resolvedProvince) return undefined;

  const municipalities = getProvinceMunicipalities(resolvedProvince.id);
  const mainMunicipality = getProvinceMainMunicipality(resolvedProvince.id);
  if (!mainMunicipality) return undefined;

  return Object.freeze({
    province: resolvedProvince,
    municipalities,
    mainMunicipality,
  });
}
