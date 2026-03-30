"use client";

import { useFormSubmit } from "@/lib/useFormSubmit";
import FormStatus from "@/components/FormStatus";

interface FormWrapperProps {
  subject: string;
  children: React.ReactNode;
  buttonText: string;
  buttonClass: string;
  apiEndpoint?: string;
  submitToWeb3Forms?: boolean;
}

export default function FormWrapper({
  subject,
  children,
  buttonText,
  buttonClass,
  apiEndpoint,
  submitToWeb3Forms,
}: FormWrapperProps) {
  const { status, message, handleSubmit } = useFormSubmit({
    subject,
    apiEndpoint,
    submitToWeb3Forms,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {children}
      <FormStatus status={status} message={message} />
      <button
        type="submit"
        disabled={status === "loading"}
        className={`${buttonClass} ${status === "loading" ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {status === "loading" ? "Sending..." : buttonText}
      </button>
    </form>
  );
}
