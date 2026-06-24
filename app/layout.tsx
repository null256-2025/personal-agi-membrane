import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal AGI Membrane",
  description: "Swipe Reality Gate MVP for human approval before real-world action."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
