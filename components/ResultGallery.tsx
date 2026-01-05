"use client";

import Image from "next/image";

interface ResultGalleryProps {
  uploadedImages: string[];
  generatedImages: string[];
}

export default function ResultGallery({
  uploadedImages,
  generatedImages,
}: ResultGalleryProps) {
  return (
    <div className="p-6 space-y-6">
      {uploadedImages.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Imágenes Originales
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {uploadedImages.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-video rounded-lg overflow-hidden border border-gray-200"
              >
                <Image
                  src={img}
                  alt={`Original ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {generatedImages.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Diseños Generados
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {generatedImages.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-video rounded-lg overflow-hidden border-2 border-blue-200 shadow-lg"
              >
                <Image
                  src={img}
                  alt={`Generado ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
