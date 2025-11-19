import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles com fonte Work Sans
          "flex h-10 w-full rounded-md font-body text-base md:text-sm",
          // Border cinza claro → azul médio no focus (Manual da Marca)
          "border border-border bg-background px-3 py-2",
          "focus-visible:outline-none focus-visible:border-brand-blue-medium focus-visible:ring-2 focus-visible:ring-brand-blue-medium/20 focus-visible:ring-offset-0",
          // Transição suave
          "transition-colors duration-200",
          // Placeholder e estados
          "placeholder:text-muted-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // File input
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
