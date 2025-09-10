import React from "react";
import WhyLearn from "../shared/WhyLearn";
import { Users } from "lucide-react";

const WhyLearnUs = () => {
  return (
    <div className="mt-[60px] lg:mt-[80px] mx-auto container">
      <div className="mb-[30px]  text-center">
        <h2 className="text-[#252F3F] text-[48px]  leading-[120%] pb-2">
          Why Learn with Us
        </h2>
        <p className="text-[16px] text-[#6B7280] w-[90%] mx-auto leading-6 font-normal">
          Experience the difference that makes Scuba Life the premier choice for
          diving education
        </p>
      </div>
      <div className="flex flex-wrap justify-between">
        <WhyLearn
          title="Lifetime Community & Adventure"
          description="Join a passionate community of divers and enjoy exclusive dive trips and events"
          icon={<Users size={24} color="#3B82F6" />}
          className=" rounded-lg "
          iconContainerClassName="p-2 shadow-xl"
          titleClassName="text-[24px] text-[#27303F]"
          descriptionClassName=""
        />
        <WhyLearn
          title="Lifetime Community & Adventure"
          description="Join a passionate community of divers and enjoy exclusive dive trips and events"
          icon={<Users size={24} color="#3B82F6" />}
          className=" rounded-lg "
          iconContainerClassName="p-2 shadow-xl"
          titleClassName="text-[24px] text-[#27303F]"
          descriptionClassName=""
        />
        <WhyLearn
          title="Lifetime Community & Adventure"
          description="Join a passionate community of divers and enjoy exclusive dive trips and events"
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
