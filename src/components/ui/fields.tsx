"use client";

import { forwardRef } from "react";

export function Field({
  label,
  hint,
  error,
  optional,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="flex items-baseline justify-between gap-3 text-[0.95rem] font-medium tracking-[-0.01em]"
      >
        <span>{label}</span>
        {optional ? (
          <span className="text-xs font-normal text-ink-muted">Optional</span>
        ) : null}
      </label>
      {hint ? <p className="-mt-1 text-sm text-ink-muted">{hint}</p> : null}
      {children}
      {error ? (
        <p role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-line-strong bg-paper px-4 py-3.5 text-base text-ink placeholder:text-ink-muted/70 transition-colors focus:border-ink focus:outline-none aria-[invalid=true]:border-danger";

export const TextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { prefix?: string }
>(function TextInput({ className = "", prefix, ...props }, ref) {
  if (prefix) {
    return (
      <div className="flex items-center rounded-xl border border-line-strong bg-paper transition-colors focus-within:border-ink has-[input[aria-invalid=true]]:border-danger">
        <span className="pl-4 text-base text-ink-muted select-none">{prefix}</span>
        <input
          ref={ref}
          {...props}
          className={`w-full rounded-xl bg-transparent py-3.5 pr-4 pl-0.5 text-base text-ink placeholder:text-ink-muted/70 focus:outline-none ${className}`}
        />
      </div>
    );
  }

  return <input ref={ref} {...props} className={`${inputClass} ${className}`} />;
});

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextArea({ className = "", ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={4}
      {...props}
      className={`${inputClass} resize-y leading-relaxed ${className}`}
    />
  );
});

export function ChipGroup({
  options,
  value,
  onToggle,
  name,
}: {
  options: readonly string[];
  value: string[];
  /** Toggling by option (rather than replacing the array) keeps rapid taps safe. */
  onToggle: (option: string) => void;
  name: string;
}) {
  return (
    <div role="group" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = value.includes(option);
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onToggle(option)}
            className={`rounded-full border px-4 py-2.5 text-[0.95rem] transition-colors ${
              selected
                ? "border-ink bg-ink text-paper"
                : "border-line-strong bg-paper text-ink hover:border-ink"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function OptionList({
  options,
  value,
  onChange,
  name,
  layout = "list",
}: {
  options: readonly string[];
  value?: string;
  onChange: (next: string) => void;
  name: string;
  layout?: "list" | "inline";
}) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className={layout === "inline" ? "flex flex-wrap gap-2" : "flex flex-col gap-2"}
    >
      {options.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option)}
            className={
              layout === "inline"
                ? `rounded-full border px-4 py-2.5 text-[0.95rem] transition-colors ${
                    selected
                      ? "border-ink bg-ink text-paper"
                      : "border-line-strong bg-paper text-ink hover:border-ink"
                  }`
                : `flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[0.95rem] transition-colors ${
                    selected
                      ? "border-ink bg-paper"
                      : "border-line-strong bg-paper hover:border-ink"
                  }`
            }
          >
            {layout === "list" ? (
              <span
                aria-hidden
                className={`grid size-5 shrink-0 place-items-center rounded-full border ${
                  selected ? "border-accent-deep" : "border-line-strong"
                }`}
              >
                {selected ? <span className="size-2.5 rounded-full bg-accent-deep" /> : null}
              </span>
            ) : null}
            <span>{option}</span>
          </button>
        );
      })}
    </div>
  );
}

export function CheckboxField({
  checked,
  onChange,
  error,
  children,
  id,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  error?: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
          checked ? "border-ink bg-paper" : "border-line-strong bg-paper hover:border-ink"
        }`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="sr-only"
        />
        <span
          aria-hidden
          className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors ${
            checked ? "border-accent-deep bg-accent-deep" : "border-line-strong bg-paper"
          }`}
        >
          {checked ? (
            <svg viewBox="0 0 20 20" className="size-3.5 text-paper" aria-hidden>
              <path
                d="M4 10.5l4 4 8-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </span>
        <span className="text-[0.95rem] leading-relaxed">{children}</span>
      </label>
      {error ? (
        <p role="alert" className="text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
