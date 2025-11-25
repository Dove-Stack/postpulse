import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground ",
        link: "text-primary underline-offset-4 hover:underline",
        ctaBtnOne: "bg-violet-600 text-white hover:bg-violet-700",
        ctaBtnTwo: "border-solid border-violet-300 text-violet-700 hover:bg-violet-100",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-xl px-8 py-6 font-mono font-bold border-solid border-purple-400 text-violet-500",
        icon: "h-9 w-9",
        btnNav: "px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };


// import * as React from "react";
// import { cva, type VariantProps } from "class-variance-authority";
// import { cn } from "@/lib/utils";

// const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 transition-all duration-200", // Added transition-all for smoother hover effects
//   {
//     variants: {
//       variant: {
//         default:
//           "bg-primary text-primary-foreground shadow hover:bg-primary/90",
//         destructive:
//           "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
//         outline:
//           "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
//         secondary:
//           "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground ",
//         link: "text-primary underline-offset-4 hover:underline",
//         // 🚀 MODIFIED PRIMARY CTA BUTTON (Start Free Trial)
//         ctaBtnOne:
//           "bg-violet-600 text-white hover:bg-violet-700 shadow-xl shadow-violet-500/50 transform hover:scale-[1.02] active:scale-[0.98]",
//         // 🚀 MODIFIED SECONDARY CTA BUTTON (Sign In)
//         ctaBtnTwo:
//           "border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transform hover:scale-[1.02] active:scale-[0.98]",
//       },
//       size: {
//         default: "h-9 px-4 py-2",
//         sm: "h-8 rounded-md px-3 text-xs",
//         // 🚀 MODIFIED LG SIZE (Cleaned up and standardized)
//         lg: "h-11 rounded-lg px-6 text-base font-semibold",
//         // 🚀 NEW XL SIZE (Used for Hero section buttons)
//         xl: "h-14 rounded-xl px-10 text-lg font-bold",
//         icon: "h-9 w-9",
//         btnNav: "px-6 py-3",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// );

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {}

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, size, ...props }, ref) => {
//     return (
//       <button
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );
// Button.displayName = "Button";

// export { Button, buttonVariants };