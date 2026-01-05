"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import ChatInterface from "../components/ChatInterface";
import ImageUpload from "../components/ImageUpload";
import ResultGallery from "../components/ResultGallery";

export default function HomePage() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImagesUpload = (images: string[]) => {
    setUploadedImages(images);
  };

  const handleGenerateDesign = async (prompt: string) => {
    if (uploadedImages.length === 0) {
      alert("Por favor, sube al menos una imagen primero");
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: uploadedImages[uploadedImages.length - 1],
          prompt: prompt,
        }),
      });

      const data = await response.json();
      if (data.output) {
        setGeneratedImages([...generatedImages, data.output]);
      }
    } catch (error) {
      console.error("Error generando diseño:", error);
      alert("Error al generar el diseño. Por favor, intenta de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Dedorador IA</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-180px)]">
          {/* Left Panel - Image Upload & Gallery */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tus Espacios
            </h2>
            
            <ImageUpload onImagesUpload={handleImagesUpload} />
            
            <div className="mt-6 flex-1 overflow-y-auto">
              <ResultGallery 
                uploadedImages={uploadedImages}
                generatedImages={generatedImages}
              />
            </div>
          </div>

          {/* Right Panel - Chat Interface */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col">
            <ChatInterface 
              onSendMessage={handleGenerateDesign}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
