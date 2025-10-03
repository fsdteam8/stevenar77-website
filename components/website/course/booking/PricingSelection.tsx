"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { CourseDetail } from "@/lib/course";
import { useBooking } from "../booking-context";

interface CoursData {
  courseData: CourseDetail;
}
interface CourseProps {
  courseData: CoursData;
}

export function PricingSelection({ courseData }: CourseProps) {
  const { state, dispatch } = useBooking();

  const addOns = courseData?.courseData?.addOnce || [];

  const isAddonSelected = (addonId: string) => {
    return state.addOns.some((addon) => addon.id === addonId);
  };

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <h2 className="text-2xl font-semibold text-[#343a40]">
          Choose Your Pricing + Add-On
        </h2>
      </CardHeader>

      <div className="flex p-6 justify-between items-center gap-5">
        {/* Add-On */}
        <div className="space-y-2">
          <p className="font-medium text-[#343a40] mb-2">Add-Ons</p>

          {addOns.map((item) => (
            <label
              key={item._id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={isAddonSelected(item._id || "")}
                onCheckedChange={() =>
                  dispatch({
                    type: "TOGGLE_ADDON",
                    payload: {
                      id: item._id || "",
                      title: item.title,
                      price: item.price,
                    },
                  })
                }
              />
              <span>
                {item.title} — ${item.price}
              </span>
            </label>
          ))}
        </div>
      </div>
    </Card>
  );
}
