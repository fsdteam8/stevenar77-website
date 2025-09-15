"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileCard } from "../profile-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "@/services/hooks/profile/useProfile";
import { useUpdateProfile } from "@/services/hooks/profile/useUpdateProfile";
import { useUploadAvatar } from "@/services/hooks/profile/useUploadAvatar";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  streetAddress: string;
  location: string;
  postalCode: string;
  phone: string;
  dateOfBirth: string;
}

export const ProfilePage = () => {
  const { data: user, isLoading, isError, error } = useProfile();
  const updateMutation = useUpdateProfile();
  const uploadMutation = useUploadAvatar();

  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("/images/profile-mini.jpg");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    location: "",
    postalCode: "",
    phone: "",
    dateOfBirth: "",
  });

  // Populate form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        streetAddress: user.streetAddress ?? user.location ?? "",
        location: user.location ?? "",
        postalCode: user.postalCode ?? "",
        phone: user.phone ?? "",
        // Format dateOfBirth as YYYY-MM-DD for input[type=date]
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : "",
      });
      setAvatarUrl(user.image?.url ?? "/professional-bearded-man.png");
    }
  }, [user]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (file: File) => {
    uploadMutation.mutate(file, {
      onSuccess: (updatedUser) => {
        setAvatarUrl(updatedUser.image?.url ?? avatarUrl);
      },
      onError: (err) => console.error("Failed to upload avatar:", err),
    });
  };

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync(formData);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleDiscard = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        streetAddress: user.streetAddress ?? user.location ?? "",
        location: user.location ?? "",
        postalCode: user.postalCode ?? "",
        phone: user.phone ?? "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : "",
      });
      setAvatarUrl(user.image?.url ?? "/professional-bearded-man.png");
    }
  };

  // Format field names for display
  const formatFieldName = (fieldName: string) => {
    const fieldLabels: Record<string, string> = {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      streetAddress: "Street Address",
      location: "Location",
      postalCode: "Postal Code",
      phone: "Phone",
      dateOfBirth: "Date of Birth",
    };
    return fieldLabels[fieldName] || fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-2 sm:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col items-center">
                <Skeleton className="h-24 w-24 rounded-full mb-4" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index}>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-2 sm:px-0">
        <div className="bg-white rounded-lg p-6 shadow-sm text-center mt-8">
          <p className="text-red-500 text-lg mb-4">
            {error instanceof Error ? error.message : "Failed to load profile"}
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            className="teal-primary text-white hover:bg-[#0694a2]/90"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-1">
          <ProfileCard
            name={`${formData.firstName} ${formData.lastName}`.trim() || "No Name"}
            email={formData.email || "No Email"}
            phone={formData.phone || "No Phone"}
            location={formData.streetAddress || "No Address"}
            avatarUrl={avatarUrl}
            showEditButton={!isEditing}
            onEdit={() => setIsEditing(true)}
            onImageUpload={handleImageUpload}
            isEditing={isEditing}
          />
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm h-[calc(100vh-100px)] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#364039] mb-2">
              Personal Information
            </h2>
            <p className="text-[#68706a] text-sm sm:text-base mb-4">
              Manage your personal information and profile details.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key}>
                  <Label htmlFor={key} className="text-[#364039] font-medium">
                    {formatFieldName(key)}
                  </Label>
                  <Input
                    id={key}
                    type={key === "dateOfBirth" ? "date" : key === "email" ? "email" : "text"}
                    value={value}
                    onChange={(e) => handleInputChange(key as keyof FormData, e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder={isEditing ? `Enter your ${formatFieldName(key).toLowerCase()}` : ""}
                  />
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
                <Button 
                  variant="outline" 
                  onClick={handleDiscard} 
                  className="w-full sm:w-auto"
                  disabled={updateMutation.isPending || uploadMutation.isPending}
                >
                  Discard Changes
                </Button>
                <Button
                  onClick={handleSave}
                  className="teal-primary text-white hover:bg-[#0694a2]/90 w-full sm:w-auto"
                  disabled={updateMutation.isPending || uploadMutation.isPending}
                >
                  {updateMutation.isPending || uploadMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};