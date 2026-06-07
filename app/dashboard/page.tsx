import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// For the partner demo, this dashboard is hardcoded to Jane Doe.
// Later we can wire real auth so each coach only sees their own data.
const DEMO_COACH_EMAIL = "jane@janedoe.coach";

export default async function CoachDashboard() {
  const coachProfile = await prisma.coachProfile.findFirst({
    where: {
      user: { email: DEMO_COACH_EMAIL },
    },
    include: {
      offerings: { orderBy: { sortOrder: "asc" } },
      posts: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!coachProfile) {
    return <div className="p-10">No coach profile found for demo.</div>;
  }

  const coachSlug = coachProfile.slug;

  // Server Actions
  async function saveProfile(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const displayName = formData.get("displayName") as string;
    const title = formData.get("title") as string;
    const bio = formData.get("bio") as string;
    const specialtiesRaw = formData.get("specialties") as string;
    const photoUrl = formData.get("photoUrl") as string;
    const contactEmail = formData.get("contactEmail") as string;
    const website = formData.get("website") as string;
    const calendlyUrl = formData.get("calendlyUrl") as string;

    const specialties = specialtiesRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    await prisma.coachProfile.update({
      where: { id },
      data: {
        displayName,
        title: title || null,
        bio: bio || null,
        specialties,
        photoUrl: photoUrl || null,
        contactEmail: contactEmail || null,
        website: website || null,
        calendlyUrl: calendlyUrl || null,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/coach/${coachSlug}`);
  }

  async function addOffering(formData: FormData) {
    "use server";
    const coachProfileId = formData.get("coachProfileId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const rate = formData.get("rate") as string;

    if (!title || !coachProfileId) return;

    const maxOrderResult = await prisma.offering.aggregate({
      where: { coachProfileId },
      _max: { sortOrder: true },
    });
    const maxOrder = maxOrderResult._max.sortOrder ?? -1;

    await prisma.offering.create({
      data: {
        coachProfileId,
        title,
        description: description || "",
        rate: rate || "",
        sortOrder: maxOrder + 1,
      },
    });

    revalidatePath("/dashboard");
  }

  async function deleteOffering(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.offering.delete({ where: { id } });
    revalidatePath("/dashboard");
  }

  async function savePost(formData: FormData) {
    "use server";
    const id = formData.get("id") as string | null;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const isPublished = formData.get("isPublished") === "on";

    if (!title || !content) return;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (id) {
      // For updates, keep the existing slug unless title changes significantly.
      // To avoid complexity in demo, we keep the provided slug (from title).
      // If it collides on save, it will error (rare in demo).
      await prisma.post.update({
        where: { id },
        data: { title, content, isPublished, slug },
      });
    } else {
      const coachProfileId = formData.get("coachProfileId") as string;

      // Generate a unique slug for this coach's posts (the DB enforces unique coachProfileId + slug)
      let finalSlug = slug;
      let counter = 2;
      while (true) {
        const existing = await prisma.post.findFirst({
          where: {
            coachProfileId,
            slug: finalSlug,
          },
        });
        if (!existing) break;
        finalSlug = `${slug}-${counter}`;
        counter++;
      }

      await prisma.post.create({
        data: {
          coachProfileId,
          title,
          content,
          slug: finalSlug,
          isPublished,
          publishedAt: isPublished ? new Date() : null,
        },
      });
    }

    revalidatePath("/dashboard");
    revalidatePath(`/coach/${coachProfile.slug}`);
  }

  async function deletePost(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.post.delete({ where: { id } });
    revalidatePath("/dashboard");
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#888]">Coach Dashboard</div>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back, {coachProfile.displayName}</h1>
          <p className="text-sm text-[#666] mt-1">Demo mode — managing Jane Doe’s profile</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href={`/coach/${coachProfile.slug}`} 
            target="_blank" 
            className="text-sm px-4 py-1.5 border rounded-full hover:bg-[#f8f7f4]"
          >
            Preview my live page →
          </Link>
          <Link href="/login" className="text-sm px-4 py-1.5 border rounded-full">Log out</Link>
        </div>
      </div>

      {/* Profile */}
      <div className="border rounded-2xl p-6 mb-6">
        <div className="font-medium mb-4">Your Profile</div>
        <form action={saveProfile} className="space-y-4 text-sm">
          <input type="hidden" name="id" value={coachProfile.id} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-[#888] mb-1">Display Name</div>
              <input 
                name="displayName" 
                defaultValue={coachProfile.displayName} 
                className="w-full border rounded px-3 py-1.5" 
                required 
              />
            </div>
            <div>
              <div className="text-xs text-[#888] mb-1">Title / Tagline</div>
              <input 
                name="title" 
                defaultValue={coachProfile.title || ""} 
                className="w-full border rounded px-3 py-1.5" 
              />
            </div>
          </div>

          <div>
            <div className="text-xs text-[#888] mb-1">Bio (Markdown supported)</div>
            <textarea 
              name="bio" 
              defaultValue={coachProfile.bio || ""} 
              className="w-full h-32 border rounded p-3 text-sm font-mono" 
            />
          </div>

          <div>
            <div className="text-xs text-[#888] mb-1">Specialties (comma separated)</div>
            <input 
              name="specialties" 
              defaultValue={coachProfile.specialties.join(", ")} 
              className="w-full border rounded px-3 py-1.5" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-[#888] mb-1">Photo URL</div>
              <input 
                name="photoUrl" 
                defaultValue={coachProfile.photoUrl || ""} 
                className="w-full border rounded px-3 py-1.5" 
              />
            </div>
            <div>
              <div className="text-xs text-[#888] mb-1">Contact Email</div>
              <input 
                name="contactEmail" 
                defaultValue={coachProfile.contactEmail || ""} 
                className="w-full border rounded px-3 py-1.5" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-[#888] mb-1">Website</div>
              <input 
                name="website" 
                defaultValue={coachProfile.website || ""} 
                className="w-full border rounded px-3 py-1.5" 
              />
            </div>
            <div>
              <div className="text-xs text-[#888] mb-1">Calendly / Booking Link</div>
              <input 
                name="calendlyUrl" 
                defaultValue={coachProfile.calendlyUrl || ""} 
                className="w-full border rounded px-3 py-1.5" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="mt-2 text-sm px-5 py-2 bg-[#1e3a5f] text-white rounded hover:bg-[#16324f]"
          >
            Save Profile
          </button>
        </form>
      </div>

      {/* Offerings */}
      <div className="border rounded-2xl p-6 mb-6">
        <div className="font-medium mb-4 flex justify-between items-center">
          <span>Offerings &amp; Rates</span>
          <form action={addOffering} className="flex gap-2 text-sm">
            <input type="hidden" name="coachProfileId" value={coachProfile.id} />
            <input name="title" placeholder="Title" className="border rounded px-2 py-1 text-sm" required />
            <input name="description" placeholder="Short description" className="border rounded px-2 py-1 text-sm w-64" />
            <input name="rate" placeholder="Rate" className="border rounded px-2 py-1 text-sm w-28" />
            <button type="submit" className="px-3 py-1 bg-[#1e3a5f] text-white rounded text-xs">+ Add</button>
          </form>
        </div>

        <div className="space-y-3">
          {coachProfile.offerings.length > 0 ? (
            coachProfile.offerings.map((off) => (
              <div key={off.id} className="border rounded p-3 flex justify-between items-start text-sm">
                <div>
                  <div className="font-medium">{off.title}</div>
                  <div className="text-[#555] text-xs mt-0.5">{off.description}</div>
                  {off.rate && <div className="text-xs mt-1 text-[#888]">{off.rate}</div>}
                </div>
                <form action={deleteOffering}>
                  <input type="hidden" name="id" value={off.id} />
                  <button type="submit" className="text-red-500 text-xs hover:underline">Delete</button>
                </form>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#666]">No offerings yet.</p>
          )}
        </div>
      </div>

      {/* Writings / Blog Posts */}
      <div className="border rounded-2xl p-6">
        <div className="font-medium mb-4">Your Writings</div>

        {/* Create new post */}
        <details className="mb-6">
          <summary className="cursor-pointer text-sm font-medium text-[#1e3a5f] hover:underline">
            + Write new post (Markdown supported)
          </summary>
          <form action={savePost} className="mt-4 space-y-3 border-t pt-4">
            <input type="hidden" name="coachProfileId" value={coachProfile.id} />
            <input 
              name="title" 
              placeholder="Post title" 
              className="w-full border rounded px-3 py-2 text-sm" 
              required 
            />
            <textarea 
              name="content" 
              placeholder="Write your post in Markdown..." 
              className="w-full h-40 border rounded p-3 text-sm font-mono" 
              required 
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isPublished" defaultChecked />
              Publish immediately
            </label>
            <button 
              type="submit" 
              className="text-sm px-5 py-2 bg-[#1e3a5f] text-white rounded hover:bg-[#16324f]"
            >
              Create Post
            </button>
          </form>
        </details>

        {/* List of existing posts */}
        <div className="space-y-4">
          {coachProfile.posts.length > 0 ? (
            coachProfile.posts.map((post) => (
              <div key={post.id} className="border rounded p-4 text-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{post.title}</div>
                    <div className="text-xs text-[#888] mt-0.5">
                      {post.isPublished ? "Published" : "Draft"} • {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button type="submit" className="text-red-500 text-xs hover:underline">Delete</button>
                  </form>
                </div>

                {/* Quick edit form for existing post */}
                <details className="mt-3">
                  <summary className="text-xs text-[#1e3a5f] cursor-pointer hover:underline">Edit this post</summary>
                  <form action={savePost} className="mt-3 space-y-3">
                    <input type="hidden" name="id" value={post.id} />
                    <input 
                      name="title" 
                      defaultValue={post.title} 
                      className="w-full border rounded px-3 py-1.5 text-sm" 
                      required 
                    />
                    <textarea 
                      name="content" 
                      defaultValue={post.content} 
                      className="w-full h-32 border rounded p-3 text-sm font-mono" 
                      required 
                    />
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="isPublished" defaultChecked={post.isPublished} />
                      Published
                    </label>
                    <button 
                      type="submit" 
                      className="text-sm px-4 py-1.5 border rounded hover:bg-[#f8f7f4]"
                    >
                      Save Changes
                    </button>
                  </form>
                </details>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#666]">No posts yet. Create your first one above.</p>
          )}
        </div>
      </div>

      <p className="mt-8 text-xs text-[#888]">
        This dashboard now saves to the real database. Changes will appear on your public microsite.
      </p>
    </div>
  );
}
