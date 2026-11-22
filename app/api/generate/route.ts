import { NextResponse } from "next/server";
import { generateContent } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { course } = await req.json();

    const content = await generateContent(
      course
    );

    return NextResponse.json({
      content,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur" },
      { status: 500 }
    );
  }
}