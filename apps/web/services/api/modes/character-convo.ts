import { CharacterConvoSession, CharacterConvoSessionCreate } from "@/types";
import domain from "../domain";

export async function createCharacterConvoSession(
  access_token: string,
  params: CharacterConvoSessionCreate,
): Promise<CharacterConvoSession> {
  try {
    const response = await fetch(`${domain}/api/modes/character-convo`, {
      method: "POST",
      cache: "reload",
      headers: {
        "Content-Type": "application/json",
        "x-stack-access-token": access_token,
      },
      body: JSON.stringify(params),
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
