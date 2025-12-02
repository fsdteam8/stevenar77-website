import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquareMore } from "lucide-react";
import Link from "next/link";

const MessagButton = () => {
  return (
    <div className="fixed bottom-20 right-5 z-50 animate-bounce">
      <Link href="">
        <Button className="bg-primary hover:bg-teal-400  rounded-full shadow-lg">
          <MessageSquareMore className="w-10 h-10" />
        </Button>
      </Link>
    </div>
  );
};

export default MessagButton;
