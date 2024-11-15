import {
  Mode,
  PictureQuestAnswerUpdate,
  PictureQuestQuestion,
  PictureQuestQuestionCreate,
  PictureQuestSession,
  PictureQuestSessionCreate,
} from "@/types";
import domain from "../domain";

export async function getPreviousQuests(
  access_token: string,
): Promise<PictureQuestSession[]> {
  try {
    const mode: Mode = "PICTURE_QUEST";
    const response = await fetch(`${domain}/api/modes/sessions?mode=${mode}`, {
      cache: "reload",
      headers: {
        "Content-Type": "application/json",
        "x-stack-access-token": access_token,
      },
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createPictureQuestSession(
  access_token: string,
  params: PictureQuestSessionCreate,
): Promise<PictureQuestSession> {
  try {
    const response = await fetch(`${domain}/api/modes/picture-quest`, {
      method: "POST",
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

export async function updateAnswer(
  access_token: string,
  params: PictureQuestAnswerUpdate,
): Promise<PictureQuestQuestion> {
  try {
    const response = await fetch(
      `${domain}/api/modes/picture-quest/questions`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-stack-access-token": access_token,
        },
        body: JSON.stringify(params),
      },
    );
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestions(
  access_token: string,
  params: PictureQuestQuestionCreate,
): Promise<PictureQuestQuestion[]> {
  try {
    const response = await fetch(
      `${domain}/api/modes/picture-quest/questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-stack-access-token": access_token,
        },
        body: JSON.stringify(params),
      },
    );
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestions(
  access_token: string,
  session_id: number,
): Promise<PictureQuestQuestion[]> {
  try {
    const response = await fetch(
      `${domain}/api/modes/picture-quest/questions?session_id=${session_id}`,
      {
        cache: "reload",
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
