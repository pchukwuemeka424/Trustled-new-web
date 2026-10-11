import type { Metadata, Viewport } from "next";
import { DM_Sans, Sora } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SiteEffects } from "@/components/SiteEffects";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TrustLed AI | Responsible AI governance, training and tools",
    template: "%s",
  },
  description:
    "TrustLed AI is an AI governance consultancy and technology company helping universities, businesses and public sector bodies adopt AI responsibly.",
  metadataBase: new URL("https://trustledai.com"),
  openGraph: {
    type: "website",
    images: [{ url: "/assets/img/logo.png" }],
  },
  icons: {
    icon: "/assets/img/favicon.png",
    apple: "/assets/img/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#071B42",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`no-js ${sora.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <a className="sr-only" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}
