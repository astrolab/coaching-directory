import Link from "next/link";

export default function MasterAdmin() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-[#888]">Master Admin</div>
        <h1 className="text-3xl font-semibold tracking-tight">Welcome, Master Coach</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-2xl p-6">
          <div className="font-medium mb-4">Main Site Blog Posts</div>
          <Link href="/blog/why-i-created-this-directory" className="block text-sm underline mb-2">Why I Created This Directory</Link>
          <button className="mt-2 text-xs px-4 py-1.5 bg-[#1e3a5f] text-white rounded">+ New main blog post (Markdown)</button>
        </div>

        <div className="border rounded-2xl p-6">
          <div className="font-medium mb-4">Manage Coaches</div>
          <div className="text-sm space-y-2">
            <div className="flex justify-between border-b pb-2">
              <span>Jane Doe (jane-doe) — Published</span>
              <span className="text-[#888] text-xs">Unpublish</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Marcus Chen (marcus-chen) — Published</span>
              <span className="text-[#888] text-xs">Unpublish</span>
            </div>
            <div className="flex justify-between text-[#888]">
              <span>Alex Rivera (pending approval)</span>
              <span className="text-xs">Approve</span>
            </div>
          </div>
          <p className="text-[10px] mt-4 text-[#888]">Real list + actions will pull from the database.</p>
        </div>
      </div>

      <p className="mt-8 text-xs text-[#888]">
        This is the owner-only admin area. You will publish main-site blogs here and control visibility of coach listings.
      </p>
    </div>
  );
}
