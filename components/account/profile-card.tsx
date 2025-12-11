"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Camera } from "lucide-react";

interface ProfileCardProps {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl?: string;
  street?: string;
  states?: string;
  age?: string;
  height?: string; // Decimal number as string from backend
  weight?: string;
  shoeSize?: string;
  postalCode?: string;
  onEdit?: () => void;
  showEditButton?: boolean;
  onImageUpload?: (file: File) => void;
  isEditing?: boolean;
}

// Helper function to format height display
const formatHeight = (height: string): string => {
  if (!height) return "";

  const h = parseFloat(height);
  if (isNaN(h)) return "";

  const ft = Math.floor(h);
  const inch = Math.round((h - ft) * 12);

  return `${ft} ft ${inch} in`;
};

export function ProfileCard({
  name,
  email,
  phone,
  location,
  avatarUrl,
  street,
  states,
  age,
  height,
  weight,
  shoeSize,
  postalCode,
  onEdit,
  showEditButton = false,
  onImageUpload,
  isEditing = false,
}: ProfileCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Local preview
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);

    // Pass to parent for server upload
    if (onImageUpload) onImageUpload(file);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm md:h-[calc(100vh-100px)] overflow-y-auto">
      <div className="profile-card-bg h-24 sm:h-32 relative"></div>
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 -mt-12 sm:-mt-16 relative">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <Avatar
              className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white mb-4 cursor-pointer"
              onClick={isEditing ? handleImageUpload : undefined}
            >
              <AvatarImage
                src={previewUrl || avatarUrl || "/placeholder.svg"}
                alt={name}
                className="object-cover"
              />
              <AvatarFallback className="text-lg sm:text-xl font-semibold bg-[#68706a] text-white">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <div
                className="absolute inset-0 object-cover bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer mb-4"
                onClick={handleImageUpload}
              >
                <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden object-cover"
          />

          <h3 className="text-lg sm:text-xl font-semibold text-[#364039] mb-1 text-center">
            {name || "Your Name"}
          </h3>
          <p className="text-[#68706a] text-sm mb-4 sm:mb-6 text-center">
            {email || "your.email@example.com"}
          </p>

          <div className="w-full space-y-2 sm:space-y-3 text-sm">
            <div>
              <span className="font-medium text-[#364039]">Name: </span>
              <span
                className={name ? "text-[#68706a]" : "text-gray-400 italic"}
              >
                {name || "Enter your name"}
              </span>
            </div>
            <div>
              <span className="font-medium text-[#364039]">Email: </span>
              <span
                className={
                  email ? "text-[#68706a] break-all" : "text-gray-400 italic"
                }
              >
                {email || "Enter your email"}
              </span>
            </div>
            <div>
              <span className="font-medium text-[#364039]">Cell: </span>
              <span
                className={phone ? "text-[#68706a]" : "text-gray-400 italic"}
              >
                {phone || "Enter your cell"}
              </span>
            </div>
            <div>
              <span className="font-medium text-[#364039]">
                Street Address:{" "}
              </span>
              <span
                className={street ? "text-[#68706a]" : "text-gray-400 italic"}
              >
                {street || "Enter your street address"}
              </span>
            </div>
            <div>
              <span className="font-medium text-[#364039]">City: </span>
              <span
                className={location ? "text-[#68706a]" : "text-gray-400 italic"}
              >
                {location || "Enter your city"}
              </span>
            </div>

            <div>
              <span className="font-medium text-[#364039]">State: </span>
              <span
                className={states ? "text-[#68706a]" : "text-gray-400 italic"}
              >
                {states || "Enter your state"}
              </span>
            </div>

            <div>
              <span className="font-medium text-[#364039]">Zip Code: </span>
              <span
                className={
                  postalCode ? "text-[#68706a]" : "text-gray-400 italic"
                }
              >
                {postalCode || "Enter your zip code"}
              </span>
            </div>
            <div>
              <span className="font-medium text-[#364039]">Age: </span>
              <span className={age ? "text-[#68706a]" : "text-gray-400 italic"}>
                {age || "Enter your age"}
              </span>
            </div>
            <div>
              <span className="font-medium text-[#364039]">Height: </span>
              <span
                className={height ? "text-[#68706a]" : "text-gray-400 italic"}
              >
                {height ? formatHeight(height) : "Enter your height"}
              </span>
            </div>
            <div>
              <span className="font-medium text-[#364039]">Weight: </span>
              <span
                className={weight ? "text-[#68706a]" : "text-gray-400 italic"}
              >
                {weight || "Enter your weight"}
              </span>
            </div>
            <div>
              <span className="font-medium text-[#364039]">Shoe Size: </span>
              <span
                className={shoeSize ? "text-[#68706a]" : "text-gray-400 italic"}
              >
                {shoeSize || "Enter your shoe size"}
              </span>
            </div>
          </div>
          <div className="">
            {showEditButton && (
              <Button
                size="sm"
                className="top-25 sm:top-35 right-35 sm:right-50 bg-primary hover:bg-teal-500 text-white border-white/30"
                onClick={onEdit}
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
