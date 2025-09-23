
import { BookingContent } from "./booking-content"
import { BookingSummary } from "./booking-summary"
import { MultiStepForm } from "./multi-step-form"
import { BookingProvider } from "./booking-context"

export function BookingPage() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-[#f8f9fa]">
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#343a40] mb-2">Book Your Course</h1>
            <p className="text-[#6c757d]">Complete your booking in just a few steps</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BookingContent />
              <MultiStepForm />
            </div>
            <div className="lg:col-span-1">
              <BookingSummary />
            </div>
          </div>
        </main>
      </div>
    </BookingProvider>
  )
}
