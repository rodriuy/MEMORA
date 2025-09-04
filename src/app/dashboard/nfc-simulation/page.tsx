"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScanLine, History, PlayCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sampleStories } from "@/lib/data";

type NfcEvent = {
  cardId: string;
  storyTitle: string;
  timestamp: string;
};

export default function NfcSimulationPage() {
  const [events, setEvents] = useState<NfcEvent[]>([]);
  const { toast } = useToast();

  const simulateNfcRead = () => {
    // Pick a random story to simulate
    const randomStory = sampleStories[Math.floor(Math.random() * sampleStories.length)];
    const newEvent: NfcEvent = {
      cardId: randomStory.nfc_card_id,
      storyTitle: randomStory.title,
      timestamp: new Date().toLocaleTimeString(),
    };

    setEvents([newEvent, ...events]);

    toast({
      title: "Tarjeta NFC detectada",
      description: `Reproduciendo: "${randomStory.title}"`,
      action: (
        <div className="flex items-center gap-2 text-foreground/80">
          <PlayCircle className="h-5 w-5" />
          Escuchando...
        </div>
      ),
    });
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">
            Simulación de Lector NFC
          </h1>
          <p className="mt-2 text-muted-foreground">
            Simula la lectura de una tarjeta NFC del cofre físico para reproducir una historia.
          </p>
        </header>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>Simular Lectura de Tarjeta</CardTitle>
            <CardDescription>
              Haz clic en el botón para simular que acercas una tarjeta al cofre.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" onClick={simulateNfcRead} className="gap-2">
              <ScanLine />
              Simular Lectura NFC
            </Button>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History />
              Registro de Simulaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            {events.length > 0 ? (
              <ul className="space-y-3">
                {events.map((event, index) => (
                  <li key={index} className="flex justify-between items-center text-sm p-2 rounded-md bg-muted/50">
                    <div>
                      <span className="font-semibold">{event.storyTitle}</span>
                      <span className="text-muted-foreground ml-2">(Tarjeta: {event.cardId})</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                No se han realizado simulaciones todavía.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
