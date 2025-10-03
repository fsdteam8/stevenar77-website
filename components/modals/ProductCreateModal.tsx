"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductCreate from "../website/order/ProductCreate";


interface ProductCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
}

export function ProductCreateModal({ isOpen, onClose, productId }: ProductCreateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!min-w-[700px] p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-lg font-semibold">Create Order</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <ProductCreate productId={productId} onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
