// "use server"
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { currentUser } from "@clerk/nextjs/server";
// import { z } from "zod";
// import prisma from "@/lib/prisma";

// const schema = z.object({
//   description: z.string().min(1, "Description is required"),
// });

// export const generateForm = async (prevState:unknown,formData: any) => {

//   console.log("prevState:", prevState);
//   console.log("formData:", formData);

//   try {
//     const user = await currentUser();

//     if (!user) {
//       return { sucess: false, error: "User not found" };
//     }

//    console.log("Received formData:", formData); // Debugging log

//   // 🔹 Extract `description` directly as an object property, not via `formData.get()`
//   const des1 = formData.description;

//   if (!des1) {
//     return { success: false, message: "Description is missing!" };
//   }

//   const description = schema.safeParse({ des1 });

//     if (!description.success) {
//       return { success: false, error: description.error?.message };
//     }

//     const prompt = `Generate a JSON response for a form with the following structure. Ensure the keys and format remain constant in every response.
// {
//   "formTitle": "string", // The title of the form
//   "formFields": [        // An array of fields in the form
//     {
//       "label": "string", // The label to display for the field
//       "name": "string",  // The unique identifier for the field (used for form submissions)
//       "placeholder": "string" // The placeholder text for the field
//     }
//   ]
// }
// Requirements:
// - Use only the given keys: "formTitle", "formFields", "label", "name", "placeholder".
// - Always include at least 3 fields in the "formFields" array.
// - Keep the field names consistent across every generation for reliable rendering.
// - Provide meaningful placeholder text for each field based on its label.
//         `;

//     // gemini ai
//     const apiKey = process.env.GEMINI_API_KEY;
//     if (!apiKey) {
//       throw new Error("API key is not defined");
//     }
//     const genAI = new GoogleGenerativeAI(apiKey);
//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-pro",
//     });
//     const generationConfig = {
//       temperature: 1,
//       topP: 0.95,
//       topK: 40,
//       maxOutputTokens: 8192,
//       responseMimeType: "text/plain",
//     };
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [],
//     });

//     const output = await chatSession.sendMessage(`${prompt}${description}`);

//     const modifiedOutput = output.response.text();
// console.log(modifiedOutput);
//     const form = await prisma.form.create({
//       data: {
//         ownerId: user.id,
//         content: modifiedOutput,
//       },
//     });
//     return {
//       success: true,
//       message: "Form generated successfully.",
//       data: form,
//     };
//   } catch (error) {
//     console.log("Error generated form", error);
//     return {
//       success: false,
//       message: "An error occurred while generateing the form",
//     };
//   }
// };

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
