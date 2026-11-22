import { NextResponse } from "next/server";
import { generateContent } from "@/lib/gemini";

export async function POST(
  req: Request
) {
  try {
    const {
      course,
      level,
    } = await req.json();

    const result =
      await generateContent(
        course,
        level
      );

    return NextResponse.json({
      result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erreur Gemini",
      },
      {
        status: 500,
      }
    );
  }
}