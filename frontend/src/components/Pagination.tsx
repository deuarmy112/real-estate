import React from "react";

type Props = { page: number; totalPages: number; onChange: (p: number) => void };

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div style={{ marginTop: 12 }}>
      {pages.map((p) => (
        <button key={p} onClick={() => onChange(p)} style={{ marginRight: 6, fontWeight: p === page ? 700 : 400 }}>
          {p}
        </button>
      ))}
    </div>
  );
}
