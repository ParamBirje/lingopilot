import { CharacterConvoSession, CharacterConvoSessionCreate, ConversationMessage } from "~/types";
import domain from "../domain";

export async function createCharacterConvoSession(
  params: CharacterConvoSessionCreate
): Promise<CharacterConvoSession> {
  try {
    const response = await fetch(`${domain}/api/modes/character-convo`, {
      method: "POST",
      cache: "reload",
      headers: {
        "Content-Type": "application/json",
        "x-supa-access-token": params.accessToken,
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

export async function getCharacterConvoSession(
  access_token: string,
  session_id: number
): Promise<CharacterConvoSession | null> {
  try {
    const response = await fetch(`${domain}/api/modes/character-convo?session_id=${session_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-supa-access-token": access_token,
      },
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getLatestAssistantMessage(
  access_token: string,
  session_id: number
): Promise<ConversationMessage> {
  try {
    const response = await fetch(
      `${domain}/api/modes/character-convo/message?session_id=${session_id}`,
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

// export const getVoiceResponse = async ({
//   text,
//   language,
//   voice_name,
//   voice_engine,
//   session_id,
//   character,
//   description,
//   meta,
//   relation,
//   accessToken,
// }:{
//   text: string,
//   language: string,
//   voice_name: string,
//   voice_engine: string,
//   session_id: number,

//   character: string,
//   description: string,
//   meta: string,
//   relation: string,

//   accessToken: string,
// }
// ): Promise<Response | null> => {
//   try {
//     const response = await fetch(`${domain}/api/ai/voice`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-supa-access-token": accessToken,
//       },
//       body: JSON.stringify({
//         text,
//         language,
//         voice_name,
//         voice_engine,
//         session_id,
//         character,
//         description,
//         meta,
//         relation,
//       }),
//     });
//     return response;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };