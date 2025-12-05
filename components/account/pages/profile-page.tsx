// components/account/pages/profile-page.tsx
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
import { toast } from "sonner";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  location: string;
  state: string;
  postalCode: string;
  phone: string;
  age: string;
  hight: string; // Backend expects this (decimal number as string)
  weight: string;
  shoeSize: string;
  dateOfBirth: string;
}

// Helper functions for height conversion
const convertHeightToDecimal = (feet: string, inches: string): string => {
  const ft = parseFloat(feet) || 0;
  const inch = parseFloat(inches) || 0;
  return (ft + inch / 12).toFixed(2);
};

const convertDecimalToFeetInches = (
  decimal: string,
): { feet: string; inches: string } => {
  const h = parseFloat(decimal);
  if (isNaN(h)) return { feet: "", inches: "" };

  const ft = Math.floor(h);
  const inch = Math.round((h - ft) * 12);

  return { feet: ft.toString(), inches: inch.toString() };
};

export const ProfilePage = () => {
  const { data: user, isLoading, isError, error } = useProfile();
  const updateMutation = useUpdateProfile();
  const uploadMutation = useUploadAvatar();

  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "/images/profile-mini.jpg",
  );

  // Separate feet & inches for UI
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    location: "",
    state: "",
    postalCode: "",
    phone: "",
    dateOfBirth: "",
    age: "",
    hight: "",
    weight: "",
    shoeSize: "",
  });

  // Populate form data when user loads
  useEffect(() => {
    if (user) {
      // Convert backend height to feet and inches
      const { feet: ft, inches: inch } = convertDecimalToFeetInches(
        user.hight ?? "",
      );
      setFeet(ft);
      setInches(inch);

      setFormData({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        street: user.street ?? "",
        location: user.location ?? "",
        state: user.state ?? "",
        postalCode: user.postalCode ?? "",
        phone: user.phone ?? "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : "",
        age: user.age ?? "",
        hight: user.hight ?? "",
        weight: user.weight ?? "",
        shoeSize: user.shoeSize ?? "",
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
    // Convert feet & inches to decimal for backend
    const hightForBackend = convertHeightToDecimal(feet, inches);

    try {
      await updateMutation.mutateAsync({
        ...formData,
        hight: hightForBackend,
        streetAddress: formData.street,
        phoneNumber: formData.phone,
        state: formData.state,
      });
      toast.success("Your profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      toast.error(`Failed to update profile: ${err}`);
      console.error("Failed to update profile:", err);
    }
  };

  const handleDiscard = () => {
    setIsEditing(false);
    if (user) {
      // setFormData({
      //   firstName: user.firstName ?? "",
      //   lastName: user.lastName ?? "",
      //   email: user.email ?? "",
      //   street: user.street ?? "",
      //   location: user.location ?? "",
      //   state: user.state ?? "",
      //   postalCode: user.postalCode ?? "",
      //   phone: user.phone ?? "",
      //   dateOfBirth: user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : "",
      //   age: user.age ?? "",
      //   hight: user.hight ?? "",
      //   weight: user.weight ?? "",
      //   shoeSize: user.shoeSize ?? "",
      // });

      setFormData({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        street: user.street ?? "",
        location: user.location ?? "",
        state: user.state ?? "",
        postalCode: user.postalCode ?? "",
        phone: user.phone ?? "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : "",
        age: user.age ?? "",
        hight: user.hight ?? "",
        weight: user.weight ?? "",
        shoeSize: user.shoeSize ?? "",
      });

      // Reset feet & inches from backend value
      const { feet: ft, inches: inch } = convertDecimalToFeetInches(
        user.hight ?? "",
      );
      setFeet(ft);
      setInches(inch);

      setAvatarUrl(user.image?.url ?? "/professional-bearded-man.png");
    }
  };

  const formatFieldName = (fieldName: string) => {
    const fieldLabels: Record<string, string> = {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      street: "Street Address",
      location: "City",
      postalCode: "Zip Code",
      state: "State",
      phone: "Cell Phone",
      dateOfBirth: "Date of Birth",
      age: "Age",
      hight: "Height",
      weight: "Weight",
      shoeSize: "Shoe Size",
    };
    return (
      fieldLabels[fieldName] ||
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    );
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
            name={
              `${formData.firstName} ${formData.lastName}`.trim() ||
              "No Name Provided"
            }
            email={formData.email || "No Email Provided"}
            phone={formData.phone || "No PhoneNumber Provided"}
            location={formData.location || "No City Provided"}
            street={formData.street || "No Address Provided"}
            postalCode={formData.postalCode || "No PostalCode Provided"}
            states={formData.state || "No State Provided"}
            age={formData.age || "No Age Provided"}
            height={formData.hight || ""}
            weight={formData.weight || "No Weight Provided"}
            shoeSize={formData.shoeSize || "No Shoe Size Provided"}
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
              {Object.entries(formData).map(([key, value]) => {
                if (key === "hight") {
                  return (
                    <div key={key} className="space-y-2">
                      <Label
                        htmlFor="feet"
                        className="text-[#364039] font-medium"
                      >
                        Height (ft/in)
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="feet"
                          type="number"
                          value={feet}
                          onChange={(e) => setFeet(e.target.value)}
                          disabled={!isEditing}
                          placeholder="Feet"
                          min="0"
                          max="8"
                        />
                        <Input
                          id="inches"
                          type="number"
                          value={inches}
                          onChange={(e) => setInches(e.target.value)}
                          disabled={!isEditing}
                          placeholder="Inches"
                          min="0"
                          max="11"
                        />
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="text-[#364039] font-medium">
                      {formatFieldName(key)}
                    </Label>
                    <Input
                      id={key}
                      type={
                        key === "dateOfBirth"
                          ? "date"
                          : key === "email"
                            ? "email"
                            : "text"
                      }
                      value={value} // empty string if missing
                      onChange={(e) =>
                        handleInputChange(key as keyof FormData, e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1"
                      placeholder={
                        isEditing
                          ? `Enter your ${formatFieldName(key).toLowerCase()}`
                          : ""
                      }
                    />

                    {/* <Input
                      id={key}
                      type={
                        key === "dateOfBirth"
                          ? "date"
                          : key === "email"
                            ? "email"
                            : "text"
                      }
                      value={value}
                      onChange={(e) =>
                        handleInputChange(key as keyof FormData, e.target.value)
                      }
                      disabled={!isEditing}
                      className="mt-1"
                      placeholder={
                        isEditing
                          ? `Enter your ${formatFieldName(key).toLowerCase()}`
                          : ""
                      }
                    /> */}
                  </div>
                );
              })}
            </div>

            {isEditing && (
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
                <Button
                  variant="outline"
                  onClick={handleDiscard}
                  className="w-full sm:w-auto"
                  disabled={
                    updateMutation.isPending || uploadMutation.isPending
                  }
                >
                  Discard Changes
                </Button>
                <Button
                  onClick={handleSave}
                  className="teal-primary text-white hover:bg-[#0694a2]/90 w-full sm:w-auto"
                  disabled={
                    updateMutation.isPending || uploadMutation.isPending
                  }
                >
                  {updateMutation.isPending || uploadMutation.isPending
                    ? "Saving..."
                    : "Save Changes"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
