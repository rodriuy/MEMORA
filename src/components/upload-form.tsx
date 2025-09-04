"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Mic,
  Square,
  UploadCloud,
  Loader2,
  Sparkles,
  Wand2,
} from "lucide-react";
import { transcribeAudioToText } from "@/ai/flows/transcribe-audio-to-text";
import { generateStoryTitle } from "@/ai/flows/generate-story-title";
import { generateEmotionalTag } from "@/ai/flows/generate-emotional-tag";
import { Badge } from "./ui/badge";

const storySchema = z.object({
  title: z.string().min(1, "El título es obligatorio."),
  family_member_name: z
    .string()
    .min(1, "El nombre del miembro de la familia es obligatorio."),
  nfc_card_id: z.string().optional(),
  text_transcript: z.string().min(1, "La transcripción del texto es obligatoria."),
  photo: z.any().optional(),
});

export default function UploadForm() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof storySchema>>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: "",
      family_member_name: "",
      nfc_card_id: "",
      text_transcript: "",
    },
  });

  const handleRecord = () => {
    setIsRecording(true);
    toast({ title: "Grabación iniciada", description: "Habla ahora para grabar tu historia." });

    // Simulate recording for 5 seconds
    setTimeout(() => {
      setIsRecording(false);
      setIsProcessing(true);
      toast({ title: "Grabación finalizada", description: "Procesando el audio..." });

      // Simulate AI processing
      startTransition(async () => {
        try {
          // In a real app, you would use the actual recorded audio data URI
          const mockAudioDataUri = "data:audio/mp3;base64,SUQzBAAAAAAB...";
          
          const { transcription } = await transcribeAudioToText({ audioDataUri: mockAudioDataUri });
          form.setValue("text_transcript", transcription || "Esta es una transcripción de ejemplo generada por la IA a partir del audio grabado. La abuela contaba que el secreto estaba en el amor.");
          
          const { title } = await generateStoryTitle({ audioUrl: "", textTranscript: form.getValues("text_transcript") });
          form.setValue("title", title || "Título de ejemplo por IA");

          const { emotionalTags } = await generateEmotionalTag({ audioUrl: "", textTranscript: form.getValues("text_transcript") });
          setTags(emotionalTags || ["Amor", "Nostalgia"]);

          setAudioUrl("/placeholder-audio.mp3");
          toast({
            title: "¡Análisis de IA completado!",
            description: "Hemos transcrito el audio y sugerido un título y etiquetas.",
            variant: "default",
          });
        } catch (error) {
          console.error("AI processing failed:", error);
          toast({
            title: "Error en el procesamiento",
            description: "No se pudo procesar el audio. Por favor, inténtalo de nuevo.",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
        }
      });
    }, 5000);
  };
  
  const onSubmit = (values: z.infer<typeof storySchema>) => {
    console.log({ ...values, emotional_tags: tags });
    toast({
      title: "¡Historia guardada!",
      description: "Tu memoria ha sido añadida al cofre familiar.",
    });
    router.push("/dashboard/explore");
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" /> Título de la Historia
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: La receta secreta de la abuela"
                        {...field}
                        disabled={isProcessing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="family_member_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Miembro de la Familia</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Abuela María"
                        {...field}
                        disabled={isProcessing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Audio de la Historia</FormLabel>
                <Card className="bg-muted/30 border-dashed">
                  <CardContent className="p-6 text-center">
                    {isRecording ? (
                      <div className="space-y-3">
                        <Button type="button" size="icon" className="w-16 h-16 bg-red-500 hover:bg-red-600 animate-pulse">
                          <Square className="w-8 h-8" />
                        </Button>
                        <p className="text-muted-foreground">Grabando...</p>
                      </div>
                    ) : isProcessing ? (
                      <div className="space-y-3">
                        <Loader2 className="w-16 h-16 mx-auto animate-spin text-primary" />
                        <p className="text-muted-foreground">Procesando con IA...</p>
                      </div>
                    ) : audioUrl ? (
                      <div className="space-y-3">
                        <audio controls src={audioUrl} className="w-full" />
                        <Button type="button" variant="link" onClick={() => setAudioUrl(null)}>Grabar de nuevo</Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button type="button" size="icon" className="w-16 h-16" onClick={handleRecord}>
                          <Mic className="w-8 h-8" />
                        </Button>
                        <p className="text-muted-foreground">
                          Haz clic para grabar tu historia
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </FormItem>

              <FormField
                control={form.control}
                name="text_transcript"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-primary" /> Transcripción (generada por IA)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="La transcripción de tu audio aparecerá aquí..."
                        className="min-h-[150px]"
                        {...field}
                        disabled={isProcessing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className="flex items-center gap-2">
                    Etiquetas Emocionales (sugeridas por IA)
                </FormLabel>
                 <div className="flex flex-wrap gap-2 rounded-md border min-h-10 p-2 bg-background">
                    {tags.length > 0 ? tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    )) : <span className="text-sm text-muted-foreground px-1 py-0.5">Las etiquetas aparecerán aquí...</span>}
                 </div>
              </FormItem>

              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto del Recuerdo</FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                                <p className="text-xs text-muted-foreground">PNG, JPG (MAX. 800x400px)</p>
                            </div>
                            <Input id="dropzone-file" type="file" className="hidden" 
                                onChange={(e) => field.onChange(e.target.files)}
                                disabled={isProcessing}
                            />
                        </label>
                      </div> 
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nfc_card_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID de Tarjeta NFC (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: nfc-001"
                        {...field}
                        disabled={isProcessing}
                      />
                    </FormControl>
                    <FormDescription>
                      Asocia esta historia a una tarjeta física de tu cofre.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending || isProcessing}>
              {(isPending || isProcessing) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar Historia
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
