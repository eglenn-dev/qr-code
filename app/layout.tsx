import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QR Code Generator | Ethan Glenn",
  description: "Generate QR code for any url",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a href="https://eglenn.dev/" className="header">Ethan Glenn</a>
        <div>{children}</div>
      </body>
    </html>
  );
}
