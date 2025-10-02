"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] !max-w-md mx-auto p-4 sm:p-6">
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#feecee] rounded-full flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-[#e5102e]" />
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-semibold text-[#364039] mb-2">
              Are You Sure?
            </h2>
            <p className="text-[#68706a] text-sm leading-relaxed px-2 sm:px-0">
              Are you sure you want to log out?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-10 sm:h-auto text-[#68706a] border-[#e6e7e6] bg-transparent text-sm sm:text-base"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 h-10 sm:h-auto bg-[#e5102e] hover:bg-[#e5102e]/90 text-white text-sm sm:text-base"
            >
              Log Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
