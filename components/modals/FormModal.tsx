"use client";

import { ReactNode } from "react";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const FormModal = ({ isOpen, onClose, title, children }: FormModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-bold">{title || "Form"}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold text-xl"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>

        {/* Footer (optional) */}
        <div className="px-6 py-4 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
