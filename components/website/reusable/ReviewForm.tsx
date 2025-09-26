import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

// Types
export interface ReviewData {
  rating: number;
  description: string;
}

export interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

interface ReviewFormProps {
  onSubmit?: (data: ReviewData) => Promise<void> | void;
  initialData?: Partial<ReviewData>;
  isSubmitting?: boolean;
  submitStatus?: SubmitStatus | null;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  onSubmit,
  initialData = {},
  isSubmitting = false,
  submitStatus = null,
}) => {
  const [rating, setRating] = useState<number>(initialData.rating ?? 0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [description, setDescription] = useState<string>(
    initialData.description ?? "",
  );

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a description");
      return;
    }

    if (onSubmit && !isSubmitting) {
      await onSubmit({
        rating,
        description,
      });
    }
  };

  // Clear form on successful submission
  useEffect(() => {
    if (submitStatus?.type === "success") {
      setRating(0);
      setDescription("");
    }
  }, [submitStatus]);

  const reviewStats = {
    totalReviews: 2529,
    averageRating: 4.9,
    breakdown: [
      { stars: 5, count: 1500 },
      { stars: 4, count: 100 },
      { stars: 3, count: 50 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 },
    ],
  };

  const getBarWidth = (count: number): number => {
    const maxCount = Math.max(...reviewStats.breakdown.map((b) => b.count));
    return (count / maxCount) * 100;
  };

  return (
    <div className="container mx-auto">
      <div className="sm:max-w-7xl max-w-2xl border rounded-md mx-auto p-6 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Review Form */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Reviews Forms
            </h2>

            <div className="space-y-6">
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-3">
                  How happy are you with our service
                </div>

                {/* Star Rating */}
                <div className="flex space-x-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className="p-1 cursor-pointer transition-colors duration-200"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        size={32}
                        className={`transition-colors duration-200 ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write your review here..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                />
              </div>

              {/* Status Messages */}
              {submitStatus && (
                <div
                  className={`p-4 rounded-md ${
                    submitStatus.type === "success"
                      ? "bg-green-50 border border-green-200 text-green-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <div
                onClick={handleSubmit}
                className={`w-full font-medium py-3 px-4 rounded-md transition-colors duration-200 cursor-pointer text-center ${
                  isSubmitting
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700 text-white"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </div>
            </div>
          </div>

          {/* Right side - Review Statistics */}
          <div className="lg:pl-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-2xl font-semibold text-gray-900">
                {reviewStats.averageRating}
              </span>
            </div>

            <p className="text-gray-600 mb-6">
              Based on {reviewStats.totalReviews.toLocaleString()} reviews
            </p>

            {/* Rating Breakdown */}
            <div className="space-y-3">
              {reviewStats.breakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-12">
                    {item.stars} Stars
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all duration-300"
                      style={{ width: `${getBarWidth(item.count)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-12 text-right">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
