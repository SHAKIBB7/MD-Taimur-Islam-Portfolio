import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, ThemeScript } from "@/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getProfile } from "@/services/content";
import { siteConfig } from "@/config/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const title = `${profile.name} — ${profile.headline}`;
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: `%s · ${profile.name}` },
    description: profile.summary,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: siteConfig.url,
      title,
      description: profile.summary,
      siteName: profile.name,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description: profile.summary },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const profile = await getProfile();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.headline,
    email: profile.email,
    address: { "@type": "PostalAddress", addressLocality: profile.location },
    sameAs: profile.socials.filter((s) => s.url.startsWith("http")).map((s) => s.url),
    url: siteConfig.url,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          // Static, server-controlled JSON-LD — safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to main content
          </a>
          <Header name={profile.name} />
          <main id="main" className="pt-16">
            {children}
          </main>
          <Footer profile={profile} />
        </ThemeProvider>
      </body>
    </html>
  );
}
