"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, Loader2 } from "lucide-react";
import type { Story } from "@/lib/types";
import { Badge } from "./ui/badge";

type AvatarPlayerProps = {
  story: Story;
};

enum PlaybackState {
  Idle,
  Loading,
  Playing,
  Paused,
}

export default function AvatarPlayer({ story }: AvatarPlayerProps) {
  const [playbackState, setPlaybackState] = useState<PlaybackState>(PlaybackState.Idle);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(story.text_transcript);
    u.lang = "es-UY";

    u.onstart = () => setPlaybackState(PlaybackState.Playing);
    u.onpause = () => setPlaybackState(PlaybackState.Paused);
    u.onresume = () => setPlaybackState(PlaybackState.Playing);
    u.onend = () => setPlaybackState(PlaybackState.Idle);
    u.onerror = () => {
      setPlaybackState(PlaybackState.Idle);
    };

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [story.text_transcript]);
  
  const handlePlay = () => {
    const synth = window.speechSynthesis;
    if (!utterance) return;
  
    if (playbackState === PlaybackState.Paused) {
      synth.resume();
    } else {
      // Ensure voices are loaded
      let voices = synth.getVoices();
      if (voices.length === 0) {
        setPlaybackState(PlaybackState.Loading);
        synth.onvoiceschanged = () => {
          voices = synth.getVoices();
          const spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
          utterance.voice = spanishVoice || null;
          synth.speak(utterance);
        };
      } else {
        const spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
        utterance.voice = spanishVoice || null;
        synth.speak(utterance);
      }
    }
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setPlaybackState(PlaybackState.Idle);
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full">
          <Image
            src={story.photo_url}
            alt={story.title}
            fill
            className="object-cover"
            priority
            data-ai-hint="family portrait"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative -mt-20">
            <div className="mx-auto w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden border-4 border-background shadow-lg">
                <Image
                    src={story.photo_url}
                    alt={story.family_member_name}
                    fill
                    className="object-cover"
                    data-ai-hint="person portrait"
                />
            </div>
        </div>

        <div className="text-center mt-4">
          <CardTitle className="font-headline text-3xl">{story.title}</CardTitle>
          <CardDescription className="text-lg mt-1">
            Una historia de {story.family_member_name}
          </CardDescription>
          <div className="flex justify-center flex-wrap gap-2 mt-4">
            {story.emotional_tag.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center space-x-2">
            {playbackState === PlaybackState.Idle && (
              <Button size="lg" onClick={handlePlay} className="gap-2">
                <Play />
                Escuchar Historia
              </Button>
            )}
            {playbackState === PlaybackState.Loading && (
                <Button size="lg" disabled className="gap-2">
                    <Loader2 className="animate-spin" />
                    Cargando...
                </Button>
            )}
            {playbackState === PlaybackState.Playing && (
              <>
                <Button size="lg" onClick={handlePause} variant="secondary" className="gap-2">
                  <Pause />
                  Pausar
                </Button>
                <Button size="lg" onClick={handleStop} variant="destructive" className="gap-2">
                  <Square />
                  Detener
                </Button>
              </>
            )}
            {playbackState === PlaybackState.Paused && (
              <>
                <Button size="lg" onClick={handlePlay} className="gap-2">
                  <Play />
                  Continuar
                </Button>
                 <Button size="lg" onClick={handleStop} variant="destructive" className="gap-2">
                  <Square />
                  Detener
                </Button>
              </>
            )}
        </div>
        
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2">Transcripción:</h4>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{story.text_transcript}</p>
        </div>
      </CardContent>
    </Card>
  );
}
