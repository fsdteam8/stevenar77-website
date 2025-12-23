import { create } from "zustand";

interface ToastState {
  message: string;
  visible: boolean;
  type: 'info' | 'warning';
  showToast: (message: string, type?: 'info' | 'warning') => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: '',
  visible: false,
  type: 'info',
  showToast: (message, type = 'info') => set({ message, type, visible: true }),
  hideToast: () => set({ visible: false }),
}));
