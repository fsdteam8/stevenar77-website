import { Button } from "@/components/ui/button";
import Link from "next/link";

const StillHaveQuestion = ({
  imageSrc = "/images/underwaterimage.jpg", // Default background image
  heading = "Still Have Questions", // Default heading
  subHeading = "Our team is here to provide personalized guidance and support reach out anytime.", // Default subheading
  buttonText = "Contact Us", // Default button text
  showButton = true, // Flag to conditionally render the button
  buttonlink = "/"
}) => {
  return (
   <section className="p-4 sm:p-20 bg-[#F8F9FA] bg-cover">
      <div
        className="container mx-auto h-[320px] md:h-[275px] rounded-md bg-cover bg-center bg-black/60 bg-blend-overlay"
        style={{ backgroundImage: `url(${imageSrc})` }}  
      >
        {/* Content */}
        <div className="flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6 lg:px-8">
          <h1
            className="text-2xl  md:text-4xl lg:text-[40px]  mb-6 md:mb-2 font-bold leading-tight font-montserrat" 
          >
            {heading} 
          </h1>
          <p className=" text-sm  tracking-wide text-[#F8F9FA] md:text-[16px] w-full md:w-[80%] text-center  leading-[150%]">
            {subHeading}
          </p>
          {showButton && (
            <div className="mt-8">
              <Link href={buttonlink} >
              <Button size="lg" className="w-[200px] text-[16px] cursor-pointer">
                {buttonText}
              </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StillHaveQuestion;
