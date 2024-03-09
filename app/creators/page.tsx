import { uri } from "@/lib/uri";
import { ComicsData, Comics } from "@/model/api.comics.model";
import { Creators, CreatorsData } from "@/model/api.creators.model";
import Image from "next/image";

export default async function CreatorsPage() {
  const url = uri("creators", 100, 0);
  const getData = await fetch(url);
  const result = await getData.json();

  const comicData: CreatorsData = result.data;

  return (
    <ul className="flex flex-wrap gap-3">
      {comicData.results.map((comic: Creators) => (
        <li key={comic.id}>
          <Image
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.fullName}
            height={150}
            width={150}
            title={comic.fullName}
          />
        </li>
      ))}
    </ul>
  );
}
