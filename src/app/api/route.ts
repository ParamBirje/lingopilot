import { type NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, _res: NextResponse) {
  return NextResponse.json(
    {
      message: "Hello!",
    },
    {
      status: 200,
    },
  );
}
