'use client'
import Hero from "../shared/Hero";
export default function HomeHero() {
  return (
    <Hero
      title="Dive Into Adventure"
      subtitle="From beginner to pro, we guide your underwater adventure"
      backgroundImage="/asset/homehero.png"
      showButtons
      primaryButtonText="View Classes"
      secondaryButtonText="See Schedule"
      onPrimaryClick={() => console.log("Classes clicked")}
      onSecondaryClick={() => console.log("Schedule clicked")}
      
    />
  );
}
