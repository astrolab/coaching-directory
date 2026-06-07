import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create master admin user
  const adminHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "master@testingzone.live" },
    update: {},
    create: {
      email: "master@testingzone.live",
      passwordHash: adminHash,
      role: "ADMIN",
    },
  });

  // Create a sample coach
  const coachHash = await bcrypt.hash("demo123", 10);
  const coachUser = await prisma.user.upsert({
    where: { email: "jane@janedoe.coach" },
    update: {},
    create: {
      email: "jane@janedoe.coach",
      passwordHash: coachHash,
      role: "COACH",
    },
  });

  const coachProfile = await prisma.coachProfile.upsert({
    where: { slug: "jane-doe" },
    update: {},
    create: {
      userId: coachUser.id,
      slug: "jane-doe",
      displayName: "Jane Doe",
      title: "Life & Career Transition Coach",
      bio: "After 12 years in corporate HR, I now help people make intentional career and life transitions without losing themselves in the process.\n\nMy approach blends deep listening with practical strategy.",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop",
      specialties: ["Career Change", "Burnout Recovery", "Life Transitions"],
      isPublished: true,
      contactEmail: "jane@janedoe.coach",
      website: "https://example.com",
      calendlyUrl: "https://calendly.com/example/discovery",
    },
  });

  // Sample offerings
  await prisma.offering.createMany({
    data: [
      {
        coachProfileId: coachProfile.id,
        title: "Discovery Call",
        description: "45-minute conversation to explore fit and your goals.",
        rate: "Complimentary",
        sortOrder: 0,
      },
      {
        coachProfileId: coachProfile.id,
        title: "3-Month Transformation",
        description: "Bi-weekly 60-min sessions + email support. Focus on clarity and momentum.",
        rate: "$2,400",
        sortOrder: 1,
      },
    ],
    skipDuplicates: true,
  });

  // Second sample coach for a nicer directory
  const coach2Hash = await bcrypt.hash("demo123", 10);
  const coach2User = await prisma.user.upsert({
    where: { email: "marcus@chen.coach" },
    update: {},
    create: {
      email: "marcus@chen.coach",
      passwordHash: coach2Hash,
      role: "COACH",
    },
  });

  const coach2Profile = await prisma.coachProfile.upsert({
    where: { slug: "marcus-chen" },
    update: {},
    create: {
      userId: coach2User.id,
      slug: "marcus-chen",
      displayName: "Marcus Chen",
      title: "Executive & Leadership Coach",
      bio: "Former tech leader turned coach. I help high-achievers lead with more presence and less stress.",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
      specialties: ["Leadership", "Executive Presence", "Imposter Syndrome"],
      isPublished: true,
      contactEmail: "marcus@chen.coach",
      website: "https://example.com",
      calendlyUrl: "https://calendly.com/example/discovery",
    },
  });

  await prisma.offering.createMany({
    data: [
      {
        coachProfileId: coach2Profile.id,
        title: "Leadership Discovery Call",
        description: "60-minute conversation to explore leadership challenges.",
        rate: "Complimentary",
        sortOrder: 0,
      },
      {
        coachProfileId: coach2Profile.id,
        title: "Executive Coaching Package",
        description: "Monthly 1:1 sessions focused on presence, decision-making and team leadership.",
        rate: "$3,200 / 3 months",
        sortOrder: 1,
      },
    ],
    skipDuplicates: true,
  });

  // Third coach for a fuller directory
  const coach3Hash = await bcrypt.hash("demo123", 10);
  const coach3User = await prisma.user.upsert({
    where: { email: "sara@patel.coach" },
    update: {},
    create: {
      email: "sara@patel.coach",
      passwordHash: coach3Hash,
      role: "COACH",
    },
  });

  const coach3Profile = await prisma.coachProfile.upsert({
    where: { slug: "sara-patel" },
    update: {},
    create: {
      userId: coach3User.id,
      slug: "sara-patel",
      displayName: "Sara Patel",
      title: "Burnout & High-Sensitivity Coach",
      bio: "I help sensitive high-achievers recover from burnout and build lives that actually feel good.",
      photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop",
      specialties: ["Burnout Recovery", "Highly Sensitive People", "Work-Life Balance"],
      isPublished: true,
      contactEmail: "sara@patel.coach",
      website: "https://example.com",
      calendlyUrl: "https://calendly.com/example/discovery",
    },
  });

  await prisma.offering.createMany({
    data: [
      {
        coachProfileId: coach3Profile.id,
        title: "Burnout Recovery Call",
        description: "45-min conversation to understand your burnout patterns.",
        rate: "Complimentary",
        sortOrder: 0,
      },
      {
        coachProfileId: coach3Profile.id,
        title: "Rebuild Your Energy Program",
        description: "8-week program with weekly sessions + practices for sensitive professionals.",
        rate: "$1,800",
        sortOrder: 1,
      },
    ],
    skipDuplicates: true,
  });

  // Add a sample writing for Jane Doe so the Writings section has content
  await prisma.post.upsert({
    where: { id: "jane-sample-post" },
    update: {},
    create: {
      id: "jane-sample-post",
      coachProfileId: coachProfile.id,
      title: "What I Wish I Knew Before Leaving My Corporate Job",
      slug: "leaving-corporate",
      content: "The real emotional work of career change starts after you hand in your notice.\n\nI thought the hard part was deciding to leave. It turned out the harder part was learning to trust myself without a title and a team around me.\n\nWhen I first left corporate, I was excited. I had a plan, a website, and a few clients lined up from my network. What I didn’t have was any real understanding of who I was without the corporate scaffolding.\n\nFor twelve years I had been \"Jane from HR.\" My identity, my confidence, even my social life were tied to that role. Once the email signature was gone, I felt strangely invisible.\n\nThe first few months were a mix of freedom and quiet panic. I over-delivered on every coaching session because I was terrified of being seen as \"just\" a coach. I said yes to every opportunity, even the ones that drained me, because I didn’t yet know how to value my own time.\n\nWhat I eventually learned (the hard way) is that leaving a job doesn’t automatically give you a new identity. You have to build one on purpose. That meant getting clear on the kind of clients I actually wanted, the kind of work that energized me, and the boundaries I was willing to protect.\n\nIt also meant grieving the old version of me. I had to let go of the status, the structure, the easy small talk at the coffee machine. In their place I built something slower, more intentional, and ultimately more me.\n\nIf you’re thinking about leaving corporate, know this: the logistics are important, but the internal work is where the real transformation happens. Give yourself time to figure out who you are without the job title. That version of you is the one clients will actually want to work with.",
      isPublished: true,
      publishedAt: new Date("2026-04-15"),
    },
  });

  // Sample main-site blog post
  await prisma.post.upsert({
    where: { id: "seed-main-post" },
    update: {},
    create: {
      id: "seed-main-post",
      title: "Why I Created This Directory",
      slug: "why-i-created-this-directory",
      content: "After thirty years of one-on-one work with clients, I noticed a pattern.\n\nThe most talented, heart-centered coaches I met were often the ones least visible online...",
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  console.log("Seed complete. Admin: master@testingzone.live / admin123");
  console.log("Sample coach: jane@janedoe.coach / demo123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
