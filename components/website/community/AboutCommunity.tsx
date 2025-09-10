import Image from "next/image";
import React from "react";

export const AboutCommunity = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2">
            <Image
              src="/asset/community.png"
              alt="Community"
              width={756}
              height={532}
              className="rounded-2xl shadow-md"
            />
          </div>

          {/* Right: Text */}
          <div className="w-full lg:w-1/2">
            <p className="text-base md:text-lg leading-relaxed text-[#68706A] space-y-4">
              <span>
                Our Annual Travel Party, with over 200 friends, $8,000 in raffle
                prizes, this is an event not to be missed!!
              </span>{" "}
              <br />
              <span>
                PCH Scuba started strictly as a training organization. We
                didn&apos;t have a retail shop for the first 6 years of our
                existence. We focused solely on training and building the best
                and safest divers possible. Now your community is 3000 divers
                strong. We are so proud of you all!
              </span>{" "}
              <br />
              <span>
                Most of our instructors have &rdquo;grown up&rdquo; through PCH
                which has enabled us to keep our focus on safety, mentorship and
                friendships. We&apos;re excited to invite instructors who share
                the same goals to join the team.
              </span>{" "}
              <br />
              <span>
                We are always there to support and coach any diver even if they
                haven&apos;t taken a class from us. What sets our shop apart is
                the sense of belonging divers feel when they come to us. We
                focus on developing divers in a non-threatening environment.
                Passing knowledge and tips from diver to diver. Treat strangers
                like friends and friends like family.
              </span>{" "}
              <br />
              <span>
                Our community service sets us apart! Take a look at Project
                Guanaja above. That is just one example.
              </span>{" "}
              <br />
              <span>
                Gear discounts for Dive Team members, Police, Fire Department,
                and Military (both active and retired) — you are appreciated
                here! Talk to us for the details of these programs, your savings
                are significant.
              </span>{" "}
              <br />
              <span>
                We have many events throughout the year for divers to meet each
                other, find new dive buddies and just have fun with people with
                the same interests. These events include our annual Travel
                Party, dinners, movie nights, concerts, BBQ&apos;s and of course
                dive trips!
              </span>{" "}
              <br />
              <span>
                Head on over to our Event Calendar to stay updated on upcoming
                events!
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
