"use client";

import { useState } from "react";

interface ChatInterfaceProps {
  onSendMessage: (prompt: string) => void;
  isGenerating: boolean;
}

export default function ChatInterface({
  onSendMessage,
  isGenerating,
}: ChatInterfaceProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isGenerating) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            Describe cómo quieres transformar tu espacio. Por ejemplo:
          </p>
          <ul className="text-sm text-gray-600 mt-2 space-y-1">
            <li>• "Hazlo más moderno con colores neutros"</li>
            <li>• "Añade plantas y estilo tropical"</li>
            <li>• "Convierte en oficina minimalista"</li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe tu diseño ideal..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={isGenerating || !message.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? "Generando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}
