// Home: secciones en el orden real del sitio (02-content-home). Hero
// full-bleed: sin safe area top y StatusBar clara sobre el video oscuro.
// El footer del sitio va al final del scroll (patrón web→native).
import { Footer } from '@/shared/components/Footer';
import { Screen } from '@/shared/components/Screen';

import { HeroSection } from './components/HeroSection';
import { IntroVideoCard } from './components/IntroVideoCard';
import { PartnersRow } from './components/PartnersRow';
import { StatsBanner } from './components/StatsBanner';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ZonesCarousel } from './components/ZonesCarousel';

export function HomeScreen() {
  return (
    <Screen statusBarStyle="light" safeTop={false}>
      <HeroSection />
      <IntroVideoCard />
      <ZonesCarousel />
      <TestimonialsSection />
      <PartnersRow />
      <StatsBanner />
      <Footer />
    </Screen>
  );
}
