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
      <DialogContent className="max-w-md p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 bg-[#feecee] rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-[#e5102e]" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#364039] mb-2">
              Are You Sure?
            </h2>
            <p className="text-[#68706a] text-sm">
              Are you sure you want to log out?
            </p>
          </div>

          <div className="flex space-x-3 w-full pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 text-[#68706a] border-[#e6e7e6] bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-[#e5102e] hover:bg-[#e5102e]/90 text-white"
            >
              Log Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
