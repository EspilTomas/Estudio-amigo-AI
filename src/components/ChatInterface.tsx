
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageType } from "./ChatMessage";
import { ChatHistory } from "./ChatHistory";
import { ChatInput } from "./ChatInput";
import { SubjectSelector } from "./SubjectSelector";
import { getAIResponse } from "@/services/openai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface ChatInterfaceProps {
  className?: string;
}

// Default subject to use
const DEFAULT_SUBJECT = "math";

export function ChatInterface({ className }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem("openai_api_key") || "";
  });
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const { toast } = useToast();

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("openai_api_key", apiKey);
    }
  }, [apiKey]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Check if API key is set
    if (!apiKey) {
      setIsApiKeyDialogOpen(true);
      return;
    }
    
    // Add user message
    const userMessage: MessageType = {
      id: uuidv4(),
      content,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    
    try {
      // Get previous messages for context (last 10 messages only)
      const previousMessages = messages
        .slice(-10)
        .map(msg => ({ 
          role: msg.role, 
          content: msg.content 
        }));
      
      // Get AI response
      const responseContent = await getAIResponse(
        content, 
        subject, 
        apiKey,
        previousMessages
      );
      
      const assistantMessage: MessageType = {
        id: uuidv4(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
      toast({
        title: "Error",
        description: "No pudimos procesar tu pregunta. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeySave = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey);
      setIsApiKeyDialogOpen(false);
      toast({
        title: "API Key guardada",
        description: "Tu API Key de OpenAI ha sido guardada correctamente.",
      });
    } else {
      toast({
        title: "API Key requerida",
        description: "Por favor, introduce una API Key válida.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className={`flex flex-col h-full ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <SubjectSelector value={subject} onChange={setSubject} />
            <Button 
              variant="outline" 
              onClick={() => setIsApiKeyDialogOpen(true)}
              className="text-xs"
            >
              {apiKey ? "Cambiar API Key" : "Configurar API Key"}
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden p-0">
          <ChatHistory messages={messages} loading={loading} />
        </CardContent>
        
        <CardFooter className="pt-3">
          <ChatInput 
            onSend={handleSendMessage} 
            disabled={loading}
            placeholder="Escribe tu pregunta sobre la materia seleccionada..."
          />
        </CardFooter>
      </Card>

      <Dialog open={isApiKeyDialogOpen} onOpenChange={setIsApiKeyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configurar API Key de OpenAI</DialogTitle>
            <DialogDescription>
              Introduce tu API Key de OpenAI para utilizar el asistente. Puedes obtener una en 
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-study-primary ml-1">
                platform.openai.com
              </a>
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="button" onClick={handleApiKeySave} className="bg-study-primary hover:bg-study-primary/90">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
