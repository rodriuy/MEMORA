import { sampleStories } from "@/lib/data";
import StoryCard from "@/components/story-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ExplorePage() {
  const stories = sampleStories;

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 space-y-2">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">
            Explorar Memorias
          </h1>
          <p className="text-muted-foreground">
            Busca y revive las historias que tu familia ha compartido.
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, título o etiqueta..."
              className="pl-10"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stories.map((story) => (
            <StoryCard key={story.story_id} story={story} />
          ))}
        </div>
        {stories.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
             <h3 className="font-semibold text-lg">No hay historias todavía</h3>
             <p className="text-muted-foreground mt-1">Empieza por subir tu primera memoria familiar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
