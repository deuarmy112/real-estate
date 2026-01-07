import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  minPrice?: number | null;
  maxPrice?: number | null;
  onMinChange?: (v: number | null) => void;
  onMaxChange?: (v: number | null) => void;
};

export default function SearchBar({ value, onChange, minPrice, maxPrice, onMinChange, onMaxChange }: Props) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
      <input placeholder="Search title…" value={value} onChange={(e: any) => onChange(e.target.value)} />
      <input placeholder="min price" type="number" value={minPrice ?? ""} onChange={(e: any) => onMinChange?.(e.target.value ? Number(e.target.value) : null)} style={{ width: 120 }} />
      <input placeholder="max price" type="number" value={maxPrice ?? ""} onChange={(e: any) => onMaxChange?.(e.target.value ? Number(e.target.value) : null)} style={{ width: 120 }} />
    </div>
  );
}
