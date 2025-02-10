import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PricingPlan, pricingPlan } from "@/lib/pricingPlan";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

const PricingPage = () => {
  return (
    <div>
      <div className="text-center mb-16">
        <h1 className="font-extrabold text-3xl ">Plan and Pricing</h1>
        <p className="text-gray-500">
          Receive unlimited credits when you pay earl, and save your plan.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {pricingPlan.map((plan: PricingPlan, index: number) => (
          <Card
            key={index}
            className={`w-[350px] flex flex-col ${
              plan.level === "Enterprise" && "bg-[#1c1c1c] text-white"
            }`}
          >
            <CardHeader className="flex flex-row items-center gap-2">
              <CardTitle>{plan.level}</CardTitle>
              {plan.level === "Pro" && (
                <Badge className="rounded-full bg-orange-400 hover:bg-null">
                  Popular
                </Badge>
              )}
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-2xl font-bold">{plan.price}</p>
              <ul className="mt-4 space-y-2">
                {plan.services.map((item: string, index: number) => (
                  <li className="flex items-center " key={index}>
                    <span className="text-green-600 mr-2">✔︎</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant={"outline"}
                className={`w-full ${
                  plan.level === "Enterprise" && "text-black"
                }`}
              >
                Get Started with {plan.level}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
