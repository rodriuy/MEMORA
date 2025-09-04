import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookHeart, UploadCloud } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col bg-muted/20">
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center">
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
              Bienvenido a tu cofre de tesoros
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Aquí es donde las historias de tu familia cobran vida.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <UploadCloud className="text-primary" />
                  <span>Tu Primera Historia</span>
                </CardTitle>
                <CardDescription>
                  ¿Listo para añadir un nuevo recuerdo? Graba un audio, sube una foto y deja que la magia comience.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button asChild className="w-full">
                  <Link href="/dashboard/upload">Subir una Historia</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <BookHeart className="text-accent" />
                  <span>Explora tus Memorias</span>
                </CardTitle>
                <CardDescription>
                  Viaja en el tiempo y revive los momentos más preciados que tu familia ha compartido.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/dashboard/explore">Ver mis Historias</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-gradient-to-br from-accent/10 to-transparent">
             <CardHeader>
                <CardTitle className="font-headline">Un legado para el futuro</CardTitle>
                <CardDescription>
                Cada historia que guardas es un hilo en el tejido de tu herencia familiar. Estas memorias son un regalo para las generaciones futuras, una forma de conectar con sus raíces y entender de dónde vienen.
                </CardDescription>
              </CardHeader>
          </Card>

        </div>
      </main>
    </div>
  );
}
