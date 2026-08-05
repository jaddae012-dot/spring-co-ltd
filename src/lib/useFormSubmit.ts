"use client";

import { useState, FormEvent } from "react";

const WEB3FORMS_KEY = "4983b554-24f9-4631-a432-55c2c2cba8fe";

interface UseFormSubmitOptions {
  /** Subject line for the email */
  subject: string;
  /** Optional local API endpoint to submit form data to */
  apiEndpoint?: string;
  /** Whether to submit to Web3Forms */
  submitToWeb3Forms?: boolean;
  /** Callback after successful submission */
  onSuccess?: () => void;
}

function cloneFormData(source: FormData): FormData {
  const copy = new FormData();
  source.forEach((value, key) => copy.append(key, value));
  return copy;
}

function formDataToJson(formData: FormData): Record<string, string> {
  const json: Record<string, string> = {};

  formData.forEach((value, key) => {
    if (typeof value === "string") {
      json[key] = value;
      return;
    }

    json[key] = value.name;
  });

  return json;
}

export function useFormSubmit({
  subject,
  apiEndpoint,
  submitToWeb3Forms = true,
  onSuccess,
}: UseFormSubmitOptions) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [applicationRef, setApplicationRef] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setApplicationRef("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const submitActions: Promise<boolean>[] = [];
      let returnedApplicationRef = "";

      if (submitToWeb3Forms) {
        submitActions.push(
          (async () => {
            const web3FormData = cloneFormData(formData);
            web3FormData.append("access_key", WEB3FORMS_KEY);
            web3FormData.append("subject", subject);
            web3FormData.append("from_name", "SPRING.CO.LTD Website");

            const res = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              body: web3FormData,
            });

            const data = await res.json();
            return Boolean(data.success);
          })()
        );
      }

      if (apiEndpoint) {
        submitActions.push(
          (async () => {
            const res = await fetch(apiEndpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formDataToJson(formData)),
            });

            if (res.ok) {
              const data = await res.json();
              if (data?.applicationRef) {
                returnedApplicationRef = String(data.applicationRef);
              }
            }

            return res.ok;
          })()
        );
      }

      const results = await Promise.allSettled(submitActions);
      const successCount = results.reduce((count, result) => {
        if (result.status === "fulfilled" && result.value) {
          return count + 1;
        }

        return count;
      }, 0);
      const totalChannels = results.length;

      if (successCount > 0) {
        setStatus("success");
        setMessage(
          successCount === totalChannels
            ? "Submitted successfully! We'll get back to you soon."
            : "Submitted successfully, but one delivery channel had an issue."
        );
        if (returnedApplicationRef) {
          setApplicationRef(returnedApplicationRef);
        }
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

  return { status, message, applicationRef, handleSubmit };
}
