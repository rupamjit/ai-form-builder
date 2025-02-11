import AiGeneratedForm, { FormData } from "@/components/AiGeneratedForm";
import { Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import React from "react";

const page = async ({ params }: { params: Promise<{ formId: string }> }) => {
  const formId = (await params).formId;

  if (!formId) {
    return <h1>No form id found for {formId}</h1>;
  }

  const form = await prisma.form.findUnique({
    where: {
      id: parseInt(formId),
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="font-bold text-2xl text-center">
            {form?.formTitle}
          </h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AiGeneratedForm form={form} isEditMode={true}/>
      </CardContent>
    </Card>
  );
};

export default page;
