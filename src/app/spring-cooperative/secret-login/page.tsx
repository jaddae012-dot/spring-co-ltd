import { Suspense } from "react";
import SecretLoginForm from "./secret-login-form";

export default function SecretLoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 pt-24 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Suspense
          fallback={
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl shadow-slate-950/50">
              <p className="text-center text-sm text-slate-400">Loading secret access form...</p>
            </div>
          }
        >
          <SecretLoginForm />
        </Suspense>
      </div>
    </div>
  );
}