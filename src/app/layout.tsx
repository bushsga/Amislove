import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jamiu ❤️ Aminat",
  description: "A love letter from Jamiu to Aminat",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
