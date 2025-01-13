import { ConversationMessage } from "~/types";

export const getVoiceResponse = async ({
  text,
  language,
  voice_name,
  voice_engine,
  session_id,
  character,
  description,
  meta,
  relation,
  accessToken,
  domainUrl,
}: {
  text: string;
  language: string;
  voice_name: string;
  voice_engine: string;
  session_id: number;

  character: string;
  description: string;
  meta: string;
  relation: string;

  accessToken: string;
  domainUrl?: string;
}): Promise<Response | null> => {
  try {
    const response = await fetch(`${domainUrl}/api/ai/voice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-supa-access-token": accessToken,
      },
      body: JSON.stringify({
        text,
        language,
        voice_name,
        voice_engine,
        session_id,
        character,
        description,
        meta,
        relation,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function getLatestAssistantMessage(
  access_token: string,
  session_id: number,
  domainUrl?: string
): Promise<ConversationMessage> {
  try {
    const response = await fetch(
      `${domainUrl}/api/modes/character-convo/message?session_id=${session_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-supa-access-token": access_token,
        },
      }
    );
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
