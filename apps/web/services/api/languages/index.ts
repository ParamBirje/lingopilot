import { Language } from "@/types";
import domain from "../domain";

export async function getFromLanguages(): Promise<Language[]> {
  // access_token: string,
  try {
    const response = await fetch(`${domain}/api/languages?is_to=false`, {
      headers: {
        "Content-Type": "application/json",
        // "x-stack-access-token": access_token,
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
  // access_token: string,
  try {
    const response = await fetch(`${domain}/api/languages?is_to=true`, {
      headers: {
        "Content-Type": "application/json",
        // "x-stack-access-token": access_token,
      },
    });
    const jsonData = await response.json();
    return JSON.parse(jsonData).data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
