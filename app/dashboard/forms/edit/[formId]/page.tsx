import AiGeneratedForm from "@/components/AiGeneratedForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import React from "react";

interface FormContent {
  title: string;
  fields: Array<{
    type: string;
    label: string;
    name: string;
    options?: string[];
  }>;
  button: string;
}

interface FormData {
  id: number;
  content: string | FormContent;
}

const Page = async ({ params }: { params: { formId: string } }) => {
  const formId = params.formId;

  if (!formId) {
    return <h1>No form id found for {formId}</h1>;
  }

  const form = await prisma.form.findUnique({
    where: {
      id: isNaN(Number(formId)) ? 0 : Number(formId),
    },
  }) as FormData | null;

  const formContent = form?.content && typeof form.content === 'string' 
    ? JSON.parse(form.content) as FormContent 
    : form?.content as FormContent;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="font-bold text-2xl text-center">
            {formContent?.title || "Title not available"}
          </h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {form && <AiGeneratedForm form={form} isEditMode={true} />}
      </CardContent>
    </Card>
  );
};

export default Page;