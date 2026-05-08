import { Archetypes } from "@/components/atelier/Archetypes";
import { Coach } from "@/components/atelier/Coach";
import { Dimensions } from "@/components/atelier/Dimensions";
import { FAQ } from "@/components/atelier/FAQ";
import { FinalCTA } from "@/components/atelier/FinalCTA";
import { Footer } from "@/components/atelier/Footer";
import { Hero } from "@/components/atelier/Hero";
import { PainPoints } from "@/components/atelier/PainPoints";
import { Pricing } from "@/components/atelier/Pricing";
import { Privacy } from "@/components/atelier/Privacy";
import { Process } from "@/components/atelier/Process";
import { SampleReport } from "@/components/atelier/SampleReport";

export default function AtelierPage(): React.ReactNode {
  return (
    <div className="atelier-root bg-[#0E0E10]">
      <Hero />
      <PainPoints />
      <Dimensions />
      <Archetypes />
      <SampleReport />
      <Process />
      <Pricing />
      <Coach />
      <Privacy />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
