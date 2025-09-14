// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Calendar } from "lucide-react";
// import { ProfileCard } from "../profile-card";

// export function ProfilePage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [avatarUrl, setAvatarUrl] = useState<string>(
//     "/professional-bearded-man.png"
//   );
//   const [formData, setFormData] = useState({
//     firstName: "Gustavo",
//     lastName: "Mango",
//     email: "bessieedwards@gmail.com",
//     streetAddress: "1234 Oak Avenue, San Francisco, CA 94102A",
//     location: "Florida, USA",
//     postalCode: "30301",
//     phoneNumber: "+1 (555) 123-4567",
//     dateOfBirth: "1 Feb, 1995",
//   });

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleImageUpload = (file: File) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       if (e.target?.result) {
//         setAvatarUrl(e.target.result as string);
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSave = () => {
//     // Handle save logic here
//     setIsEditing(false);
//   };

//   const handleDiscard = () => {
//     // Reset form data to original values
//     setIsEditing(false);
//   };

//   return (
//     <div className="container mx-auto px-2 sm:px-0">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//         <div className="lg:col-span-1">
//           <ProfileCard
//             name={`${formData.firstName} ${formData.lastName}`}
//             email={formData.email}
//             phone={formData.phoneNumber}
//             location={`${formData.streetAddress}`}
//             avatarUrl={avatarUrl}
//             showEditButton={!isEditing}
//             onEdit={() => setIsEditing(true)}
//             onImageUpload={handleImageUpload}
//             isEditing={isEditing}
//           />
//         </div>

//         <div className="lg:col-span-2 ">
//           <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm h-[calc(100vh-100px)]">
//             <div className="mb-4 sm:mb-6">
//               <h2 className="text-xl sm:text-2xl font-semibold text-[#364039] mb-2">
//                 Personal Information
//               </h2>
//               <p className="text-[#68706a] text-sm sm:text-base">
//                 Manage your personal information and profile details.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//               <div>
//                 <Label
//                   htmlFor="firstName"
//                   className="text-[#364039] font-medium"
//                 >
//                   First Name
//                 </Label>
//                 <Input
//                   id="firstName"
//                   value={formData.firstName}
//                   onChange={(e) =>
//                     handleInputChange("firstName", e.target.value)
//                   }
//                   disabled={!isEditing}
//                   className="mt-1"
//                 />
//               </div>

//               <div>
//                 <Label
//                   htmlFor="lastName"
//                   className="text-[#364039] font-medium"
//                 >
//                   Last Name
//                 </Label>
//                 <Input
//                   id="lastName"
//                   value={formData.lastName}
//                   onChange={(e) =>
//                     handleInputChange("lastName", e.target.value)
//                   }
//                   disabled={!isEditing}
//                   className="mt-1"
//                 />
//               </div>

//               <div className="md:col-span-2">
//                 <Label htmlFor="email" className="text-[#364039] font-medium">
//                   Email Address
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   disabled={!isEditing}
//                   className="mt-1"
//                 />
//               </div>

//               <div className="md:col-span-2">
//                 <Label
//                   htmlFor="streetAddress"
//                   className="text-[#364039] font-medium"
//                 >
//                   Street Address
//                 </Label>
//                 <Input
//                   id="streetAddress"
//                   value={formData.streetAddress}
//                   onChange={(e) =>
//                     handleInputChange("streetAddress", e.target.value)
//                   }
//                   disabled={!isEditing}
//                   className="mt-1"
//                 />
//               </div>

//               <div>
//                 <Label
//                   htmlFor="location"
//                   className="text-[#364039] font-medium"
//                 >
//                   Location
//                 </Label>
//                 <Input
//                   id="location"
//                   value={formData.location}
//                   onChange={(e) =>
//                     handleInputChange("location", e.target.value)
//                   }
//                   disabled={!isEditing}
//                   className="mt-1"
//                 />
//               </div>

//               <div>
//                 <Label
//                   htmlFor="postalCode"
//                   className="text-[#364039] font-medium"
//                 >
//                   Postal Code
//                 </Label>
//                 <Input
//                   id="postalCode"
//                   value={formData.postalCode}
//                   onChange={(e) =>
//                     handleInputChange("postalCode", e.target.value)
//                   }
//                   disabled={!isEditing}
//                   className="mt-1"
//                 />
//               </div>

//               <div>
//                 <Label
//                   htmlFor="phoneNumber"
//                   className="text-[#364039] font-medium"
//                 >
//                   Phone Number
//                 </Label>
//                 <Input
//                   id="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={(e) =>
//                     handleInputChange("phoneNumber", e.target.value)
//                   }
//                   disabled={!isEditing}
//                   className="mt-1"
//                 />
//               </div>

//               <div>
//                 <Label
//                   htmlFor="dateOfBirth"
//                   className="text-[#364039] font-medium"
//                 >
//                   Date of Birth
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="dateOfBirth"
//                     value={formData.dateOfBirth}
//                     onChange={(e) =>
//                       handleInputChange("dateOfBirth", e.target.value)
//                     }
//                     disabled={!isEditing}
//                     className="mt-1 pr-10"
//                   />
//                   <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#68706a]" />
//                 </div>
//               </div>
//             </div>

//             {isEditing && (
//               <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8 md:col-span-2">
//                 <Button
//                   variant="outline"
//                   onClick={handleDiscard}
//                   className="text-[#68706a] border-[#e6e7e6] bg-transparent w-full sm:w-auto"
//                 >
//                   Discard Changes
//                 </Button>
//                 <Button
//                   onClick={handleSave}
//                   className="teal-primary text-white hover:bg-[#0694a2]/90 w-full sm:w-auto"
//                 >
//                   Save Changes
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { ProfileCard } from "../profile-card";
import { useProfile } from "@/services/hooks/profile/useProfile";

export function ProfilePage() {
  const { data: user, isLoading, isError, error } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "/professional-bearded-man.png"
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    location: "",
    postalCode: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        streetAddress: formData.streetAddress,
        location: formData.location,
        postalCode: formData.postalCode,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setAvatarUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // TODO: implement save API
    setIsEditing(false);
  };

  const handleDiscard = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        ...formData,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  };

  if (isLoading)
    return <p className="text-center mt-8">Loading profile...</p>;

  if (isError)
    return (
      <p className="text-center mt-8 text-red-500">
        {error instanceof Error ? error.message : "Failed to load profile"}
      </p>
    );

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-1">
          <ProfileCard
            name={`${formData.firstName} ${formData.lastName}`}
            email={formData.email}
            phone={formData.phoneNumber}
            location={`${formData.streetAddress}`}
            avatarUrl={avatarUrl}
            showEditButton={!isEditing}
            onEdit={() => setIsEditing(true)}
            onImageUpload={handleImageUpload}
            isEditing={isEditing}
          />
        </div>

        <div className="lg:col-span-2 ">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm h-[calc(100vh-100px)]">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#364039] mb-2">
                Personal Information
              </h2>
              <p className="text-[#68706a] text-sm sm:text-base">
                Manage your personal information and profile details.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* First Name */}
              <div>
                <Label htmlFor="firstName" className="text-[#364039] font-medium">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              {/* Last Name */}
              <div>
                <Label htmlFor="lastName" className="text-[#364039] font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <Label htmlFor="email" className="text-[#364039] font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              {/* Street Address */}
              <div className="md:col-span-2">
                <Label htmlFor="streetAddress" className="text-[#364039] font-medium">
                  Street Address
                </Label>
                <Input
                  id="streetAddress"
                  value={formData.streetAddress}
                  onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className="text-[#364039] font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              {/* Postal Code */}
              <div>
                <Label htmlFor="postalCode" className="text-[#364039] font-medium">
                  Postal Code
                </Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phoneNumber" className="text-[#364039] font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <Label htmlFor="dateOfBirth" className="text-[#364039] font-medium">
                  Date of Birth
                </Label>
                <div className="relative">
                  <Input
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1 pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#68706a]" />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8 md:col-span-2">
                <Button
                  variant="outline"
                  onClick={handleDiscard}
                  className="text-[#68706a] border-[#e6e7e6] bg-transparent w-full sm:w-auto"
                >
                  Discard Changes
                </Button>
                <Button
                  onClick={handleSave}
                  className="teal-primary text-white hover:bg-[#0694a2]/90 w-full sm:w-auto"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
