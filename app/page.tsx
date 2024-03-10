import CharactersList from "@/components/CharactersListComponent";
import { uri } from "@/lib/uri";
import { Character } from "@/model/api.characters.model";

async function getData(): Promise<{ results: Character[]; total: number }> {
  const url = uri("characters", 100, 0);
  const getData = await fetch(url);
  const result = await getData.json();
  const characters: Character[] = result.data.results;

  return { results: characters, total: result.data.total };
}

export default async function Home() {
  const data = await getData();

  return <CharactersList characters={data.results} pageTotal={data.total} />;
}
