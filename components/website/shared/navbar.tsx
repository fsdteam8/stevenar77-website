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
import { useMyProfile } from "@/services/hooks/user/useMyProfile";

const Navbar = () => {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { data: session, status } = useSession();
  const { user, loading } = useMyProfile();

  const [isOpen, setIsOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const menuWrapperRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = !!session?.user;

  // Determine avatar URL and display name
  const displayAvatar = user?.image?.url || "";
  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email || "User";

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuWrapperRef.current &&
        !menuWrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setLogoutModalOpen(false);
    await signOut({ callbackUrl: "/login" });
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Trips", path: "/trips" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const LoadingPlaceholder = () => (
    <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image src="/images/logo.png" alt="logo" width={64} height={64} />
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
                      isActive ? "text-teal-500" : "text-gray-700"
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
          <div className="  flex items-center gap-4">
            <div className="hidden md:flex ">
              {status === "loading" || loading ? (
                <LoadingPlaceholder />
              ) : isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        {displayAvatar ? (
                          <AvatarImage
                            className="object-cover"
                            src={displayAvatar}
                            alt={displayName}
                          />
                        ) : (
                          <AvatarFallback>
                            {getInitials(displayName)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex flex-col text-left">
                        <div className="font-medium">{displayName}</div>
                        <div className="text-sm text-muted-foreground">
                          {user?.role}
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <Link href="/account" className="cursor-pointer">
                      <DropdownMenuItem className="cursor-pointer">
                        <CircleUserRound /> Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setLogoutModalOpen(true)}
                      className="text-red-500 cursor-pointer"
                    >
                      <LogOut className="mr-2" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button className="bg-primary">
                  <Link href="/login">Sign in</Link>
                </Button>
              )}
              <Dialog open={logoutModalOpen} onOpenChange={setLogoutModalOpen}>
                <DialogContent className="!max-w-xl">
                  <DialogHeader>
                    <DialogTitle>Log out</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to log out?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setLogoutModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleLogout}>
                      Log out
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Mobile Hamburger & Menu */}
            <div ref={menuWrapperRef} className="md:hidden relative">
              {/* Hamburger button */}
              <div className="flex items-center justify-end gap-2">
                {isLoggedIn && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="h-8 w-8 cursor-pointer">
                        {displayAvatar ? (
                          <AvatarImage
                            className="object-cover"
                            src={displayAvatar}
                            alt={displayName}
                          />
                        ) : (
                          <AvatarFallback>
                            {getInitials(displayName)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <Link href="/account">
                        <DropdownMenuItem>
                          <CircleUserRound /> Profile
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-500 cursor-pointer"
                        onClick={() => setLogoutModalOpen(true)}
                      >
                        <LogOut /> Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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

              {/* Mobile Menu */}
              <div
                className={`fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-white z-40 overflow-y-auto transition-transform duration-300 ease-in-out ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
                  <ul className="flex flex-col gap-2 font-poppins text-lg">
                    {navItems.map((item) => {
                      const isActive = pathname === item.path;
                      return (
                        <li
                          key={item.name}
                          className={`transition rounded-md ${
                            isActive
                              ? "text-teal-500 bg-gray-200"
                              : "text-gray-700"
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

                  {isLoggedIn && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="w-full flex items-center gap-2 justify-start text-left mt-6"
                          variant="ghost"
                        >
                          <Avatar className="h-8 w-8">
                            {displayAvatar ? (
                              <AvatarImage
                                className="object-cover"
                                src={displayAvatar}
                                alt={displayName}
                              />
                            ) : (
                              <AvatarFallback>
                                {getInitials(displayName)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="flex flex-col text-left">
                            <div className="font-medium">{displayName}</div>
                            <div className="text-sm text-muted-foreground">
                              {user?.role}
                            </div>
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full" align="start">
                        <Link href="/account">
                          <DropdownMenuItem>
                            <CircleUserRound /> Profile
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-500 cursor-pointer"
                          onClick={() => setLogoutModalOpen(true)}
                        >
                          <LogOut /> Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
