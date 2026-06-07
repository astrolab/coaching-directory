export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Coach Login</h1>
      <p className="text-[#555] mb-8 text-sm">Access your dashboard to manage your profile, offerings, and writings.</p>

      <form className="space-y-4" action="/dashboard">
        <div>
          <label className="block text-xs mb-1.5 text-[#555]">Email</label>
          <input type="email" className="w-full border rounded-lg px-4 py-2.5 text-sm" placeholder="you@coach.com" defaultValue="demo@coach.com" />
        </div>
        <div>
          <label className="block text-xs mb-1.5 text-[#555]">Password</label>
          <input type="password" className="w-full border rounded-lg px-4 py-2.5 text-sm" defaultValue="demo123" />
        </div>
        <button type="submit" className="w-full mt-2 py-2.5 rounded-lg bg-[#1e3a5f] text-white text-sm font-medium">Log in</button>
      </form>

      <p className="mt-6 text-center text-xs text-[#888]">
        New coach? <a href="/signup" className="underline">Create your account</a>
      </p>
      <p className="mt-2 text-center text-[10px] text-[#aaa]">
        (Strawman — real auth coming next)
      </p>
    </div>
  );
}
