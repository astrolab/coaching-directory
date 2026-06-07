import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DirectoryList from "./DirectoryList";

export default async function DirectoryPage() {
  const coaches = await prisma.coachProfile.findMany({
    where: { isPublished: true },
    select: {
      slug: true,
      displayName: true,
      title: true,
      bio: true,
      photoUrl: true,
      specialties: true,
    },
    orderBy: { displayName: "asc" },
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Coach Directory</h1>
          <p className="text-[#555] mt-1">Find the right coach for where you are right now.</p>
        </div>
        <Link href="/" className="text-sm hover:underline">← Back home</Link>
      </div>

      <DirectoryList coaches={coaches} />

      <p className="mt-8 text-xs text-[#888]">
        Live data from the database. Only published coaches appear here.
      </p>
    </div>
  );
}
