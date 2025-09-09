import { Phone, Mail, MapPin } from "lucide-react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Header() {
  return (
    <header className="header-bg text-white py-3 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>90360-6745678</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>info@aquaquestdiving.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Miami Beach, FL</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Follow Us:</span>
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
