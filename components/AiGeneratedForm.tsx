import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'

// export interface FormData {
//   id?: string;
//   title?: string;
//   fields?: Array<{
//     id: string;
//     label: string;
//     type: string;
//   }>;
// }

const AiGeneratedForm : React.FC<{form: any, isEditMode: boolean}> = ({form,isEditMode}) => {
  return (
    <div>
        <form >
            {
                form?.formFields?.map((items:any,index:number)=>(
                    <div key={index} className="mb-8">
                        <Label>{items.label}</Label>
                        <Input name={items.name} placeholder={items.placeholder} required={!isEditMode && items.required}/>
                    </div>
                ))
            }
        </form>
    </div>
  )
}

export default AiGeneratedForm