
import React, { useRef, useEffect } from "react";
import { MessageType, ChatMessage } from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatHistoryProps {
  messages: MessageType[];
  loading?: boolean;
}

export function ChatHistory({ messages, loading = false }: ChatHistoryProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-3 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center text-muted-foreground">
            <div className="text-4xl mb-3">👋</div>
            <h3 className="text-xl font-semibold mb-2">¡Bienvenido a tu Asistente de Estudios!</h3>
            <p>Selecciona una materia y hazme cualquier pregunta para comenzar.</p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        
        {loading && (
          <div className="flex gap-1 items-center p-3 w-fit rounded-full bg-muted">
            <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "300ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "600ms" }}></div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>
    </ScrollArea>
  );
}
