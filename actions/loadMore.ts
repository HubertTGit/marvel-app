"use server";

import { CHARACTER_ITEMS_LENGTH, uri } from "@/lib/uri";
import { Character } from "@/model/api.characters.model";

export default async function loadMore(
  currentLength: number,
): Promise<Character[]> {
  try {
    const url = uri("characters", CHARACTER_ITEMS_LENGTH, currentLength);
    const getData = await fetch(url);
    const result = await getData.json();
    return result.data.results;
  } catch (error) {
    throw new Error("Fetch has failed due to limit usage reached.");
  }
}
