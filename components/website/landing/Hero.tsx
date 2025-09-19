'use client'
import { useRouter } from "next/navigation";
import Hero from "../shared/Hero";
export default function HomeHero() {

  const route = useRouter();

  return (
    <Hero
      title="Dive Into Adventure"
      subtitle="From beginner to pro, we guide your underwater adventure"
      backgroundImage="/asset/homehero.png"
      showButtons
      primaryButtonText="View Classes"
      secondaryButtonText="See Schedule"
      onPrimaryClick={() => route.push("/courses")}
      onSecondaryClick={() => console.log("Schedule clicked")}
      
    />
  );
}
