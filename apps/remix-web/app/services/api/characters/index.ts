import { Character } from "~/types";
import domain from "../domain";

export async function getCharacters(
  access_token: string
): Promise<Character[]> {
  try {
    const response = await fetch(`${domain}/api/characters`, {
      cache: "reload",
      headers: {
        "Content-Type": "application/json",
        "x-supa-access-token": access_token,
      },
    });
    const jsonData = await response.json();
    return JSON.parse(jsonData).data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
