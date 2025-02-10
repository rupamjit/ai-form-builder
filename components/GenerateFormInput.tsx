import {Input} from "@/components/ui/input"
import React from 'react'
import { Button } from "./ui/button"

const GenerateFormInput = () => {
  return (
    <div className="flex items-center gap-4 my-8">
        <Input type="text" placeholder="Write a Prompt to generate form..."/>
        <Button>Generate Form</Button>
    </div>
  )
}

export default GenerateFormInput