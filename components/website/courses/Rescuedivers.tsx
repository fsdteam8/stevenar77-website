"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const Rescuedivers = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 450;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleBookNow = () => {
    // Add your booking logic here
    console.log(`Booking ${quantity} Rescue Diver course(s)`);
  };

  return (
    <div>
      <section className="mt-20">
        <div className="px-4 sm:px-8 lg:px-16 py-10 md:py-14 lg:py-16 bg-[#F8F9FA]">
          <div className="mx-auto container">
            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Text Section */}
              <div className="order-2 md:order-1">
                {/* Heading */}
                <h1 className="text-4xl md:text-5xl text-[#27303F] font-bold  mb-6">
                  Rescue Diver
                </h1>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed text-lg mb-8">
                  The Rescue Diver course is by far the most challenging and
                  rewarding of the non-professional classes we offer. Your
                  awareness of other divers will extend beyond your dive buddy
                  and begin to encompass all dive related activity around you.
                  You will gain the confidence to assist other divers, from
                  helping an injured diver underwater to preventing an emergency
                  from occurring in the first place
                </p>

                {/* Course Features List */}
                <div className="mb-12">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700 text-lg">
                        Instructor Time
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700 text-lg">
                        Academic Materials
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700 text-lg">
                        Classroom Session
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700 text-lg">
                        Pool Session
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700 text-lg">
                        Open Water training
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700 text-lg">
                        Certification Paperwork
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Booking Section */}
                <div className="border-t border-gray-200 pt-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    {/* Quantity and Price */}
                    <div className="flex items-center gap-6">
                      {/* Quantity Selector */}
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4 cursor-pointer  text-gray-600" />
                        </button>

                        <span className="px-4 py-3 text-lg font-medium text-gray-900  text-center">
                          {quantity}
                        </span>

                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          className="p-3 border border-gray-300 bg-teal-600 text-white hover:bg-teal-700 transition-colors rounded-md"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4 cursor-pointer" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-2xl font-bold text-gray-900">
                        $ {price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className=" w-full mt-5">
                    {/* Book Now Button */}
                    <button
                      onClick={handleBookNow}
                      className="min-w-full sm:w-auto inline-block text-center cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-semibold px-20 py-4 rounded-lg transition-colors text-lg "
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="rounded-lg overflow-hidden shadow-md order-1 md:order-2">
                <Image
                  src="/images/rescue-image.png"
                  alt="Rescue Diver training"
                  width={800}
                  height={700}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="mt-10">
              <div className="text-start">
                <div className="mb-6">
                  <h2 className="text-3xl font-montserrat text-[#27303F] mb-4 font-semibold">
                    Descriptions
                  </h2>
                  <p className="text-base  text-gray-500 ">
                    Demonstrating mastery of the skills taught in the Rescue
                    Diver course is not easy, and not everyone who takes the
                    class through PCH graduates. However, the challenge is
                    absolutely worth the reward, and the knowledge gained
                    through the training becomes applicable in many aspects of a
                    students life outside of scuba. You will start with learning
                    how to identify signs of panic in other divers and go all
                    the way to managing a full diver rescue scenario using the
                    full on-site staff of PCH Scuba. Being a solid rescue diver
                    earns you the respect of recreational and professional
                    divers alike. Rescue Diver training is also a prerequiste
                    for the Master Scuba Diver Program and is included in the
                    price of that program. It is also a requirement for all of
                    the Professional certifications we offer.
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="text-3xl font-montserrat text-[#27303F] mb-4 font-semibold">
                    Who can participate…
                  </h2>
                  <p className="text-base  text-gray-500 ">
                    Any diver that has successfully completed the Advanced Open
                    Water class is qualified to begin the Rescue Diver class.
                    PCH Scuba also highly recommends the Search and Recovery
                    Specialty as a prerequiste to beginning Rescue Diver
                    training.
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="text-3xl font-montserrat text-[#27303F] mb-4 font-semibold">
                    What is the class like…
                  </h2>
                  <p className="text-base  text-gray-500 ">
                    The Rescue Diver class is a combination of academic work,
                    pool training and open water demonstration. You will begin
                    with a  classroom session to go over your knowledge reviews
                    and answers your questions. We will also talk about
                    different scenarios and what is expected from the course. 
                    You will then move to the pool on Sunday and be ready to
                    learn how to manage different rescue scenarios and rescue
                    breathing. You&apos;ll cover how to respond to both surface
                    and underwater emergencies, how to recognize active and
                    passive panic and how to approach panicked divers. In-water
                    rescue breathing will be practiced until you are able to
                    remove the gear from a non-responsive diver, while towing
                    them and administering rescue breaths all at the same time.
                  </p>
                  <p className="text-base  text-gray-500 mt-4">
                    Once you have confidence in the academics and pool work, we
                    take you to the ocean so we can work on the ways of getting
                    an unconscious diver out of the water, and drill you again
                    on the pool work you did in the unpredictable environment of
                    open water. Finally, you bring it all together by managing a
                    full &double;missing diver &double; rescue scenario from the
                    initial contact with the lost diver&apos;s buddy to
                    simulating CPR after getting the unconscious diver out of
                    the water. PCH Scuba rescue scenarios are intense and
                    you&apos;ll know you&apos;re ready for the real thing when
                    you&apos;re done.
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="text-3xl font-montserrat text-[#27303F] mb-4 font-semibold">
                    Where will you learn…
                  </h2>
                  <p className="text-base  text-gray-500 ">
                    The academic portion of the class is taught at the shop. The
                    pool work is performed at the San Fernando Regional Pool.
                    Open water work is conducted at Casino Point Dive Park on
                    Catalina. You will need to be First Aid/CPR certified.
                    Please contact us about this requirement! We offer the
                    Emergency First Response Course to fulfill this requirement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rescuedivers;
