'use client';
import { fetchSocial } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface data {
  
    facebook:string;
    instagram:string;
    location:string;
    email:string;
    PhoneNumber:string;
}
export interface social {
  
  data:data[]
}
export const useSocial = () => {
  return useQuery({
    queryKey: ["social"],
    queryFn: () => fetchSocial(),
  });
};