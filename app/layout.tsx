import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coaching Directory | testingzone.live",
  description: "Curated directory of life coaches. Discover rising coaches and connect with professionals building their practice.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-white text-[#171717]">
        {children}
      </body>
    </html>
  );
}
