import UploadForm from "@/components/upload-form";

export default function UploadPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">
            Subir una Nueva Historia
          </h1>
          <p className="mt-2 text-muted-foreground">
            Añade un nuevo tesoro a tu cofre familiar. Rellena los detalles, graba un audio y comparte un momento.
          </p>
        </header>

        <UploadForm />
      </div>
    </div>
  );
}
