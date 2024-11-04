import domain from "../domain";

export const getVoiceResponse = async (
  text: string,
  language: string,
  character: string,

  accessToken: string,
): Promise<Response | null> => {
  try {
    const response = await fetch(`${domain}/api/ai/voice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-stack-access-token": accessToken,
      },
      body: JSON.stringify({ text, language, character }),
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
