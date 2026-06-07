import Link from "next/link";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Strawman content
  const content = slug === "why-i-created-this-directory" 
    ? `After thirty years of one-on-one work with clients, I noticed a pattern.

The most talented, heart-centered coaches I met were often the ones least visible online. They were doing exceptional work but had no easy way to be discovered by the people who would benefit most.

I created this directory so that rising coaches get a real professional presence — their own URL, their own story, their own offerings — without needing to become full-time marketers or website builders.

This is about elevating the profession, one coach at a time.`

    : "Content coming soon.";

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/blog" className="text-sm hover:underline">← All insights</Link>

      <h1 className="mt-6 text-4xl font-semibold tracking-tight">Why I Created This Directory</h1>
      <div className="text-xs text-[#888] mt-2 mb-8">May 2026 • Master Coach</div>

      <article className="prose text-[15px] leading-relaxed whitespace-pre-line">
        {content}
      </article>
    </div>
  );
}
