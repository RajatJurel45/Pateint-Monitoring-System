import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ICU Patient Monitoring System",
  description: "Real-time ICU monitoring dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          margin: 0,
          backgroundColor: "#020617",
          color: "#e5e7eb", // light gray default
        }}
      >
        {children}
      </body>
    </html>
  );
}
