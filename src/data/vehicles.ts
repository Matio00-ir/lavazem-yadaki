import type { VehicleBrand } from "./types";

const engineSet = (names: string[]) => names.map((n) => ({ id: n, name: n }));

export const vehicleBrands: VehicleBrand[] = [
  {
    id: "peugeot",
    name: "پژو",
    models: [
      {
        id: "206",
        name: "206",
        years: [
          { id: "1398-1402", label: "۱۳۹۸ تا ۱۴۰۲", engines: engineSet(["TU3", "TU5"]) },
          { id: "1385-1397", label: "۱۳۸۵ تا ۱۳۹۷", engines: engineSet(["TU3", "TU5"]) },
        ],
      },
      {
        id: "207",
        name: "207",
        years: [
          { id: "1398-1402", label: "۱۳۹۸ تا ۱۴۰۲", engines: engineSet(["TU5", "EF7"]) },
          { id: "1390-1397", label: "۱۳۹۰ تا ۱۳۹۷", engines: engineSet(["TU5"]) },
        ],
      },
      {
        id: "pars",
        name: "پارس",
        years: [
          { id: "1398-1402", label: "۱۳۹۸ تا ۱۴۰۲", engines: engineSet(["XU7", "EF7"]) },
          { id: "1385-1397", label: "۱۳۸۵ تا ۱۳۹۷", engines: engineSet(["XU7"]) },
        ],
      },
    ],
  },
  {
    id: "samand",
    name: "ایران خودرو",
    models: [
      {
        id: "samand-lx",
        name: "سمند LX",
        years: [
          { id: "1395-1402", label: "۱۳۹۵ تا ۱۴۰۲", engines: engineSet(["EF7", "XU7"]) },
        ],
      },
      {
        id: "dena",
        name: "دنا",
        years: [
          { id: "1397-1402", label: "۱۳۹۷ تا ۱۴۰۲", engines: engineSet(["EF7", "TU5"]) },
        ],
      },
      {
        id: "tara",
        name: "تارا",
        years: [{ id: "1400-1402", label: "۱۴۰۰ تا ۱۴۰۲", engines: engineSet(["TU5"]) }],
      },
    ],
  },
  {
    id: "saipa",
    name: "سایپا",
    models: [
      {
        id: "quick",
        name: "کوییک",
        years: [{ id: "1397-1402", label: "۱۳۹۷ تا ۱۴۰۲", engines: engineSet(["M13", "M15"]) }],
      },
      {
        id: "shahin",
        name: "شاهین",
        years: [{ id: "1400-1402", label: "۱۴۰۰ تا ۱۴۰۲", engines: engineSet(["EC5"]) }],
      },
      {
        id: "tiba",
        name: "تیبا",
        years: [{ id: "1394-1402", label: "۱۳۹۴ تا ۱۴۰۲", engines: engineSet(["M13"]) }],
      },
    ],
  },
  {
    id: "hyundai",
    name: "هیوندای",
    models: [
      {
        id: "elantra",
        name: "النترا",
        years: [
          { id: "1396-1402", label: "۱۳۹۶ تا ۱۴۰۲", engines: engineSet(["Nu 2.0", "Gamma 1.6"]) },
        ],
      },
      {
        id: "sonata",
        name: "سوناتا",
        years: [{ id: "1394-1400", label: "۱۳۹۴ تا ۱۴۰۰", engines: engineSet(["Theta 2.4"]) }],
      },
      {
        id: "tucson",
        name: "توسان",
        years: [{ id: "1397-1402", label: "۱۳۹۷ تا ۱۴۰۲", engines: engineSet(["Nu 2.0"]) }],
      },
    ],
  },
  {
    id: "kia",
    name: "کیا",
    models: [
      {
        id: "cerato",
        name: "سراتو",
        years: [{ id: "1395-1402", label: "۱۳۹۵ تا ۱۴۰۲", engines: engineSet(["Gamma 1.6", "Nu 2.0"]) }],
      },
      {
        id: "sportage",
        name: "اسپورتیج",
        years: [{ id: "1396-1401", label: "۱۳۹۶ تا ۱۴۰۱", engines: engineSet(["Nu 2.0"]) }],
      },
      {
        id: "optima",
        name: "اپتیما",
        years: [{ id: "1393-1399", label: "۱۳۹۳ تا ۱۳۹۹", engines: engineSet(["Theta 2.4"]) }],
      },
    ],
  },
  {
    id: "renault",
    name: "رنو",
    models: [
      {
        id: "l90",
        name: "تندر ۹۰ (L90)",
        years: [{ id: "1390-1400", label: "۱۳۹۰ تا ۱۴۰۰", engines: engineSet(["K4M"]) }],
      },
      {
        id: "sandero",
        name: "ساندرو",
        years: [{ id: "1395-1401", label: "۱۳۹۵ تا ۱۴۰۱", engines: engineSet(["K4M"]) }],
      },
    ],
  },
];

export const getModelsByBrand = (brandId: string) =>
  vehicleBrands.find((b) => b.id === brandId)?.models ?? [];
