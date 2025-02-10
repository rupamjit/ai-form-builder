import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import React from "react";
import { UserButton } from "@clerk/nextjs";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="border-b">
        <nav className="flex items-center justify-between  max-w-7xl mx-auto py-2 ">
          <Logo />
          <div className="flex items-center gap-3">
            <Button variant={"default"}>Dashboard</Button>
            <UserButton/>
          </div>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default layout;
