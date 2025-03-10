
import React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const subjects = [
  { value: "math", label: "Matemáticas" },
  { value: "science", label: "Ciencias" },
  { value: "history", label: "Historia" },
  { value: "language", label: "Lenguaje" },
  { value: "programming", label: "Programación" },
  { value: "physics", label: "Física" },
  { value: "chemistry", label: "Química" },
  { value: "biology", label: "Biología" },
  { value: "economics", label: "Economía" },
  { value: "geography", label: "Geografía" },
];

interface SubjectSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function SubjectSelector({ value, onChange }: SubjectSelectorProps) {
  // Ensure we always have a valid value by defaulting to "math" if value is empty
  const currentValue = value || "math";

  return (
    <Select
      value={currentValue}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona una materia" />
      </SelectTrigger>
      <SelectContent>
        {subjects.map((subject) => (
          <SelectItem key={subject.value} value={subject.value}>
            <div className="flex items-center">
              {currentValue === subject.value && (
                <Check className="mr-2 h-4 w-4" />
              )}
              {subject.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
