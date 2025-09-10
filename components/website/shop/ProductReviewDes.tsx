import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FaqSection from "../faq/faq";
import { ReviewCard } from "../shared/reviewcard";
import { Review } from "@/types/review";

const dataArray = [
  { description: "Triple-lens design for maximum field of view" },
  { description: "Advanced anti-fog coating technology" },
  { description: "Liquid silicone skirt for superior comfort" },
  { description: "Easy-adjust buckle system" },
  { description: "Low-volume design reduces drag" },
  { description: "Available in multiple colors" },
  { description: "Professional diver tested and approved" },
  { description: "Professional diver tested and approved" },
  { description: "Low-volume design reduces drag" },
  { description: "Available in multiple colors" },
  { description: "Professional diver tested and approved" },
  { description: "Liquid silicone skirt for superior comfort" },
];

const ProductReviewDes = () => {
  const itemsPerColumn = Math.ceil(dataArray.length / 3);
  const columns = [
    dataArray.slice(0, itemsPerColumn),
    dataArray.slice(itemsPerColumn, itemsPerColumn * 2),
    dataArray.slice(itemsPerColumn * 2, itemsPerColumn * 3),
  ];

  const reviewsArray: Review[] = [
    {
      _id: "1",
      userId: {
        _id: "u1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
      facility: {
        _id: "f1",
        name: "Health Clinic",
        address: "123 Main St",
      },
      star: 5,
      comment: "Excellent care and friendly staff.",
      createdAt: "2023-07-01T12:00:00Z",
      updatedAt: "2023-07-01T12:00:00Z",
      __v: 0,
    },
    {
      _id: "2",
      userId: {
        _id: "u2",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
      },
      facility: {
        _id: "f2",
        name: "Wellness Center",
        address: "456 Elm St",
      },
      star: 4,
      comment: "Very good experience overall.",
      createdAt: "2023-07-02T10:30:00Z",
      updatedAt: "2023-07-02T10:30:00Z",
      __v: 0,
    },
    {
      _id: "3",
      userId: {
        _id: "u3",
        firstName: "Alice",
        lastName: "Brown",
        email: "alice.brown@example.com",
      },
      facility: {
        _id: "f3",
        name: "City Hospital",
      },
      star: 3,
      comment: "Service was okay, but waiting times were long.",
      createdAt: "2023-07-03T09:15:00Z",
      updatedAt: "2023-07-03T09:15:00Z",
      __v: 0,
    },
    {
      _id: "4",
      userId: {
        _id: "u4",
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob.johnson@example.com",
      },
      facility: {
        _id: "f4",
        name: "Downtown Clinic",
        address: "789 Oak Ave",
      },
      star: 5,
      comment: "Highly recommend this clinic!",
      createdAt: "2023-07-04T14:20:00Z",
      updatedAt: "2023-07-04T14:20:00Z",
      __v: 0,
    },
    {
      _id: "5",
      userId: {
        _id: "u5",
        firstName: "Carol",
        lastName: "Davis",
        email: "carol.davis@example.com",
      },
      facility: {
        _id: "f5",
        name: "Suburb Medical Center",
      },
      star: 2,
      comment: "Not satisfied with the customer service.",
      createdAt: "2023-07-05T16:45:00Z",
      updatedAt: "2023-07-05T16:45:00Z",
      __v: 0,
    },
    {
      _id: "6",
      userId: {
        _id: "u6",
        firstName: "David",
        lastName: "Wilson",
        email: "david.wilson@example.com",
      },
      facility: {
        _id: "f6",
        name: "Community Health",
        address: "321 Pine St",
      },
      star: 4,
      comment: "Good doctors but parking is difficult.",
      createdAt: "2023-07-06T11:00:00Z",
      updatedAt: "2023-07-06T11:00:00Z",
      __v: 0,
    },
    {
      _id: "7",
      userId: {
        _id: "u7",
        firstName: "Emma",
        lastName: "Martinez",
        email: "emma.martinez@example.com",
      },
      facility: {
        _id: "f7",
        name: "Regional Hospital",
      },
      star: 5,
      comment: "Exceptional care and friendly staff.",
      createdAt: "2023-07-07T08:00:00Z",
      updatedAt: "2023-07-07T08:00:00Z",
      __v: 0,
    },
    {
      _id: "8",
      userId: {
        _id: "u8",
        firstName: "Frank",
        lastName: "Lee",
        email: "frank.lee@example.com",
      },
      facility: {
        _id: "f8",
        name: "City Clinic",
        address: "654 Maple Rd",
      },
      star: 3,
      comment: "Average experience, could be improved.",
      createdAt: "2023-07-08T15:30:00Z",
      updatedAt: "2023-07-08T15:30:00Z",
      __v: 0,
    },
    // Added 15 more reviews below:
    {
      _id: "9",
      userId: {
        _id: "u9",
        firstName: "Grace",
        lastName: "Hall",
        email: "grace.hall@example.com",
      },
      facility: {
        _id: "f9",
        name: "Sunrise Clinic",
        address: "111 Sunrise Blvd",
      },
      star: 4,
      comment: "Friendly staff and good facilities.",
      createdAt: "2023-07-09T13:00:00Z",
      updatedAt: "2023-07-09T13:00:00Z",
      __v: 0,
    },
    {
      _id: "10",
      userId: {
        _id: "u10",
        firstName: "Henry",
        lastName: "Young",
        email: "henry.young@example.com",
      },
      facility: {
        _id: "f10",
        name: "Lakeside Hospital",
      },
      star: 5,
      comment: "Top-notch service and care.",
      createdAt: "2023-07-10T09:45:00Z",
      updatedAt: "2023-07-10T09:45:00Z",
      __v: 0,
    },
    {
      _id: "11",
      userId: {
        _id: "u11",
        firstName: "Isabella",
        lastName: "King",
        email: "isabella.king@example.com",
      },
      facility: {
        _id: "f11",
        name: "Central Medical Center",
        address: "987 Center St",
      },
      star: 3,
      comment: "Average experience, staff was okay.",
      createdAt: "2023-07-11T14:10:00Z",
      updatedAt: "2023-07-11T14:10:00Z",
      __v: 0,
    },
    {
      _id: "12",
      userId: {
        _id: "u12",
        firstName: "Jack",
        lastName: "Wright",
        email: "jack.wright@example.com",
      },
      facility: {
        _id: "f12",
        name: "Greenwood Clinic",
      },
      star: 4,
      comment: "Good doctors and facilities.",
      createdAt: "2023-07-12T10:30:00Z",
      updatedAt: "2023-07-12T10:30:00Z",
      __v: 0,
    },
    {
      _id: "13",
      userId: {
        _id: "u13",
        firstName: "Karen",
        lastName: "Scott",
        email: "karen.scott@example.com",
      },
      facility: {
        _id: "f13",
        name: "Eastside Hospital",
        address: "456 East St",
      },
      star: 2,
      comment: "Not very satisfied with the waiting time.",
      createdAt: "2023-07-13T11:00:00Z",
      updatedAt: "2023-07-13T11:00:00Z",
      __v: 0,
    },
    {
      _id: "14",
      userId: {
        _id: "u14",
        firstName: "Liam",
        lastName: "Adams",
        email: "liam.adams@example.com",
      },
      facility: {
        _id: "f14",
        name: "Northside Clinic",
        address: "789 North Ave",
      },
      star: 5,
      comment: "Excellent treatment and great atmosphere.",
      createdAt: "2023-07-14T16:20:00Z",
      updatedAt: "2023-07-14T16:20:00Z",
      __v: 0,
    },
    {
      _id: "15",
      userId: {
        _id: "u15",
        firstName: "Mia",
        lastName: "Parker",
        email: "mia.parker@example.com",
      },
      facility: {
        _id: "f15",
        name: "Westside Medical Center",
      },
      star: 4,
      comment: "Good service but the parking is an issue.",
      createdAt: "2023-07-15T12:00:00Z",
      updatedAt: "2023-07-15T12:00:00Z",
      __v: 0,
    },
    {
      _id: "16",
      userId: {
        _id: "u16",
        firstName: "Nathan",
        lastName: "Bell",
        email: "nathan.bell@example.com",
      },
      facility: {
        _id: "f16",
        name: "Southside Clinic",
        address: "123 South St",
      },
      star: 3,
      comment: "Facilities are okay, but needs improvement.",
      createdAt: "2023-07-16T15:45:00Z",
      updatedAt: "2023-07-16T15:45:00Z",
      __v: 0,
    },
    {
      _id: "17",
      userId: {
        _id: "u17",
        firstName: "Olivia",
        lastName: "Nelson",
        email: "olivia.nelson@example.com",
      },
      facility: {
        _id: "f17",
        name: "Metro Hospital",
      },
      star: 5,
      comment: "Loved the staff and doctors!",
      createdAt: "2023-07-17T09:10:00Z",
      updatedAt: "2023-07-17T09:10:00Z",
      __v: 0,
    },
    {
      _id: "18",
      userId: {
        _id: "u18",
        firstName: "Peter",
        lastName: "Reed",
        email: "peter.reed@example.com",
      },
      facility: {
        _id: "f18",
        name: "Grand Clinic",
        address: "654 Grand Ave",
      },
      star: 4,
      comment: "Good overall but could be better.",
      createdAt: "2023-07-18T13:30:00Z",
      updatedAt: "2023-07-18T13:30:00Z",
      __v: 0,
    },
    {
      _id: "19",
      userId: {
        _id: "u19",
        firstName: "Quinn",
        lastName: "Turner",
        email: "quinn.turner@example.com",
      },
      facility: {
        _id: "f19",
        name: "Bayview Hospital",
      },
      star: 3,
      comment: "Average experience.",
      createdAt: "2023-07-19T10:00:00Z",
      updatedAt: "2023-07-19T10:00:00Z",
      __v: 0,
    },
    {
      _id: "20",
      userId: {
        _id: "u20",
        firstName: "Rachel",
        lastName: "Morgan",
        email: "rachel.morgan@example.com",
      },
      facility: {
        _id: "f20",
        name: "Hilltop Clinic",
        address: "321 Hilltop Rd",
      },
      star: 5,
      comment: "Exceptional care and quick service.",
      createdAt: "2023-07-20T08:30:00Z",
      updatedAt: "2023-07-20T08:30:00Z",
      __v: 0,
    },
  ];

  return (
    <div>
      <div className="mx-auto container">
        <div className="flex w-full flex-col gap-6">
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">description</TabsTrigger>
              <TabsTrigger value="review">review</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <div className="space-y-8 lg:space-y-20">
                <div className="mt-4">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold ">Product Features</h2>
                    <div className="des-point py-10 flex flex-col md:flex-row md:gap-6">
                      {columns.map((col, colIndex) => (
                        <div key={colIndex} className="flex-1">
                          {col.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 mb-2"
                            >
                              <span className="h-2 w-2 bg-primary rounded-full inline-block mr-2" />
                              <span className="text-[#343A40]">
                                {item.description}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="">
                    <p className="text-[#68706A] leading-relaxed text-sm md:text-base">
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random text. It has roots in a piece of classical Latin
                      literature from 45 BC, making it over 2000 years old.
                      Richard McClintock, a Latin professor at Hampden-Sydney
                      College in Virginia, looked up one of the more obscure
                      Latin words, consectetur, from a Lorem Ipsum passage, and
                      going through the cites of the word in classical
                      literature, discovered the undoubtable source. Lorem Ipsum
                      comes from sections 1.10.32 and 1.10.33 of &quot;de
                      Finibus Bonorum et Malorum&quot; (The Extremes of Good and
                      Evil) by Cicero, written in 45 BC. This book is a treatise
                      on the theory of ethics, very popular during the
                      Renaissance. The first line of Lorem Ipsum, &quot;Lorem
                      ipsum dolor sit amet..&quot;, comes from a line in section
                      1.10.32.
                    </p>
                  </div>
                </div>
                <FaqSection />
              </div>
            </TabsContent>
            <TabsContent value="review">
              {/* Review content here */}
              <div className="grid grid-cols-1 py-10 md:grid-cols-2 gap-6">
                {reviewsArray.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewDes;
