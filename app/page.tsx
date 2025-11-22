import { localizedT } from "./utils";
import { Navbar } from "./components/organisms/navbar/Navbar";
import { Footer } from "./components/organisms/footer/Footer";
import { HeroSection } from "./components/organisms/landing/HeroSection";
import { ServicesSection } from "./components/organisms/landing/ServicesSection";

export default function Home() {
  const t = localizedT("en"); // Defaulting to 'en' for now, or use a proper locale detection if available

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white dark:bg-black">
      <Navbar actualLocale="en" />
      <HeroSection t={t} />
      <ServicesSection t={t} />
      <Footer t={t} />
    </main>
  );
}
