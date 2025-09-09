"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileCard } from "../profile-card";

export function ChangePasswordPage() {
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
    value: string
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

  const handleSave = () => {
    // Handle save logic here
    console.log("Save password changes");
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
        isValid ? "text-[#0694a2]" : "text-[#e5102e]"
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
          <ProfileCard
            name="Gustavo Mango"
            email="bessieedwards@gmail.com"
            phone="+1 (555) 123-4567"
            location="1234 Oak Avenue, San Francisco, CA 94102A"
          />
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm h-[calc(100vh-100px)]">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#364039] mb-2">
                Changes Password
              </h2>
              <p className="text-[#68706a] text-sm sm:text-base">
                Manage your account preferences, security settings, and privacy
                options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                        "border-[#e5102e] focus:ring-[#e5102e]"
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

            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              <ValidationRule
                isValid={validationRules.minLength}
                text="Minimum 8-12 characters (recommend 12+ for stronger security)."
              />
              <ValidationRule
                isValid={validationRules.uppercase}
                text="At least one uppercase letter must."
              />
              <ValidationRule
                isValid={validationRules.lowercase}
                text="At least one lowercase letter must."
              />
              <ValidationRule
                isValid={validationRules.number}
                text="At least one number must (0-9)."
              />
              <ValidationRule
                isValid={!validationRules.specialChar}
                text="At least special character (! @ # $ % ^ & * etc.)."
              />
              <ValidationRule
                isValid={validationRules.noSpaces}
                text="No spaces allowed."
              />
            </div>

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
                className="teal-primary text-white hover:bg-[#0694a2]/90 w-full sm:w-auto"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
