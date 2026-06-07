import Link from "next/link";

export default function BlogIndex() {
  const posts = [
    {
      slug: "why-i-created-this-directory",
      title: "Why I Created This Directory",
      date: "May 2026",
      excerpt: "After three decades of coaching, I kept meeting talented younger coaches who had the heart and skill but struggled to be found by the clients who needed them most.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-semibold tracking-tight mb-2">Insights</h1>
      <p className="text-[#555] mb-8">Thoughts from the master coach curating this directory.</p>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block border rounded-2xl p-6 hover:border-[#1e3a5f]">
            <div className="text-xs text-[#888] mb-1">{post.date}</div>
            <div className="font-semibold text-xl tracking-tight">{post.title}</div>
            <p className="mt-2 text-[#444]">{post.excerpt}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-xs text-[#888]">
        Your main-site blog posts will appear here. Markdown editing coming in the admin dashboard.
      </div>
    </div>
  );
}
