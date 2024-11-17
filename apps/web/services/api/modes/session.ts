import { PictureQuestSession } from "@/types";
import domain from "../domain";

export async function endSession(
  access_token: string,
  session_id: number,
): Promise<PictureQuestSession> {
  try {
    const response = await fetch(`${domain}/api/modes/sessions`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-stack-access-token": access_token,
      },
      body: JSON.stringify({ session_id }),
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
