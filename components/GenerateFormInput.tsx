"use client";
import { Input } from "@/components/ui/input";
import React, {  ChangeEvent, useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Sparkles } from "lucide-react";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { generateForm } from "@/actions/generateForm";


type InitialState = {
  message: string;
  success: boolean;
  data?: any;
};

const initialState: InitialState = {
  message: "",
  success: false,
};


const GenerateFormInput: React.FC<{ text: string }> = ({ text }) => {
  const [state, formAction] = useActionState(generateForm,initialState);
  const [description, setDescription] = useState<string | undefined>("");

  const router = useRouter();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    setDescription(text);
  }, [text]);


  useEffect(() => {
    if (state.success) {
      console.log(state.message)
      toast(state.message);
      router.push(`/dashboard/forms/edit/${state.data.id}`);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="flex items-center gap-4 my-8">
      <Input
      name="description"
        value={description}
        onChange={changeHandler}
        type="text"
        placeholder="Write a Prompt to generate form..."
required
      />
      <SubmitButton />
     </form>
  );
};

export default GenerateFormInput;

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className="py-4 bg-gradient-to-r from-blue-500 to bg-purple-600"
    >
      <Sparkles className="mr-2" />
      {pending ? <span>Generating Form...</span> : "Generate Form"}
    </Button>
  );
};





