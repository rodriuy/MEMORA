import { BookHeart } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconOnly?: boolean;
};

export default function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <BookHeart className="h-8 w-8 text-primary" />
      {!iconOnly && (
        <span className="text-xl font-headline font-bold">Tesoros de Artigas</span>
      )}
    </div>
  );
}
