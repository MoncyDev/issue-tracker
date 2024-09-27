import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await prisma.user.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(user);
  } catch (error) {
    console.error(`${request.method} was unsuccessfull. errors: ${error}`);
  }
}
