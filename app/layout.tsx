import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web Development: From Zero to the Future",
  description:
    "A live IT consultation seminar by Sir Zaid Rauf, Web Developer at We Tech House, Lahore.",
};

export const viewport: Viewport = {
  themeColor: "#030614",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-navy-950 font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
