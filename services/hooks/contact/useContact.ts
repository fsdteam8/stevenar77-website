// hooks/useContact.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { submitContact, ContactPayload, ContactResponse } from "@/lib/contact";

export function useContact() {
  return useMutation<ContactResponse, Error, ContactPayload>({
    mutationFn: submitContact,
  });
}
