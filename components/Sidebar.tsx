import { ChartSpline, ClipboardList } from "lucide-react";
import React, { JSX } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import { Separator } from "@radix-ui/react-separator";

type MenuItems = {
  title: string;
  url: string;
  icon: JSX.Element;
};

const items: MenuItems[] = [
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: <ChartSpline />,
  },
  {
    title: "My Forms",
    url: "/dashboard/forms",
    icon: <ClipboardList />,
  },
];

const DashBoardSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            <Link href={"/"} className="font-bold text-lg">
              AutoForm AI
            </Link>
          </SidebarGroupLabel>
          <Separator className="my-2" />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item: MenuItems, index: number) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* <UpgradeButton /> */}
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashBoardSidebar;
