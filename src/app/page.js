import FundingBenifits from "@/sections/FundingBenifits";
import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";
import SectorSection from "@/sections/SectorSection";
import WhatWeOffer from "@/sections/WhatWeOffer";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeOffer />
      <SectorSection/>
      <HowItWorks/>
      <FundingBenifits/>
    </>
  );
}
