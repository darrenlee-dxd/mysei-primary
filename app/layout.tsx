import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationProgress } from "@/components/nav/NavigationProgress";
import { PageTransition } from "@/components/nav/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MySEI",
  description: "Your space to explore your social-emotional skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full`}>
        <NavigationProgress />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
