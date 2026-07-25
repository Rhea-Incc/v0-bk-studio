import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { PageShell } from "@/components/bk/shared";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — BK Studio" },
      { name: "description", content: "Sign in to your BK Studio client console." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") navigate({ to: "/dashboard", replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: {
            emailRedirectTo: window.location.origin + "/dashboard",
            data: { full_name: name, company },
          },
        });
        if (error) throw error;
        toast.success("Account created. Check your email if confirmation is required.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/dashboard" });
      if (result.error) throw result.error;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <section className="max-w-editorial container-x pt-40 pb-24 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-5">
          <div className="divider-num">Client console</div>
          <h1 className="font-serif text-5xl md:text-6xl text-cocoa mt-4">{mode === "signin" ? "Welcome back." : "Create your account."}</h1>
          <p className="text-espresso mt-6 max-w-[46ch]">Your private growth console. Metrics, playbooks, and monthly reviews — all in one quiet place.</p>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <div className="border hairline rounded-lg p-6 md:p-8 bg-[var(--linen-2)]">
            <form onSubmit={submit} className="space-y-4">
              {mode === "signup" && (
                <>
                  <Field label="Full name" value={name} onChange={setName} required />
                  <Field label="Company" value={company} onChange={setCompany} />
                </>
              )}
              <Field label="Email" type="email" value={email} onChange={setEmail} required />
              <Field label="Password" type="password" value={password} onChange={setPassword} required minLength={8} />
              <button disabled={busy} className="btn btn-primary w-full justify-center">
                {busy ? "…" : mode === "signin" ? "Sign in" : "Create account"} <span aria-hidden>→</span>
              </button>
            </form>
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-[var(--hairline)]" />
              <span className="divider-num">or</span>
              <div className="flex-1 h-px bg-[var(--hairline)]" />
            </div>
            <button onClick={google} disabled={busy} className="btn btn-ghost w-full justify-center">
              Continue with Google
            </button>
            <p className="mt-6 text-[13px] text-espresso text-center">
              {mode === "signin" ? "New here? " : "Have an account? "}
              <button className="underline" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
                {mode === "signin" ? "Create an account" : "Sign in"}
              </button>
            </p>
            <p className="mt-3 text-[12px] text-espresso/70 text-center">
              <Link to="/">← Back to site</Link>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Field({ label, value, onChange, type = "text", ...rest }: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type">) {
  return (
    <label className="block">
      <span className="block text-[11px] font-mono uppercase tracking-widest text-espresso mb-1.5">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
        className="w-full border hairline rounded-md bg-[var(--linen)] px-3 py-2.5 text-cocoa focus:outline-none focus:border-[var(--cocoa)]"
      />
    </label>
  );
}
