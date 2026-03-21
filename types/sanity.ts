// /types/sanity.ts
export interface SanityImageAsset {
  _ref: string;
  _type: "reference";
}

export interface SanityImage {
  _type: "image";
  asset: SanityImageAsset;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}