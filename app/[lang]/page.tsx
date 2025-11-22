import { localizedT } from "../utils";
import { Navbar } from "../components/organisms/navbar/Navbar";
import { Footer } from "../components/organisms/footer/Footer";
import { HeroSection } from "../components/organisms/landing/HeroSection";
import { ServicesSection } from "../components/organisms/landing/ServicesSection";
import { Metadata } from "next";

const locales = ["en"];

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: "Landing Page",
};

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = localizedT(lang);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white dark:bg-black">
      <Navbar actualLocale="en" />
      <HeroSection t={t} />
      <ServicesSection t={t} />
      <Footer t={t} />
    </main>
  );
}
