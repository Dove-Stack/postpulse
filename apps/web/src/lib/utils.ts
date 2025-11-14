import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// cn : it means ClassName , i can't use classname, because it is defined in typescript, tailwind 