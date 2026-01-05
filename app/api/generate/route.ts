import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { image, prompt } = await req.json();

    if (!image || !prompt) {
      return NextResponse.json(
        { error: "Faltan imagen o prompt" },
        { status: 400 }
      );
    }

    const output = await replicate.run(
      "timbrooks/instruct-pix2pix:30c1d0b916a6f1e3ed1c0f54d354e78e3e0991f5b27b5318e86c1d2cdcd88c9e",
      {
        input: {
          image,
          prompt,
          num_outputs: 1,
          image_resolution: "512",
          num_inference_steps: 20,
        },
      }
    );

    return NextResponse.json({ output });
  } catch (error: any) {
    console.error("Error en API:", error);
    return NextResponse.json(
      { error: error.message || "Error al generar imagen" },
      { status: 500 }
    );
  }
}
