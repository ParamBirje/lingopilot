import { NextRequest, NextResponse } from "next/server";

export default function GET(req: NextRequest, res: NextResponse) {
  const audioStream = new StreamingResponse();
  return audioStream.pipe(res);
}
