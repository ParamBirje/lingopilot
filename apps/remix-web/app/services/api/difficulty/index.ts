import { Difficulty } from "~/types";
import domain from "../domain";

export async function getAvailableDifficulty(): Promise<Difficulty[]> {
  try {
    const response = await fetch(`${domain}/api/difficulty`, {
      cache: "reload",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonData = await response.json();
    return JSON.parse(jsonData).data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}