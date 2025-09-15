// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Eye, EyeOff, Check, X } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { ProfileCard } from "../profile-card";

// // ✅ Custom hooks
// import { useProfile } from "@/services/hooks/profile/useProfile";
// import { useChangePassword } from "@/services/hooks/auth/useChangePassword";

// export function ChangePasswordPage() {
//   const { data: user, isLoading: profileLoading, isError: profileError } = useProfile();
//   const changePasswordMutation = useChangePassword();

//   const [showPasswords, setShowPasswords] = useState({
//     current: false,
//     new: false,
//     confirm: false,
//   });

//   const [passwords, setPasswords] = useState({
//     current: "",
//     new: "",
//     confirm: "",
//   });

//   const [validationRules, setValidationRules] = useState({
//     minLength: false,
//     uppercase: false,
//     lowercase: false,
//     number: false,
//     specialChar: false,
//     noSpaces: true,
//   });

//   const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
//     setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
//   };

//   const handlePasswordChange = (
//     field: keyof typeof passwords,
//     value: string
//   ) => {
//     setPasswords((prev) => ({ ...prev, [field]: value }));

//     if (field === "new") {
//       setValidationRules({
//         minLength: value.length >= 8 && value.length <= 12,
//         uppercase: /[A-Z]/.test(value),
//         lowercase: /[a-z]/.test(value),
//         number: /[0-9]/.test(value),
//         specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
//         noSpaces: !value.includes(" "),
//       });
//     }
//   };

//   const handleSave = async () => {
//     if (passwords.new !== passwords.confirm) {
//       alert("New password and confirm password do not match");
//       return;
//     }

//     try {
//       await changePasswordMutation.mutateAsync({
//         currentPassword: passwords.current,
//         newPassword: passwords.new,
//       });
//       alert("Password updated successfully");
//       handleDiscard();
//     } catch (error) {
//       console.error("Failed to change password:", error);
//       alert("Failed to change password. Please try again.");
//     }
//   };

//   const handleDiscard = () => {
//     setPasswords({ current: "", new: "", confirm: "" });
//     setValidationRules({
//       minLength: false,
//       uppercase: false,
//       lowercase: false,
//       number: false,
//       specialChar: false,
//       noSpaces: true,
//     });
//   };

//   const ValidationRule = ({
//     isValid,
//     text,
//   }: {
//     isValid: boolean;
//     text: string;
//   }) => (
//     <div
//       className={cn(
//         "flex items-center space-x-2 text-sm",
//         isValid ? "text-[#0694a2]" : "text-[#e5102e]"
//       )}
//     >
//       {isValid ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
//       <span>{text}</span>
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-2 sm:px-0">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//         <div className="lg:col-span-1">
//           {profileLoading ? (
//             <p>Loading...</p>
//           ) : profileError ? (
//             <p className="text-red-500">Failed to load profile</p>
//           ) : (
//             user && (
//               <ProfileCard
//             name={`${formData.firstName} ${formData.lastName}`.trim() || "No Name"}
//             email={formData.email || "No Email"}
//             phone={formData.phone || "No Phone"}
//             location={formData.streetAddress || "No Address"}
//             avatarUrl={avatarUrl}
//             showEditButton={!isEditing}
//             onEdit={() => setIsEditing(true)}
//             onImageUpload={handleImageUpload}
//             isEditing={isEditing}
//           />
//             )
//           )}
//         </div>

//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm h-[calc(100vh-100px)]">
//             <div className="mb-4 sm:mb-6">
//               <h2 className="text-xl sm:text-2xl font-semibold text-[#364039] mb-2">
//                 Change Password
//               </h2>
//               <p className="text-[#68706a] text-sm sm:text-base">
//                 Manage your account preferences, security settings, and privacy
//                 options.
//               </p>
//             </div>

//             {/* Password Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//               {/* Current Password */}
//               <div>
//                 <Label htmlFor="currentPassword" className="text-[#364039] font-medium">
//                   Current Password
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="currentPassword"
//                     type={showPasswords.current ? "text" : "password"}
//                     value={passwords.current}
//                     onChange={(e) => handlePasswordChange("current", e.target.value)}
//                     className="mt-1 pr-10"
//                     placeholder="********"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => togglePasswordVisibility("current")}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#68706a] hover:text-[#364039]"
//                   >
//                     {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>

//               {/* New Password */}
//               <div>
//                 <Label htmlFor="newPassword" className="text-[#364039] font-medium">
//                   New Password
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="newPassword"
//                     type={showPasswords.new ? "text" : "password"}
//                     value={passwords.new}
//                     onChange={(e) => handlePasswordChange("new", e.target.value)}
//                     className="mt-1 pr-10"
//                     placeholder="********"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => togglePasswordVisibility("new")}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#68706a] hover:text-[#364039]"
//                   >
//                     {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div className="md:col-span-2">
//                 <Label htmlFor="confirmPassword" className="text-[#364039] font-medium">
//                   Confirm New Password
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="confirmPassword"
//                     type={showPasswords.confirm ? "text" : "password"}
//                     value={passwords.confirm}
//                     onChange={(e) => handlePasswordChange("confirm", e.target.value)}
//                     className={cn(
//                       "mt-1 pr-10",
//                       passwords.confirm &&
//                         passwords.new !== passwords.confirm &&
//                         "border-[#e5102e] focus:ring-[#e5102e]"
//                     )}
//                     placeholder="********"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => togglePasswordVisibility("confirm")}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#68706a] hover:text-[#364039]"
//                   >
//                     {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Validation Rules */}
//             <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
//               <ValidationRule isValid={validationRules.minLength} text="Minimum 8-12 characters (recommend 12+)." />
//               <ValidationRule isValid={validationRules.uppercase} text="At least one uppercase letter." />
//               <ValidationRule isValid={validationRules.lowercase} text="At least one lowercase letter." />
//               <ValidationRule isValid={validationRules.number} text="At least one number (0-9)." />
//               <ValidationRule isValid={validationRules.specialChar} text="At least one special character (! @ # $ % etc.)." />
//               <ValidationRule isValid={validationRules.noSpaces} text="No spaces allowed." />
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
//               <Button
//                 variant="outline"
//                 onClick={handleDiscard}
//                 className="text-[#68706a] border-[#e6e7e6] bg-transparent w-full sm:w-auto"
//               >
//                 Discard Changes
//               </Button>
//               <Button
//                 onClick={handleSave}
//                 disabled={changePasswordMutation.isLoading}
//                 className="teal-primary text-white hover:bg-[#0694a2]/90 w-full sm:w-auto"
//               >
//                 {changePasswordMutation.isLoading ? "Saving..." : "Save Changes"}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileCard } from "../profile-card";

// ✅ Custom hooks
import { useProfile } from "@/services/hooks/profile/useProfile";
import { useChangePassword } from "@/services/hooks/auth/useChangePassword";

export function ChangePasswordPage() {
  const {
    data: user,
    isLoading: profileLoading,
    isError: profileError,
  } = useProfile();

  const changePasswordMutation = useChangePassword();

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [validationRules, setValidationRules] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    noSpaces: true,
  });

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordChange = (
    field: keyof typeof passwords,
    value: string,
  ) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));

    if (field === "new") {
      setValidationRules({
        minLength: value.length >= 8 && value.length <= 12,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        noSpaces: !value.includes(" "),
      });
    }
  };

  const handleSave = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });
      alert("Password updated successfully");
      handleDiscard();
    } catch (error) {
      console.error("Failed to change password:", error);
      alert("Failed to change password. Please try again.");
    }
  };

  const handleDiscard = () => {
    setPasswords({ current: "", new: "", confirm: "" });
    setValidationRules({
      minLength: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
      noSpaces: true,
    });
  };

  const ValidationRule = ({
    isValid,
    text,
  }: {
    isValid: boolean;
    text: string;
  }) => (
    <div
      className={cn(
        "flex items-center space-x-2 text-sm",
        isValid ? "text-[#0694a2]" : "text-[#e5102e]",
      )}
    >
      {isValid ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-1">
          {profileLoading ? (
            <p>Loading...</p>
          ) : profileError ? (
            <p className="text-red-500">Failed to load profile</p>
          ) : (
            user && (
              <ProfileCard
                name={`${user.firstName ?? ""} ${user.lastName ?? ""}`}
                email={user.email ?? ""}
                phone={user.phone ?? ""}
                location={user.location ?? ""}
                avatarUrl={user.image?.url ?? ""}
              />
            )
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm h-[calc(100vh-100px)]">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#364039] mb-2">
                Change Password
              </h2>
              <p className="text-[#68706a] text-sm sm:text-base">
                Manage your account preferences, security settings, and privacy
                options.
              </p>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Current Password */}
              <div>
                <Label
                  htmlFor="currentPassword"
                  className="text-[#364039] font-medium"
                >
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) =>
                      handlePasswordChange("current", e.target.value)
                    }
                    className="mt-1 pr-10"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#68706a] hover:text-[#364039]"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <Label
                  htmlFor="newPassword"
                  className="text-[#364039] font-medium"
                >
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={passwords.new}
                    onChange={(e) =>
                      handlePasswordChange("new", e.target.value)
                    }
                    className="mt-1 pr-10"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#68706a] hover:text-[#364039]"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="md:col-span-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-[#364039] font-medium"
                >
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={(e) =>
                      handlePasswordChange("confirm", e.target.value)
                    }
                    className={cn(
                      "mt-1 pr-10",
                      passwords.confirm &&
                        passwords.new !== passwords.confirm &&
                        "border-[#e5102e] focus:ring-[#e5102e]",
                    )}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#68706a] hover:text-[#364039]"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Validation Rules */}
            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              <ValidationRule
                isValid={validationRules.minLength}
                text="Minimum 8-12 characters (recommend 12+)."
              />
              <ValidationRule
                isValid={validationRules.uppercase}
                text="At least one uppercase letter."
              />
              <ValidationRule
                isValid={validationRules.lowercase}
                text="At least one lowercase letter."
              />
              <ValidationRule
                isValid={validationRules.number}
                text="At least one number (0-9)."
              />
              <ValidationRule
                isValid={validationRules.specialChar}
                text="At least one special character (! @ # $ % etc.)."
              />
              <ValidationRule
                isValid={validationRules.noSpaces}
                text="No spaces allowed."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
              <Button
                variant="outline"
                onClick={handleDiscard}
                className="text-[#68706a] border-[#e6e7e6] bg-transparent w-full sm:w-auto"
              >
                Discard Changes
              </Button>
              <Button
                onClick={handleSave}
                disabled={changePasswordMutation.isPending}
                className="teal-primary text-white hover:bg-[#0694a2]/90 w-full sm:w-auto"
              >
                {changePasswordMutation.isPending
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
