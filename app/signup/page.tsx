export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Join the Directory</h1>
      <p className="text-[#555] mb-8 text-sm">Create your free coach profile and get your own microsite.</p>

      <form className="space-y-4" action="/dashboard">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs mb-1.5 text-[#555]">First Name</label>
            <input className="w-full border rounded-lg px-4 py-2.5 text-sm" defaultValue="Alex" />
          </div>
          <div>
            <label className="block text-xs mb-1.5 text-[#555]">Last Name</label>
            <input className="w-full border rounded-lg px-4 py-2.5 text-sm" defaultValue="Rivera" />
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1.5 text-[#555]">Email</label>
          <input type="email" className="w-full border rounded-lg px-4 py-2.5 text-sm" defaultValue="alex@example.com" />
        </div>

        <div>
          <label className="block text-xs mb-1.5 text-[#555]">Choose your URL slug</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-[#888] border border-r-0 rounded-l-lg bg-[#f8f7f4]">/coach/</span>
            <input className="flex-1 border rounded-r-lg px-4 py-2.5 text-sm" defaultValue="alex-rivera" />
          </div>
          <p className="text-[10px] text-[#888] mt-1">You can change this once. Make it clean and professional.</p>
        </div>

        <button type="submit" className="w-full mt-3 py-2.5 rounded-lg bg-[#1e3a5f] text-white text-sm font-medium">
          Create my profile &amp; continue
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-[#888]">
        Already have an account? <a href="/login" className="underline">Log in</a>
      </p>
    </div>
  );
}
