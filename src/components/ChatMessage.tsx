
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

export type MessageType = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  // Function to format message content with Markdown-like syntax
  const formatContent = (content: string) => {
    // Replace line breaks with <br> tags
    const formattedContent = content
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>");
    
    return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
  };

  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 py-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 bg-study-primary text-white">
          <Bot className="h-4 w-4" />
        </Avatar>
      )}
      
      <div 
        className={cn(
          "max-w-[80%] rounded-lg p-3",
          isUser 
            ? "bg-study-secondary text-white" 
            : "bg-muted text-foreground",
          "whitespace-pre-wrap"
        )}
      >
        {formatContent(message.content)}
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 bg-study-secondary text-white">
          <User className="h-4 w-4" />
        </Avatar>
      )}
    </div>
  );
}
