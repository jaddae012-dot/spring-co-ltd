"use client";

import { useState, FormEvent } from "react";

const WEB3FORMS_KEY = "4983b554-24f9-4631-a432-55c2c2cba8fe";

interface UseFormSubmitOptions {
  /** Subject line for the email */
  subject: string;
  /** Callback after successful submission */
  onSuccess?: () => void;
}

export function useFormSubmit({ subject, onSuccess }: UseFormSubmitOptions) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", subject);
    formData.append("from_name", "SPRING.CO.LTD Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage("Submitted successfully! We'll get back to you soon.");
        form.reset();
        onSuccess?.();
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  return { status, message, handleSubmit };
}
