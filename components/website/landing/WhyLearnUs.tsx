import React from "react";
import WhyLearn from "../shared/WhyLearn";
import { Award, Pocket, Users } from "lucide-react";

const WhyLearnUs = () => {
  return (
    <div className="mt-[60px] lg:mt-[80px] mx-auto container">
      <div className="mb-[30px]  text-center">
        <h2 className="text-[#252F3F] text-[48px]  leading-[120%] pb-2">
          Why Learn with Us
        </h2>
        <p className="text-[16px] text-[#6B7280] text-center w-[90%] mx-auto leading-6 font-normal">
          Experience the difference that makes Scuba Life the premier choice for diving education
        </p>
      </div>
      <div className="flex flex-wrap justify-between">
        <WhyLearn
          title="Professional Instructors"
          description="Expert-level PADI certified instructors with years of ocean experience and a passion for teaching."
          icon={<Award size={24} color="#3B82F6" />}
          className=" rounded-lg "
          iconContainerClassName="p-2 shadow-xl"
          titleClassName="text-[24px] text-[#27303F]"
          descriptionClassName=""
        />
        <WhyLearn
          title="World-Class Dive Locations"
          description="Access to some of the most beautiful and diverse underwater ecosystems in Southern California."
          icon={<Pocket size={24} color="#3B82F6" />}
          className=" rounded-lg "
          iconContainerClassName="p-2 shadow-xl"
          titleClassName="text-[24px] text-[#27303F]"
          descriptionClassName=""
        />
        <WhyLearn
          title="Lifetime Community & Adventure"
          description="Join a passionate community of divers and enjoy exclusive dive trips and events."
          icon={<Users size={24} color="#3B82F6" />}
          className="rounded-lg "
          iconContainerClassName="p-2 shadow-xl"
          titleClassName="text-[24px] text-[#27303F]"
          descriptionClassName=""
        />
      </div>
    </div>
  );
};

export default WhyLearnUs;
