// import { cookies } from "next/headers";
import { Suspense } from "react";
import localFont from "next/font/local";
import { StateProvider } from "./state.js";
import Navigation from "./components/navigation.js";
import Footer from "./components/footer.js";
import "./globals.css";
const title = "Some title";

// http://xxx-app.lan
const origin = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";

const kufiFont = localFont({ src: "../public/fonts/NotoKufiArabic-VariableFont_wght.ttf", display: "swap" });

export default async function RootLayout({ children }) {
  // const cookieStore = await cookies();
  return (
    <html dir="auto" translate="no" lang="en" className={`scroll-smooth ${kufiFont.className}`}>
      <body className="antialiased bg-neutral-50 text-slate-700 selection:bg-teal-300 dark:bg-black dark:text-gray-300 dark:selection:bg-pink-500 dark:selection:text-white">
        <Suspense>
          <StateProvider>
            <Navigation />
            <main className="min-h-screen pt-10 pb-24 px-1 sm:px-2 md:px-4 print:min-h-fit" dir="auto">
              {children}
            </main>
            <Footer />
          </StateProvider>
        </Suspense>
      </body>
    </html>
  );
}

export function generateMetadata() {
  return {
    title,
    description: "",
    keywords: title + " ",
    authors: "islamicopensource",
    icons: {
      shortcut: { type: "image/ico", sizes: "48x48", url: "/favicon.ico" },
      icon: { type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
      apple: { type: "image/png", sizes: "180x180", url: "/apple-touch-icon.png" },
      other: [
        { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" },
        { rel: "icon", type: "image/png", sizes: "512x512", url: "/android-chrome-512x512.png" },
      ],
    },
    manifest: "/manifest.json",
    other: { google: "notranslate" },
    metadataBase: origin,
    openGraph: {
      title,
      description: "",
      url: origin,
      siteName: "xxx",
      images: [{ url: `${origin}/android-chrome-512x512.png`, width: 500, height: 500 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "",
      siteId: "1467763754345676543987875",
      creator: "@xxx",
      creatorId: "146772641985763754987875",
      images: [`${origin}/android-chrome-512x512.png`],
    },
    appleWebApp: { title: "xxx", statusBarStyle: "black-translucent" },
  };
}

export const viewport = {
  themeColor: "#fafafa",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};
