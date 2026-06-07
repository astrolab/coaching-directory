'use client';

import { useState } from "react";
import Link from "next/link";

interface Coach {
  slug: string;
  displayName: string;
  title: string | null;
  bio: string | null;
  photoUrl: string | null;
  specialties: string[];
}

export default function DirectoryList({ coaches: initialCoaches }: { coaches: Coach[] }) {
  const [search, setSearch] = useState("");

  const filtered = initialCoaches.filter((coach) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      coach.displayName.toLowerCase().includes(q) ||
      (coach.title?.toLowerCase().includes(q) ?? false) ||
      (coach.bio?.toLowerCase().includes(q) ?? false) ||
      coach.specialties.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <>
      {/* Working search */}
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, title, specialty, or keyword..."
          className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1e3a5f]"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="px-4 rounded-lg border text-sm hover:bg-[#f8f7f4]"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.length > 0 ? (
          filtered.map((coach) => (
            <Link
              key={coach.slug}
              href={`/coach/${coach.slug}`}
              className="group border rounded-2xl p-6 hover:border-[#1e3a5f] transition block"
            >
              <div className="flex gap-5">
                <img
                  src={coach.photoUrl || "/placeholder.png"}
                  alt={coach.displayName}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0 ring-1 ring-black/5"
                />
                <div className="min-w-0">
                  <div className="font-semibold text-lg group-hover:underline">{coach.displayName}</div>
                  <div className="text-[#555] text-sm">{coach.title}</div>

                  <p className="mt-3 text-sm line-clamp-3 text-[#444]">{coach.bio}</p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {coach.specialties.map((s, i) => (
                      <span key={i} className="text-xs bg-[#f8f7f4] px-2.5 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-2 text-center py-8 text-[#666]">
            No coaches found matching “{search}”.
          </div>
        )}
      </div>
    </>
  );
}
