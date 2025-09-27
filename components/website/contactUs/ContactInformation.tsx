"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"

export default function ContactInformation() {
  return (
    <div className="py-5 md:py-20">
      <div className="mx-auto container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative h-80 lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={"/images/rescue-image.png"}
              alt="RescueImage"
              fill
              className="object-cover"
            />
          </div>

          {/* Contact Information Section */}
          <div className="space-y-6 p-4 md:p-0">
            <div className="max-w-2xl">
              <h1 className="text-2xl md:text-4xl font-bold font-playfair text-primary mb-4">
                Contact Information
              </h1>
              {/* <p className="text-[#68706A] text-sm md:text-base">
                Find all the ways to reach us, including email, phone, and our office
                address, so you can get the support and answers you need quickly and
                easily.
              </p> */}
            </div>

            {/* Static Contact Info */}
            <div className="space-y-4 pt-1 md:pt-6">
              <div className="flex items-center gap-3">
                <Mail className="text-primary w-5 h-5" />
                <span className="text-[#343A40] text-base">
                  scubastevenar@gmail.com
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-primary w-5 h-5" />
                <span className="text-[#343A40] text-base">714-728-2300</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-primary w-5 h-5 mt-0.5" />
                <div className="text-[#343A40] text-base">
                  <div className="text-base text-[#343A40]">
                    Los Angeles & Ventura Counties
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


// "use client"

// import { Mail, MapPin, Phone } from "lucide-react"
// import Image from "next/image"

// export default function ContactInformation() {
//   return (
//     <div className=" py-5 md:py-20">
//       <div className="mx-auto container">
//         <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 items-center">
//           {/* Map Section */}
//           <div className="relative h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
//             {/* <iframe
//               src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7516.115462168595!2d90.40641010188482!3d23.78041211786741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1756081914462!5m2!1sen!2sbd"
//               width="100%"
//               height="100%"
//               style={{ border: 0 }}
//               allowFullScreen
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               className="rounded-lg"
//             /> */}
//             <Image src={"/images/rescue-image.png"} alt="RescueImage" fill className="object-cover" />
//           </div>

//           {/* Contact Information Section */}
//           <div className="space-y-6 p-4 md:p-0">
//             <div className="max-w-2xl">
//               <h1 className="text-2xl md:text-4xl font-bold font-playfair text-primary mb-4">
//                 Contact Information
//               </h1>
//               <p className="text-[#68706A] text-sm md:text-base">
//                 Find all the ways to reach us, including email, phone, and our office address, so you can get the
//                 support and answers you need quickly and easily.
//               </p>
//             </div>

//             {/* Static Contact Info */}
//             <div className="space-y-4 pt-1 md:pt-6">
//               <div className="flex items-center gap-3">
//                 <Mail className="text-primary w-5 h-5" />
//                 <span className="text-[#343A40] text-base">scubastevenar@gmail.com</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <Phone className="text-primary w-5 h-5" />
//                 <span className="text-[#343A40] text-base">714-728-2300</span>
//               </div>

//               <div className="flex items-start gap-3">
//                 <MapPin className="text-primary w-5 h-5 mt-0.5" />
//                 <div className="text-[#343A40] text-base">
//                   <div className="text-base text-[#343A40]">Los Angeles & Ventura Counties</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
