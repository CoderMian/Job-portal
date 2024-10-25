"use client";
import { SheetContent, SheetTrigger, Sheet, SheetTitle } from "../ui/sheet";
import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
export default function Header({ user, profileInfo }) {
  const menuItems = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Login",
      path: "/sign-in",
      show: !user,
    },
    {
      label: "Register",
      path: "/sign-up",
      show: !user,
    },
    {
      label: "Jobs",
      path: "/jobs",
      show: user,
    },
    {
      label: "Activity",
      path: "/activity",
      show: profileInfo?.role === "candidate",
    },
    {
      label: "Membership",
      path: "/membership",
      show: user,
    },
    {
      label: "Account",
      path: "/account",
      show: user,
    },
  ];
  return (
    <>
      <header className="flex h-16 w-full shrink-0 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden">
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle>
              <Link className="mr-6 lg:hidden" href={"#"}>
                <h3>JOBSCO</h3>
              </Link>
            </SheetTitle>

            <div className="grid gap-2 py-6">
              {menuItems.map((item) =>
                item.show ? (
                  <Link
                    onClick={() => sessionStorage.removeItem("filterParams")}
                    href={item.path}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    key={item.label}
                  >
                    {item.label}
                  </Link>
                ) : null
              )}
            </div>
          </SheetContent>
        </Sheet>

        <Link className="hidden lg:flex mr-6" href={"/"}>
          JOBSCO
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6">
          {menuItems.map((item) =>
            item.show ? (
              <Link
                onClick={() => sessionStorage.removeItem("filterParams")}
                key={item.label}
                href={item.path}
                className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium"
              >
                {item.label}
              </Link>
            ) : null
          )}
          <UserButton afterSignOutUrl="/" />
        </nav>
      </header>
    </>
  );
}
