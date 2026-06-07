import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="font-semibold text-xl tracking-tight">Coaching Directory</div>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/directory" className="hover:underline">Directory</Link>
            <Link href="/blog" className="hover:underline">Insights</Link>
            <Link href="/login" className="hover:underline">Coach Login</Link>
            <Link 
              href="/signup" 
              className="px-4 py-1.5 rounded-full bg-[#1e3a5f] text-white text-sm hover:bg-[#16324f]"
            >
              Join as a Coach
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-20">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full bg-[#f8f7f4] text-xs tracking-widest mb-4">
              CURATED BY A 30-YEAR MASTER COACH
            </div>
            <h1 className="text-6xl font-semibold tracking-tighter leading-none mb-6">
              The directory for<br />the next generation<br />of great coaches.
            </h1>
            <p className="text-xl text-[#555] mb-8 max-w-md">
              Discover rising life coaches. Or join as a coach and get your own professional microsite.
            </p>

            <div className="flex gap-4">
              <Link 
                href="/directory" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#1e3a5f] text-white font-medium hover:bg-[#16324f] transition"
              >
                Browse the Directory
              </Link>
              <Link 
                href="/signup" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-[#1e3a5f] font-medium hover:bg-[#f8f7f4] transition"
              >
                Become a Listed Coach
              </Link>
            </div>

            <p className="mt-4 text-xs text-[#888]">
              Currently on <span className="font-mono">testingzone.live</span>
            </p>
          </div>
        </div>

        {/* Value props */}
        <div className="border-t bg-[#f8f7f4]">
          <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="font-medium mb-2">For Clients</div>
              <p className="text-[#555]">Find coaches by specialty, read their stories, and reach out directly on their own page.</p>
            </div>
            <div>
              <div className="font-medium mb-2">For Rising Coaches</div>
              <p className="text-[#555]">Get a beautiful hosted microsite at /coach/your-name. Manage your bio, offerings, and writing yourself.</p>
            </div>
            <div>
              <div className="font-medium mb-2">For the Master Coach</div>
              <p className="text-[#555]">Curate quality. Publish your own insights. Give the next generation real visibility and tools.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 text-xs text-[#888] max-w-5xl mx-auto px-6">
        testingzone.live • Phase 1 (free listings for rising coaches)
      </footer>
    </div>
  );
}
