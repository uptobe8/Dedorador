'use client';

import Image from 'next/image';

export default function ResultGallery({ images }: { images: string[] }) {
  if (images.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Diseños Generados</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
            <img src={image} alt={`Resultado ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
