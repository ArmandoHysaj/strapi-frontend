import type { Metadata } from "next";
import { getGlobalPageData, getGlobalPageMetadata } from "@/data/loaders";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/custom/Header";
import { Footer } from "@/components/custom/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();
  return {
    title: metadata?.data.title,
    description: metadata?.data.description,
  };
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalPageData();
  return (
    <html lang="en">
      <body className={``}>
        <Toaster position="bottom-center" />
        <Header data={globalData.data.header} />
        <div>{children}</div>
        <Footer data={globalData.data.footer} />
      </body>
    </html>
  );
}
