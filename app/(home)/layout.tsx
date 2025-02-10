import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import React from "react";
import { UserButton } from "@clerk/nextjs";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
     <div>
      <div className="border-b fixed w-full bg-white z-50">
        <nav className="flex items-center justify-between max-w-7xl mx-auto py-2">
          <Logo />
          <div className="flex items-center gap-3">
            <Button variant={"default"}>Dashboard</Button>
            <UserButton />
          </div>
        </nav>
      </div>
      <div className="pt-16">
        {children}
      </div>
    </div>
  );
};

export default layout;
