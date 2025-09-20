"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductCreate from "../website/shop/ProductCreate";

interface ProductCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductCreateModal({ isOpen, onClose }: ProductCreateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-lg font-semibold">Create New Product</DialogTitle>
        </DialogHeader>
        
        <div className="p-6">
          <ProductCreate />
        </div>
      </DialogContent>
    </Dialog>
  );
}
