import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"



export const handleForm = async (formId:number) =>{
    try {
        const user = await currentUser()

        if(!user){
            return {success:false,message:"user not found"}
        }

        const form = prisma.form.delete({
            where:{
                id:formId
            }
        })

    } catch (error) {
        console.log(error)
        return {
            success:false,
            message:"Error in deleting form"
        }
    }
}