import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        // Base styles com fonte Work Sans
        "flex min-h-[80px] w-full rounded-md font-body text-sm",
        // Border cinza claro → azul médio no focus (Manual da Marca)
        "border border-border bg-background px-3 py-2",
        "focus-visible:outline-none focus-visible:border-brand-blue-medium focus-visible:ring-2 focus-visible:ring-brand-blue-medium/20 focus-visible:ring-offset-0",
        // Transição suave
        "transition-colors duration-200",
        // Placeholder e estados
        "placeholder:text-muted-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
