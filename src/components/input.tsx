import { forwardRef, useId, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FieldWrapProps {
  label?: string;
  helper?: string;
  error?: string;
  id: string;
  children: ReactNode;
  className?: string;
}

function FieldWrap({ label, helper, error, id, children, className }: FieldWrapProps) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text">
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-danger">{error}</p>
      ) : helper ? (
        <p className="mt-1.5 text-xs text-text-muted">{helper}</p>
      ) : null}
    </div>
  );
}

const fieldBase =
  "w-full rounded border bg-surface text-sm text-text placeholder:text-text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent disabled:opacity-50 disabled:cursor-not-allowed";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  wrapClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helper, error, wrapClassName, id, className, ...rest },
  ref,
) {
  const uid = useId();
  const fid = id ?? uid;
  return (
    <FieldWrap id={fid} label={label} helper={helper} error={error} className={wrapClassName}>
      <input
        id={fid}
        ref={ref}
        className={cn(
          fieldBase,
          "h-11 px-3",
          error ? "border-danger" : "border-border",
          className,
        )}
        {...rest}
      />
    </FieldWrap>
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helper?: string;
  error?: string;
  wrapClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, helper, error, wrapClassName, id, className, ...rest },
  ref,
) {
  const uid = useId();
  const fid = id ?? uid;
  return (
    <FieldWrap id={fid} label={label} helper={helper} error={error} className={wrapClassName}>
      <textarea
        id={fid}
        ref={ref}
        rows={4}
        className={cn(
          fieldBase,
          "py-2.5 px-3 leading-relaxed resize-y min-h-[6rem]",
          error ? "border-danger" : "border-border",
          className,
        )}
        {...rest}
      />
    </FieldWrap>
  );
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helper?: string;
  error?: string;
  wrapClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, helper, error, wrapClassName, id, className, children, ...rest },
  ref,
) {
  const uid = useId();
  const fid = id ?? uid;
  return (
    <FieldWrap id={fid} label={label} helper={helper} error={error} className={wrapClassName}>
      <div className="relative">
        <select
          id={fid}
          ref={ref}
          className={cn(
            fieldBase,
            "h-11 pl-3 pr-9 appearance-none",
            error ? "border-danger" : "border-border",
            className,
          )}
          {...rest}
        >
          {children}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
      </div>
    </FieldWrap>
  );
});

export default Input;
