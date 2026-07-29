import type { Metadata } from "next";
import "@/styles/style.css";
import "@/styles/styles.css";

export const metadata: Metadata = {
  title: "Om Kushwaha | UX Designer",
  description:
    "UX designer portfolio showcasing case studies, research, wireframes, prototypes, and outcomes.",
  keywords: [
    "UX Designer",
    "Product Designer",
    "Om Kushwaha",
    "Portfolio",
    "Case Study",
    "UI Design",
  ],
  authors: [{ name: "Om Kushwaha" }],
  openGraph: {
    title: "Om Kushwaha | UX Designer",
    description:
      "UX designer portfolio showcasing case studies, research, wireframes, prototypes, and outcomes.",
    type: "website",
    locale: "en_US",
    siteName: "OMK. Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Kushwaha | UX Designer",
    description:
      "UX designer portfolio showcasing case studies, research, wireframes, prototypes, and outcomes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700;1,800;1,900&family=Playfair+Display:ital,wght@0,700;1,700&family=Caveat:wght@400;500&family=Syne:ital,wght@1,800;1,900&family=Lexend:wght@400;500&family=Roboto:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
