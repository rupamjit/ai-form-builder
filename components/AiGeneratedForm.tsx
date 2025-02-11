import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";

export interface FormField {
  id?: string;
  label: string;
  type: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  button?: string;
  options?: string[];
}

export interface FormContent {
  title: string;
  fields: FormField[];
  button?: string;
}

export interface FormData {
  content: FormContent;
}

const AiGeneratedForm: React.FC<{ form: FormData; isEditMode: boolean }> = ({
  form,
  isEditMode,
}) => {
  const formContent =
    typeof form.content === "string" ? JSON.parse(form.content) : form.content;

    console.log('Form Content:', formContent);
    console.log('Fields:', formContent.fields);
    console.log('Is Array:', Array.isArray(formContent.fields));

  if (!formContent.fields || !Array.isArray(formContent.fields)) {
    console.error("Invalid form structure:", formContent);
    return <div>Error: Invalid form structure</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <form className="space-y-4">
        {formContent?.fields?.map((item: FormField, index: number) => (
          <div key={index} className="mb-4">
            <Label className="mb-2">{item.label}</Label>
            {item.type === "text" ||
            item.type === "email" ||
            item.type === "date" ||
            item.type === "tel" ||
            item.type === "number" ||
            item.type === "file" ? (
              <Input
                type={item.type}
                name={item.name}
                placeholder={item.placeholder}
                required={!isEditMode && item.required}
              />
            ) : item.type === "textarea" ? (
              <Textarea
                name={item.name}
                placeholder={item.placeholder}
                required={!isEditMode && item.required}
                className="w-full border rounded"
              />
            ) : item.type === "select" ? (
              <Select name={item.name}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={item.placeholder || "Select an option"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {item.options?.map((option: string, optionIndex: number) => (
                    <SelectItem key={optionIndex} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : item.type === "radio" ? (
              <RadioGroup name={item.name}>
                {item.options?.map((option: string, optionIndex: number) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={option} />
                    <Label>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            ) : item.type === "checkbox" ? (
              <div className="space-y-2">
                {item.options?.map((option: string, optionIndex: number) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox />
                    <Label>{option}</Label>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        <Button type="submit" className="w-full">
          {isEditMode ? "Publish" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default AiGeneratedForm;
