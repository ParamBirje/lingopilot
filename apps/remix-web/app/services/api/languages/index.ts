import { Language } from "~/types";
import domain from "../domain";

export async function getFromLanguages(): Promise<Language[]> {
  try {
    const response = await fetch(`${domain}/api/languages?is_to=false`, {
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

export async function getToLanguages(): Promise<Language[]> {
  try {
    const response = await fetch(`${domain}/api/languages?is_to=true`, {
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
