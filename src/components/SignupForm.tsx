import { useState, type FormEvent } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined;

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) return;

    if (!SCRIPT_URL) {
      setSubmitState("error");
      return;
    }

    setSubmitState("loading");

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ email: trimmed }),
      });

      const result = (await response.json()) as { success?: boolean };
      if (result.success) {
        setSubmitState("success");
        setEmail("");
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <div className="mb-10">
      <div className="flex w-full flex-col gap-6 min-[480px]:flex-row min-[480px]:items-stretch">
        <a
          href="https://shop.kernelmag.io/products/kernel-magazine-issue-6"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 border border-black border-solid bg-white px-2 py-1.5 text-center text-[16px] leading-[28px] text-black transition-opacity hover:opacity-90"
        >
          Purchase issue ↗
        </a>
        <form
          className="flex min-w-0 flex-1 items-stretch"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (submitState !== "idle" && submitState !== "loading") {
                setSubmitState("idle");
              }
            }}
            placeholder="Sign up for updates"
            required
            disabled={submitState === "loading" || submitState === "success"}
            className="min-w-0 flex-1 border border-white border-solid bg-white px-1 py-1.5 text-[16px] leading-[28px] text-black placeholder:text-black/50 outline-none disabled:opacity-60"
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={submitState === "loading" || submitState === "success"}
            className="shrink-0 border-l-2 border-solid border-l-black bg-white px-2 py-1.5 text-[16px] leading-[28px] text-black transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitState === "loading" ? "..." : "→"}
          </button>
        </form>
       
      </div>

      {submitState === "success" && (
        <p className="mt-2 text-[14px] leading-[1.4] text-white/70" role="status">
          Thanks — you&apos;re on the list.
        </p>
      )}
      {submitState === "error" && (
        <p className="mt-2 text-[14px] leading-[1.4] text-red-400" role="alert">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
