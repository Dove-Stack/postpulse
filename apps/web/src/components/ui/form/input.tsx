import { cn } from "@/lib/utils";
import React from "react";


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-lg border-2 bg-white px-4 py-3 text-sm transition-colors",
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-gray-400',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-200',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
            ? 'border-red-300 focus-visible:border-red-500'
            : 'border-gray-200 focus-visible:border-violet-500',
            className
          )} ref={ref}
          {...props}
        />
        {error && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <span className="text-red-500">Error</span>
                {error}
            </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'

export {
    Input
}
