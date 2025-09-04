import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Story } from '@/lib/types';
import { Badge } from './ui/badge';
import { CircleUserRound } from 'lucide-react';

type StoryCardProps = {
  story: Story;
};

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={`/dashboard/avatar/${story.story_id}`}>
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={story.photo_url}
              alt={story.title}
              fill
              className="object-cover"
              data-ai-hint="family story"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <h3 className="font-headline font-semibold text-lg leading-tight truncate">{story.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <CircleUserRound className="w-4 h-4 shrink-0" />
            <span>{story.family_member_name}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
            <div className="flex flex-wrap gap-2">
                {story.emotional_tag.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
                ))}
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
