import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getAllForms = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, message: "User Not Found" };
    }

    const forms = await prisma.form.findMany({
      where: {
        ownerId: user.id,
      },
    });

    if (!forms) {
      return { success: false, message: "Forms Not Found" };
    }

    return {
      success: true,
      message: "Form generated successfully.",
      data: forms,
    };
  } catch (error) {
    console.log("Error generating form:", error);
    return {
      success: false,
      message: "An error occurred while generating the form",
    };
  }
};
