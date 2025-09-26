import { Phone, Mail, MapPin } from "lucide-react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Header() {
  return (
    <header className="header-bg text-white py-3 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">714-728-2300</span>
            <span className="sm:hidden">Call Us</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span className="hidden md:inline">scubastevenar@gmail.com</span>
            <span className="md:hidden">Email</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">Los Angeles & Ventura Counties</span>
            <span className="sm:hidden">Location</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-xs sm:text-sm hidden sm:inline">
            Follow Us:
          </span>
          <div className="flex space-x-2">
            <Facebook className="w-4 h-4 cursor-pointer hover:opacity-80" />
            <Instagram className="w-4 h-4 cursor-pointer hover:opacity-80" />
            <Twitter className="w-4 h-4 cursor-pointer hover:opacity-80" />
          </div>
        </div>
      </div>
    </header>
  );
}
