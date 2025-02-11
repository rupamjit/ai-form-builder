"use client"
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"; 
import { Button } from "./ui/button";
import { Edit2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
 

const FormList = ({ form }) => {
  const router = useRouter();

 
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{form.content.formTitle}</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href={`/dashboard/forms/${form.id}/submissions`}>
            {" "}
            <Button variant={"link"} className="text-blue-600">
              Submission - {form.submissions}
            </Button>{" "}
          </Link>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={()=> router.push(`/dashboard/forms/edit/${form.id}`)}>
            <Edit2 /> Edit
          </Button>
          <Button >Delete</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormList;