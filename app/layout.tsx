import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PogStatisticsProvider } from "./_components/pog-statistics.provider";

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
        <PogStatisticsProvider>{children}</PogStatisticsProvider>
      </body>
    </html>
  );
}
