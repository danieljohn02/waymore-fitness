import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WayMore Fitness | Boutique Gym in New City, NY",
  description:
    "WayMore Fitness is a boutique gym in New City, NY. Real people. Real goals. No excuses. Personal training, group classes, Zumba, Pilates, and Total Body Conditioning.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "WayMore Fitness | Boutique Gym in New City, NY",
    description:
      "Real people. Real goals. No excuses. Personal training, HIIT classes, Zumba, Pilates & more at 63 S Main St, New City, NY.",
    url: "https://waymorefitness.com",
    siteName: "WayMore Fitness",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WayMore Fitness | Boutique Gym in New City, NY",
    description:
      "Real people. Real goals. No excuses. Personal training, HIIT classes, Zumba, Pilates & more in New City, NY.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
