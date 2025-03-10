
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled = false, placeholder = "Escribe tu pregunta aquí..." }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "" || disabled) return;
    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-lg p-2 shadow-sm border">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-[80px] flex-1 resize-none border-0 focus-visible:ring-0 p-3 bg-transparent"
        />
        <Button 
          type="submit" 
          disabled={disabled || message.trim() === ""}
          className="bg-study-primary hover:bg-study-primary/90 self-end h-10 w-10 rounded-full p-2 flex items-center justify-center"
          size="icon"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
