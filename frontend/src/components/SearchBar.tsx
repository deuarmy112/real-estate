import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  minPrice?: number | null;
  maxPrice?: number | null;
  onMinChange?: (v: number | null) => void;
  onMaxChange?: (v: number | null) => void;
};

export default function SearchBar(props: Props) {
  // Search bar removed per request; keep component as a typed stub to avoid breaking imports.
  return null;
}
