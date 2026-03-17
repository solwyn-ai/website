import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solwyn — The Control Plane That Never Sees Your Prompts",
  description:
    "Hard spending caps, automatic failover, and per-agent cost attribution for AI agents in production. Your prompts never leave your environment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${GeistMono.variable}`}
    >
      <body className="bg-cream text-primary antialiased font-sans">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
