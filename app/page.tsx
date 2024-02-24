import { HeadingComponent } from '@/components/HeadingComponent';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { uri } from '@/lib/uri';
import { Character } from '@/model/api.model';
import Image from 'next/image';

export default async function Home() {
  const url = uri('characters');
  const getData = await fetch(url);
  const result = await getData.json();
  const characters: Character[] = result.data.results;

  return (
    <>
      <h1>Marvel</h1>
      <ul>
        {result.data.results.map((character: any) => (
          <li key={character.id}>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                extension: Extension;
                <Image
                  src={`${character.thumbnail.path}.jpg`}
                  height={100}
                  width={100}
                  alt={character.name}
                />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
