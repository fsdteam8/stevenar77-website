// this is useAbout.ts hook page


"use client";

import { useQuery } from "@tanstack/react-query";
import { getAbout } from "./api";

export const useAbout = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
  });
};
