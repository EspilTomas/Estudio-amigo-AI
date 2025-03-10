
import { toast } from "@/components/ui/use-toast";

// OpenAI API configuration
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Interface for the OpenAI request
interface OpenAIRequest {
  model: string;
  messages: {
    role: "system" | "user" | "assistant";
    content: string;
  }[];
  temperature?: number;
}

// Interface for the OpenAI response
interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
  error?: {
    message: string;
  };
}

export async function getAIResponse(
  userMessage: string,
  subject: string,
  apiKey: string,
  previousMessages: { role: "user" | "assistant"; content: string }[] = []
): Promise<string> {
  if (!apiKey) {
    return "Por favor, configura tu API Key de OpenAI para poder utilizar el asistente.";
  }

  try {
    // Create system prompt based on subject
    const systemPrompt = createSystemPrompt(subject);
    
    // Prepare messages for OpenAI API
    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...previousMessages,
      { role: "user" as const, content: userMessage }
    ];

    // Call OpenAI API
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // You can change this to other models like "gpt-4" if needed
        messages,
        temperature: 0.7
      } as OpenAIRequest)
    });

    const data = await response.json() as OpenAIResponse;

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    toast({
      variant: "destructive",
      title: "Error de OpenAI",
      description: error instanceof Error ? error.message : "Error desconocido al conectar con OpenAI"
    });
    return "Lo siento, hubo un error al procesar tu pregunta. Por favor, intenta de nuevo más tarde.";
  }
}

// Create system prompt based on selected subject
function createSystemPrompt(subject: string): string {
  const basePrompt = "Eres un tutor educativo especializado en ayudar a estudiantes. Responde de manera clara, concisa y educativa, adaptando tu nivel a estudiantes.";
  
  const subjectPrompts: Record<string, string> = {
    math: `${basePrompt} Especialízate en matemáticas, explicando conceptos, resolviendo problemas paso a paso y proporcionando ejemplos prácticos.`,
    science: `${basePrompt} Especialízate en ciencias, explicando fenómenos científicos, procesos y conceptos con claridad y precisión.`,
    history: `${basePrompt} Especialízate en historia, proporcionando contexto histórico, análisis de eventos y explicando relaciones causa-efecto.`,
    language: `${basePrompt} Especialízate en lengua y literatura, ayudando con gramática, análisis literario y mejorando habilidades de escritura.`,
    programming: `${basePrompt} Especialízate en programación, explicando conceptos de código, algoritmos y prácticas de desarrollo de software.`,
    physics: `${basePrompt} Especialízate en física, explicando leyes, teorías y resolviendo problemas con claridad y precisión matemática.`,
    chemistry: `${basePrompt} Especialízate en química, explicando reacciones, estructuras moleculares y conceptos fundamentales.`,
    biology: `${basePrompt} Especialízate en biología, explicando procesos celulares, sistemas orgánicos y conceptos evolutivos.`,
    economics: `${basePrompt} Especialízate en economía, explicando principios económicos, análisis de mercados y conceptos financieros.`,
    geography: `${basePrompt} Especialízate en geografía, explicando formaciones geográficas, climas y factores geopolíticos.`,
  };
  
  return subject && subjectPrompts[subject] 
    ? subjectPrompts[subject] 
    : `${basePrompt} Responde preguntas generales de estudiantes sobre cualquier materia académica.`;
}
