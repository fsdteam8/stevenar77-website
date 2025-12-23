// store/formStore.ts
import { create } from "zustand";

interface FormData {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  age?: string;
  address?: string;
  gender?: string;
  country?: string;
  file?: File | Blob;
}

interface FormStore {
  data: Record<string, Record<string, FormData>>;
  completedForms: Record<string, string[]>;
  setFormData: (cartId: string, formTitle: string, formData: FormData) => void;
  setFormCompleted: (
    cartId: string,
    formTitle: string,
    file: File | Blob,
  ) => void;
  getFormData: (cartId: string) => Record<string, FormData>;
  checkAllFormsComplete: (cartId: string, requiredTitles: string[]) => boolean;
}

export const useFormStore = create<FormStore>((set, get) => ({
  data: {},
  completedForms: {},
  setFormData: (cartId, formTitle, formData) => {
    set((state) => ({
      data: {
        ...state.data,
        [cartId]: {
          ...(state.data[cartId] || {}),
          [formTitle]: {
            ...((state.data[cartId] || {})[formTitle] || {}),
            ...formData,
          },
        },
      },
    }));
  },
  setFormCompleted: (cartId, formTitle, file) => {
    set((state) => {
      const currentCompleted = state.completedForms[cartId] || [];
      const newCompleted = currentCompleted.includes(formTitle)
        ? currentCompleted
        : [...currentCompleted, formTitle];

      return {
        completedForms: {
          ...state.completedForms,
          [cartId]: newCompleted,
        },
        data: {
          ...state.data,
          [cartId]: {
            ...(state.data[cartId] || {}),
            [formTitle]: {
              ...((state.data[cartId] || {})[formTitle] || {}),
              file, // Store the file
            },
          },
        },
      };
    });
  },
  getFormData: (cartId) => get().data[cartId] || {},
  checkAllFormsComplete: (cartId, requiredTitles) => {
    const completed = get().completedForms[cartId] || [];
    return requiredTitles.every((title) => completed.includes(title));
  },
}));
