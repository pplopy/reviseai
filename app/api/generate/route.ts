import { NextResponse } from "next/server";
import { generateContent } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { course } = await req.json();

    const result = await generateContent(course);

    return NextResponse.json({
      result,
    });
  } catch (error) {
    console.error("ERREUR GEMINI :", error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
