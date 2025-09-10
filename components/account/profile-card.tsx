"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Camera } from "lucide-react";
import { useRef } from "react";

interface ProfileCardProps {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl?: string;
  onEdit?: () => void;
  showEditButton?: boolean;
  onImageUpload?: (file: File) => void;
  isEditing?: boolean;
}

export function ProfileCard({
  name,
  email,
  phone,
  location,
  avatarUrl,
  onEdit,
  showEditButton = false,
  onImageUpload,
  isEditing = false,
}: ProfileCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm md:h-[calc(100vh-100px)]">
      <div className="profile-card-bg h-24 sm:h-32 relative">
        {showEditButton && (
          <Button
            size="sm"
            className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
            onClick={onEdit}
          >
            <Edit className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 -mt-12 sm:-mt-16 relative">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <Avatar
              className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white mb-4 cursor-pointer"
              onClick={isEditing ? handleImageUpload : undefined}
            >
              <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={name} />
              <AvatarFallback className="text-lg sm:text-xl font-semibold bg-[#68706a] text-white">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <div
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer mb-4"
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
            className="hidden"
          />

          <h3 className="text-lg sm:text-xl font-semibold text-[#364039] mb-1 text-center">
            {name}
          </h3>
          <p className="text-[#68706a] text-sm mb-4 sm:mb-6 text-center">
            {email}
          </p>

          <div className="w-full space-y-2 sm:space-y-3 text-sm">
            <div>
              <span className="font-medium text-[#364039]">Name: </span>
              <span className="text-[#68706a]">{name}</span>
            </div>
            <div>
              <span className="font-medium text-[#364039]">Email: </span>
              <span className="text-[#68706a] break-all">{email}</span>
            </div>
            <div>
              <span className="font-medium text-[#364039]">Phone: </span>
              <span className="text-[#68706a]">{phone}</span>
            </div>
            <div>
              <span className="font-medium text-[#364039]">Location: </span>
              <span className="text-[#68706a]">{location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
