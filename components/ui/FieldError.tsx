import { AlertCircle } from 'lucide-react';

interface FieldErrorProps {
  message?: string;
}

export default function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p className="flex items-start gap-1.5 text-[#ff453a] text-xs mt-1.5" role="alert">
      <AlertCircle size={13} className="shrink-0 mt-0.5" aria-hidden />
      <span>{message}</span>
    </p>
  );
}

interface FormErrorAlertProps {
  message?: string;
}

export function FormErrorAlert({ message }: FormErrorAlertProps) {
  if (!message) return null;
  return (
    <div
      className="flex items-start gap-2 text-sm text-[#ff453a] bg-red-500/10 border border-red-500/40 rounded-xl px-4 py-3"
      role="alert"
    >
      <AlertCircle size={16} className="shrink-0 mt-0.5" aria-hidden />
      <span>{message}</span>
    </div>
  );
}

export function inputErrorClass(hasError: boolean): string {
  return hasError ? 'border-[#ff453a]/70 focus:border-[#ff453a] ring-1 ring-[#ff453a]/30' : '';
}

export function labelErrorClass(hasError: boolean): string {
  return hasError ? 'text-[#ff453a]' : '';
}
