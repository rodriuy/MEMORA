import Image from 'next/image';
import AuthCard from '@/components/auth-card';
import Logo from '@/components/logo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative flex-1 hidden lg:flex items-center justify-center bg-accent/20 p-10">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/1200/1000"
            alt="Family memories background"
            data-ai-hint="family photo album"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        <div className="relative z-10 text-center text-foreground">
          <div className="mb-6 flex justify-center">
            <Logo className="h-12 w-auto" />
          </div>
          <h1 className="font-headline text-4xl font-bold leading-tight">
            Tesoros de Artigas
          </h1>
          <p className="mt-4 text-lg max-w-xl mx-auto">
            Reviví los tesoros de tu familia. Un cofre digital para guardar y compartir las historias que nos unen.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-[450px] lg:shrink-0 flex items-center justify-center p-6 sm:p-8 bg-background">
        <AuthCard />
      </div>
    </main>
  );
}
