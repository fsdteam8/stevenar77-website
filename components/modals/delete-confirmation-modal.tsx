"use client";

import { AlertTriangle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const defaultMessage = `Are you sure you want to delete this ${itemType}?`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0 bg-white rounded-2xl border-0 shadow-2xl">
        <div className="flex flex-col items-center text-center p-8">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-[#e5102e]" />
          </div>

          <h2 className="text-xl font-semibold text-[#343a40] mb-2">{title}</h2>

          <p className="text-[#68706a] mb-8">{message || defaultMessage}</p>

          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 border-gray-300 text-[#68706a] hover:bg-gray-50 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 h-12 bg-[#e5102e] hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
