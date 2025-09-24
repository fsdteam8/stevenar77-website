"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleUserRound, LogOut, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSession, signOut } from "next-auth/react";
import { useUser } from "@/services/hooks/user/useUser";

const Navbar = () => {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const isLoggedIn = !!session?.user;

  // Use custom hook for user info
  const { user,  } = useUser(session?.user?.id);

  const displayAvatar = user?.avatar?.url || session?.user?.email || undefined;

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    setLogoutModalOpen(false);
    await signOut({ callbackUrl: "/login" });
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "UN";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Schedule", path: "/schedule" },
    { name: "Trips", path: "/trips" },
    { name: "Shop", path: "/shop" },
    { name: "Community ", path: "/community" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Messaging", path: "/messaging" },
  ];

  const LoadingPlaceholder = () => (
    <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
  );


  return (
    <header className="sticky top-0 h-full bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-[15px]">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image src={"/images/logo.png"} alt="logo" width={64} height={64} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex gap-10 font-poppins">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li
                    key={item.name}
                    className={`transition rounded-md ${
                      isActive ? "text-teal-500 " : "text-gray-700"
                    } hover:bg-gray-200 hover:text-teal-500`}
                  >
                    <Link href={item.path} className="px-3 py-1 block">
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Section */}
          <div className=" flex items-center gap-4">
            {status === "loading" ? (
              <LoadingPlaceholder />
            ) : isLoggedIn ? (
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={displayAvatar}
                          alt={session.user?.email || ""}
                        />
                        <AvatarFallback>
                          {getInitials(session.user?.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col text-left">
                        <div className="font-medium">{session.user?.email}</div>
                        <div className="text-sm text-muted-foreground">
                          {session.user?.role}
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 " align="end">
                    <Link href="/account">
                      <DropdownMenuItem className="cursor-pointer">
                        <CircleUserRound /> Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setLogoutModalOpen(true)}
                      className="text-red-500 cursor-pointer"
                    >
                      <LogOut /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:block">
                <Button className="bg-primary">
                  <Link href="/login">Sign in</Link>
                </Button>
              </div>
            )}

            {/* Mobile Avatar & Hamburger */}
            <div className="md:hidden flex items-center gap-2">
              {isLoggedIn && (
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={displayAvatar}
                    alt={session.user?.email || ""}
                  />
                  <AvatarFallback>
                    {getInitials(session.user?.email)}
                  </AvatarFallback>
                </Avatar>
              )}
              <Button
                ref={buttonRef}
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-white z-40 overflow-y-auto transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <ul className="flex flex-col gap-2 font-poppins text-lg">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li
                    key={item.name}
                    className={`transition rounded-md ${
                      isActive ? "text-teal-500 bg-gray-200" : "text-gray-700"
                    } hover:bg-gray-200`}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2"
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8">
              {status === "loading" ? (
                <LoadingPlaceholder />
              ) : isLoggedIn ? (
                <Button
                  className="w-full text-primary flex items-center justify-center gap-2"
                  variant="ghost"
                  onClick={() => setLogoutModalOpen(true)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={displayAvatar}
                      alt={session.user?.email || ""}
                    />
                    <AvatarFallback>
                      {getInitials(session.user?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                    <div className="font-medium">{session.user?.email}</div>
                    <div className="text-sm text-muted-foreground">
                      {session.user?.role}
                    </div>
                  </div>
                </Button>
              ) : (
                <Button className="bg-primary w-full">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Sign in
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Dialog open={logoutModalOpen} onOpenChange={setLogoutModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              You are about to log out of your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setLogoutModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Yes, Log out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
