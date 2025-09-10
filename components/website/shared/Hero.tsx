"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import clsx from "clsx";

type HeroProps = {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  showButtons?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  size?: "full" | "small";
};

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  showButtons = false,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  size = "full",
}) => {
  return (
    <div
      className={clsx(
        "relative flex items-center justify-center text-center  text-white",
        size === "full" ? "h-screen" : "h-[60vh]"
      )}
    >
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={title}
        fill
        className="object-cover brightness-75"
        priority
      />

      {/* Overlay Content */}
      <div className="relative z-10 max-w-4xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-montserrat">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-[16px] leading-[150%] text-[#FFFFFF]  font-normal">{subtitle}</p>
        )}

        {showButtons && (
          <div className="mt-8 md:mt-[46px] flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryButtonText && (
              <Button
                size="lg"
                className="bg-cyan-600 px-12  py-[12px] hover:bg-cyan-700"
                onClick={onPrimaryClick}
              >
                {primaryButtonText}
              </Button>
            )}
            {secondaryButtonText && (
              <Button
                size="lg"
                variant="outline"
                className="text-white hover:text-white px-12  py-[12px] bg-transparent border-white hover:bg-white/10"
                onClick={onSecondaryClick}
              >
                {secondaryButtonText}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

export default Hero;
