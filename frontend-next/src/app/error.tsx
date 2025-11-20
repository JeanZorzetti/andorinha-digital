'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-destructive mb-4">Ops!</h1>
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Algo deu errado
      </h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Ocorreu um erro inesperado. Por favor, tente novamente.
      </p>
      <Button onClick={reset}>Tentar novamente</Button>
    </div>
  );
}
