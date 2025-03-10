
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { ChatInterface } from "@/components/ChatInterface";
import { BookOpen, GraduationCap, BrainCircuit, History, Lightbulb } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="py-6 px-8 border-b bg-white dark:bg-gray-950 shadow-sm">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-study-primary" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Inteligencia Estudio Amigo</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-6xl mx-auto py-8 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ChatInterface className="h-[700px]" />
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 border animate-bounce-in" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-study-primary" />
                <h2 className="text-xl font-semibold">Aprende Más Rápido</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Obtén respuestas instantáneas a tus preguntas académicas y mejora tu comprensión de cualquier tema.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 border animate-bounce-in" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-3 mb-4">
                <BrainCircuit className="h-6 w-6 text-study-secondary" />
                <h2 className="text-xl font-semibold">Conceptos Claros</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Recibe explicaciones adaptadas a tu nivel de conocimiento, con ejemplos prácticos y fáciles de entender.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 border animate-bounce-in" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-3 mb-4">
                <History className="h-6 w-6 text-study-accent" />
                <h2 className="text-xl font-semibold">Historial de Preguntas</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Revisa tus conversaciones anteriores para repasar conceptos y prepararte para exámenes.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 border animate-bounce-in" style={{ animationDelay: "400ms" }}>
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-6 w-6 text-study-success" />
                <h2 className="text-xl font-semibold">Consejos de Estudio</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Recibe recomendaciones para mejorar tus técnicas de estudio y maximizar tu tiempo de aprendizaje.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 px-8 text-center text-gray-500 border-t">
        <div className="container max-w-6xl mx-auto">
          <p>© 2025 Inteligencia Estudio Amigo. Tu asistente de estudios personal.</p>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
