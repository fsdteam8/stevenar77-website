"use client";
import React, { createContext, useContext, useState } from "react";

type ModalId =
  | "modal1"
  | "modal2"
  | "modal3"
  | "modal4"
  | "modal5"
  | "modal6"
  | "modal7"
  | "modal8"
  | "modal9";

interface SubmittedFormsContextType {
  submittedForms: ModalId[];
  markFormSubmitted: (formId: ModalId) => void;
  resetForms: () => void;
}

const SubmittedFormsContext = createContext<SubmittedFormsContextType | undefined>(undefined);

export const SubmittedFormsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [submittedForms, setSubmittedForms] = useState<ModalId[]>([]);

  const markFormSubmitted = (formId: ModalId) => {
    setSubmittedForms((prev) => (prev.includes(formId) ? prev : [...prev, formId]));
  };

  const resetForms = () => setSubmittedForms([]);

  return (
    <SubmittedFormsContext.Provider value={{ submittedForms, markFormSubmitted, resetForms }}>
      {children}
    </SubmittedFormsContext.Provider>
  );
};

export const useSubmittedForms = () => {
  const context = useContext(SubmittedFormsContext);
  if (!context) throw new Error("useSubmittedForms must be used within SubmittedFormsProvider");
  return context;
};
