import { sampleStories } from "@/lib/data";
import { notFound } from "next/navigation";
import AvatarPlayer from "@/components/avatar-player";

type AvatarPageProps = {
  params: {
    storyId: string;
  };
};

export default function AvatarPage({ params }: AvatarPageProps) {
  const story = sampleStories.find((s) => s.story_id === params.storyId);

  if (!story) {
    notFound();
  }

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <AvatarPlayer story={story} />
      </div>
    </div>
  );
}

// Generate static paths for sample stories
export async function generateStaticParams() {
  return sampleStories.map((story) => ({
    storyId: story.story_id,
  }));
}
