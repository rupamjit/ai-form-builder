"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const schema = z.object({
  description: z.string().min(1, "Description is required"),
});

export const generateForm = async (prevState: unknown, formData: FormData) => {
  console.log("prevState:", prevState);
  console.log("Received formData:", formData);

  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, message: "User not found" };
    }

  
    const descriptionRaw = formData.get("description") as string | null;
    if (!descriptionRaw) {
      return { success: false, message: "Description is missing!" };
    }

  
    const result = schema.safeParse({ description: descriptionRaw });
    if (!result.success) {
      return {
        success: false,
        message:
          result.error.format().description?._errors[0] ||
          "Invalid description",
      };
    }

    const prompt = `Generate a JSON response for a form with the following structure:
{
  "formTitle": "string",
  "formFields": [
    {
      "label": "string",
      "name": "string",
      "placeholder": "string"
    }
  ]
}
Description: ${descriptionRaw} and only give as an object and don't write anything
`;

    // Gemini AI setup
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("API key is not defined");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const output = await chatSession.sendMessage(prompt);
    let modifiedOutput = await output.response.text(); 
    modifiedOutput = modifiedOutput.replace(/```json|```/g, "").trim();
    console.log("Generated Form JSON:", modifiedOutput);

   
    const form = await prisma.form.create({
      data: {
        ownerId: user.id,
        content: modifiedOutput,
      },
    });

    return {
      success: true,
      message: "Form generated successfully.",
      data: form,
    };
  } catch (error) {
    console.log("Error generating form:", error);
    return {
      success: false,
      message: "An error occurred while generating the form",
    };
  }
};
