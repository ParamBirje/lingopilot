import {
  CharacterConvoSession,
  CharacterConvoSessionCreate,
  ConversationMessage,
} from "@/types";
import domain from "../domain";

export async function createCharacterConvoSession(
  params: CharacterConvoSessionCreate,
): Promise<CharacterConvoSession> {
  try {
    const response = await fetch(`${domain}/api/modes/character-convo`, {
      method: "POST",
      cache: "reload",
      headers: {
        "Content-Type": "application/json",
        "x-stack-access-token": params.access_token,
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

export async function getLatestAssistantMessage(
  access_token: string,
  session_id: number,
): Promise<ConversationMessage> {
  try {
    const response = await fetch(
      `${domain}/api/modes/character-convo/message?session_id=${session_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-stack-access-token": access_token,
        },
      },
    );
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
