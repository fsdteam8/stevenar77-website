"use client";

import { AlertTriangle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import useIsMobile from "@/services/hooks/use-mobile";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemType?: string;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are You Sure?",
  message,
  itemType = "item",
}: DeleteConfirmationModalProps) {
  // const isMobile = useIsMobile();
  const defaultMessage = `Are you sure you want to delete this ${itemType}?`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-md mx-auto p-0 gap-0 bg-white rounded-2xl border-0 shadow-2xl">
        <div className="flex flex-col items-center text-center p-6 sm:p-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-50 flex items-center justify-center mb-3 sm:mb-4">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-[#e5102e]" />
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-[#343a40] mb-2">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-[#68706a] mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
            {message || defaultMessage}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11 sm:h-12 border-gray-300 text-[#68706a] hover:bg-gray-50 bg-transparent text-sm sm:text-base"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 h-11 sm:h-12 bg-[#e5102e] hover:bg-red-700 text-white text-sm sm:text-base"
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
