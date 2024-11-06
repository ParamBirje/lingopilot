import domain from "../domain";

export const getVoiceResponse = async (
  text: string,
  language: string,
  voice_name: string,
  voice_engine: string,
  session_id: string,

  accessToken: string,
): Promise<Response | null> => {
  try {
    const response = await fetch(`${domain}/api/ai/voice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-stack-access-token": accessToken,
      },
      body: JSON.stringify({
        text,
        language,
        voice_name,
        voice_engine,
        session_id,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
