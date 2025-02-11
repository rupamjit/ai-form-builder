import React from "react";

import { Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



const Analytics= () => {
  return (
    <div>
      <Card className="w-[350px] shadow-md shadow-yellow-600">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-bold">Job Application</CardTitle>
          <Eye />
        </CardHeader>
        <CardContent>
          <div>20</div>
          <p>Total submissions to your forms.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;