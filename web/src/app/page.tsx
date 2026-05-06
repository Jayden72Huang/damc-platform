import { Archetypes } from "@/components/sections/Archetypes";
import { Coach } from "@/components/sections/Coach";
import { Dimensions } from "@/components/sections/Dimensions";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { PainPoints } from "@/components/sections/PainPoints";
import { Pricing } from "@/components/sections/Pricing";
import { Privacy } from "@/components/sections/Privacy";
import { Process } from "@/components/sections/Process";

export default function Home(): React.ReactNode {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#0f0f1e] to-[#0a1929] text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/70 to-transparent"
      />
      <div className="relative z-10">
        <Hero />
        <PainPoints />
        <Dimensions />
        <Archetypes />
        <Process />
        <Pricing />
        <Coach />
        <Privacy />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
