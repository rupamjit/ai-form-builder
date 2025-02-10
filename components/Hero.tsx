"use client"
import React, { useState } from "react";
import GenerateFormInput from "./GenerateFormInput";
import { Button } from "./ui/button";

interface SuggestionText {
  label: string;
  text: string;
}

const suggestionBtnText: SuggestionText[] = [
  {
    label: "Job Application",
    text: "Develop a basic job application form that serves as a one-page solution form collecting essential information from applicants.",
  },
  {
    label: "Registration Form",
    text: "Create a course registration form suitable form any scheool or instituition.",
  },
  {
    label: "Feedback Form",
    text: "Create a client feedback form to gather valuable insights from any clients.",
  },
];

const HeroSection = () => {

const [text,setText] = useState<string>("")

  return (
    <section>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-50 -z-10"></div>

        <div className="container text-center relative">
          <h1 className="text-4xl font-bold">
            Build Ai-Driven Forms Effortlessly
          </h1>
          <p className="mt-4 text-lg ">
            Leverage the power of AI to create responsive and dynamic forms in
            inutes
          </p>
        </div>
      </div>
      <GenerateFormInput text={text}/>
      <div className="grid grid-cols-3 gap-3">
        {suggestionBtnText.map((item: SuggestionText, index: number) => (
          <Button onClick={()=>setText(item.text)} className="rounded-full h-10 " variant="outline" key={index}>
            {item.label}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
