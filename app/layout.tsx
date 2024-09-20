import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: {
    icon: '/plus.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex w-full p-5 flex-row gap-4">
          <Link href={'/'}>Home</Link>
          <Link href={'/lyrics'}>lyrics</Link>
          <Link href={'/test'}>test</Link>
          <Link href={'/test2'}>test2</Link>
          <Link href={'/sample'}>sample</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
