import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CoachPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const coach = await prisma.coachProfile.findUnique({
    where: { slug },
    include: {
      offerings: {
        orderBy: { sortOrder: "asc" },
      },
      posts: {
        where: { isPublished: true },
        orderBy: { publishedAt: "desc" },
        take: 5,
      },
    },
  });

  if (!coach || !coach.isPublished) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link href="/directory" className="text-sm text-[#555] hover:underline">← Back to directory</Link>
      </div>

      {/* Hero */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img
          src={coach.photoUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop"}
          alt={coach.displayName}
          className="w-40 h-40 rounded-2xl object-cover ring-1 ring-black/10 flex-shrink-0"
        />
        <div className="flex-1 pt-2">
          <h1 className="text-4xl font-semibold tracking-tight">{coach.displayName}</h1>
          <p className="text-xl text-[#555] mt-1">{coach.title}</p>

          <div className="mt-4 flex flex-wrap gap-3">
            {coach.contactEmail && (
              <a href={`mailto:${coach.contactEmail}`} className="text-sm underline">Email me</a>
            )}
            {coach.website && (
              <a href={coach.website} target="_blank" className="text-sm underline">Visit website</a>
            )}
            {coach.calendlyUrl && (
              <a href={coach.calendlyUrl} target="_blank" className="inline-block text-sm px-4 py-1 rounded-full bg-[#1e3a5f] text-white">Book a discovery call</a>
            )}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="mt-12">
        <h2 className="uppercase tracking-[2px] text-xs font-medium text-[#888] mb-3">About</h2>
        <div className="prose text-[15px] leading-relaxed whitespace-pre-line">
          {coach.bio}
        </div>
      </div>

      {/* Specialties */}
      <div className="mt-10">
        <h2 className="uppercase tracking-[2px] text-xs font-medium text-[#888] mb-3">Specialties</h2>
        <div className="flex flex-wrap gap-2">
          {coach.specialties.map((s: string, i: number) => (
            <span key={i} className="px-4 py-1 rounded-full border text-sm">{s}</span>
          ))}
        </div>
      </div>

      {/* Offerings */}
      <div className="mt-12">
        <h2 className="uppercase tracking-[2px] text-xs font-medium text-[#888] mb-3">Offerings &amp; Rates</h2>
        <div className="space-y-4">
          {coach.offerings.map((off: any, i: number) => (
            <div key={i} className="border rounded-xl p-5">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="font-semibold">{off.title}</div>
                  <div className="text-sm text-[#555] mt-1">{off.description}</div>
                </div>
                <div className="text-right font-medium text-sm whitespace-nowrap">{off.rate}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Writings (blog stub) */}
      <div className="mt-12">
        <h2 className="uppercase tracking-[2px] text-xs font-medium text-[#888] mb-3">Writings</h2>
        {coach.posts?.length ? (
          <div className="space-y-3">
            {coach.posts.map((post: any, i: number) => (
              <div key={i} className="border rounded-xl p-5 hover:border-[#1e3a5f] transition">
                <div className="font-medium">{post.title}</div>
                <p className="text-sm text-[#555] mt-1">{post.excerpt}</p>
                <div className="text-xs mt-3 text-[#888]">Read on this site (coming soon in dashboard)</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#666]">No published writings yet.</p>
        )}
      </div>

      <div className="mt-16 text-center text-xs text-[#888]">
        Live data from the database.
      </div>
    </div>
  );
}
