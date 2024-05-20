import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PogStatistics } from "./_components/pog-statistics.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pub Sub Pogs",
  description: "An Example in Pub/Sub Patterns in React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PogStatistics>{children}</PogStatistics>
      </body>
    </html>
  );
}
