import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
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
      "jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
      {
        input: {
          image,
          prompt,
          num_outputs: 1,
          image_resolution: "512",
          ddim_steps: 20,
        },
      }
    );

    return NextResponse.json({ output });
  } catch (error) {
    console.error("Error generando imagen:", error);
    return NextResponse.json(
      { error: "Error al generar la imagen" },
      { status: 500 }
    );
  }
}
