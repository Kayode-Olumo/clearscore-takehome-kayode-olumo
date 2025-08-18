import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}