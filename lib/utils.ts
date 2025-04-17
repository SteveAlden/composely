import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCode = (code: string = ''): string => {
  return code
    .replace(/^.*\.tsx.*$/gm, '')
    .replace(/export\s+default\s+\w+;/g, (match) => match.replace(';', ''))
    .split('\n')
    .filter((line) => !line.includes('```'))
    .join('\n')
    .trim();
};
