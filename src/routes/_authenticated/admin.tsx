import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell, Eyebrow } from "@/components/bk/shared";
import { toast } from "sonner";
import { industries } from "@/lib/industries";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — BK Studio" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

type Tab = "submissions" | "users" | "content" | "metrics";

function Admin() {
  const { user } = Route.useRouteContext();
  const [tab, setTab] = useState<Tab>("submissions");

  const isAdmin = useQuery({
    queryKey: ["is_admin", user.id],
    queryFn: async () => {
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      return (data ?? []).some((r) => r.role === "admin");
    },
  });

  if (isAdmin.isLoading) return <PageShell><div className="max-w-editorial container-x pt-40">Loading…</div></PageShell>;

  if (!isAdmin.data) {
    return (
      <PageShell>
        <div className="max-w-editorial container-x pt-40 pb-24">
          <div className="divider-num">Restricted</div>
          <h1 className="font-serif text-5xl text-cocoa mt-4">Admin access required.</h1>
          <p className="text-espresso mt-4 max-w-[52ch]">Your account doesn't have admin privileges. An existing admin can grant you the role, or you can promote yourself if you're the first user.</p>
          <FirstAdminBootstrap userId={user.id} onDone={() => isAdmin.refetch()} />
          <Link to="/dashboard" className="btn btn-ghost mt-8 inline-flex">Back to dashboard</Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="max-w-editorial container-x pt-32 md:pt-40 pb-6">
        <Eyebrow num="Admin">Studio operations</Eyebrow>
        <div className="flex items-end justify-between flex-wrap gap-4 mt-4">
          <h1 className="font-serif text-5xl md:text-6xl text-cocoa">Studio console.</h1>
          <Link to="/dashboard" className="btn btn-ghost">Client view</Link>
        </div>
        <div className="mt-8 flex gap-1 flex-wrap border-b hairline">
          {(["submissions", "users", "content", "metrics"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 font-mono text-[11px] uppercase tracking-widest border-b-2 -mb-px ${tab === t ? "border-cocoa text-cocoa" : "border-transparent text-espresso hover:text-cocoa"}`}>
              {t}
            </button>
          ))}
        </div>
      </section>
      <section className="max-w-editorial container-x pb-24">
        {tab === "submissions" && <SubmissionsTab />}
        {tab === "users" && <UsersTab />}
        {tab === "content" && <ContentTab userId={user.id} />}
        {tab === "metrics" && <MetricsTab />}
      </section>
    </PageShell>
  );
}

function FirstAdminBootstrap({ userId, onDone }: { userId: string; onDone: () => void }) {
  const [busy, setBusy] = useState(false);
  async function bootstrap() {
    setBusy(true);
    const { count } = await supabase.from("user_roles").select("*", { count: "exact", head: true }).eq("role", "admin");
    if ((count ?? 0) > 0) {
      toast.error("An admin already exists. Ask them to grant you access.");
      setBusy(false); return;
    }
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" });
    if (error) { toast.error(error.message); setBusy(false); return; }
    toast.success("You're now the admin.");
    onDone();
  }
  return (
    <button onClick={bootstrap} disabled={busy} className="btn btn-primary mt-6">
      {busy ? "…" : "Promote me (only works if no admin exists yet)"}
    </button>
  );
}

/* ---------- Submissions ---------- */
function SubmissionsTab() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["submissions"],
    queryFn: async () => (await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false })).data ?? [],
  });
  async function setStatus(id: string, status: string) {
    await supabase.from("contact_submissions").update({ status }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["submissions"] });
  }
  async function del(id: string) {
    if (!confirm("Delete this submission?")) return;
    await supabase.from("contact_submissions").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["submissions"] });
  }
  return (
    <div className="pt-8 space-y-3">
      {(q.data ?? []).length === 0 && <p className="text-espresso">No submissions yet.</p>}
      {(q.data ?? []).map((s) => (
        <div key={s.id} className="border hairline rounded-lg p-5 bg-[var(--linen-2)]">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <div className="font-serif text-2xl text-cocoa">{s.name} <span className="text-espresso text-[13px] font-sans">· {s.email}</span></div>
              <div className="font-mono text-[11px] text-espresso mt-1">
                {new Date(s.created_at).toLocaleString()} · {s.industry ?? "no industry"} · {s.company ?? "—"}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <select value={s.status} onChange={(e) => setStatus(s.id, e.target.value)}
                className="border hairline rounded-md bg-[var(--linen)] px-2 py-1.5 text-[12px]">
                {["new", "contacted", "qualified", "closed"].map((v) => <option key={v}>{v}</option>)}
              </select>
              <button onClick={() => del(s.id)} className="text-[12px] text-espresso hover:text-cocoa underline">Delete</button>
            </div>
          </div>
          <p className="mt-3 text-espresso leading-relaxed whitespace-pre-wrap">{s.message}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- Users ---------- */
function UsersTab() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["users_admin"],
    queryFn: async () => {
      const [{ data: profs }, { data: roles }] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("user_roles").select("*"),
      ]);
      const rmap = new Map<string, string[]>();
      (roles ?? []).forEach((r) => rmap.set(r.user_id, [...(rmap.get(r.user_id) ?? []), r.role]));
      return (profs ?? []).map((p) => ({ ...p, roles: rmap.get(p.id) ?? [] }));
    },
  });
  async function toggleAdmin(id: string, has: boolean) {
    if (has) await supabase.from("user_roles").delete().eq("user_id", id).eq("role", "admin");
    else await supabase.from("user_roles").insert({ user_id: id, role: "admin" });
    qc.invalidateQueries({ queryKey: ["users_admin"] });
  }
  async function setIndustry(id: string, industry: string) {
    await supabase.from("profiles").update({ industry }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["users_admin"] });
  }
  return (
    <div className="pt-8">
      <div className="border hairline rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2 border-b hairline bg-[var(--linen-2)] font-mono text-[10px] uppercase tracking-widest text-espresso">
          <div className="col-span-4">User</div><div className="col-span-3">Company</div><div className="col-span-3">Industry</div><div className="col-span-2 text-right">Role</div>
        </div>
        {(q.data ?? []).map((u) => {
          const isAdm = u.roles.includes("admin");
          return (
            <div key={u.id} className="grid grid-cols-12 px-4 py-3 items-center border-b hairline text-[13px]">
              <div className="col-span-4">
                <div className="text-cocoa">{u.full_name ?? "—"}</div>
                <div className="text-espresso text-[11px]">{u.email}</div>
              </div>
              <div className="col-span-3 text-espresso">{u.company ?? "—"}</div>
              <div className="col-span-3">
                <select value={u.industry ?? ""} onChange={(e) => setIndustry(u.id, e.target.value)}
                  className="border hairline rounded-md bg-[var(--linen)] px-2 py-1 text-[12px]">
                  <option value="">—</option>
                  {industries.map((i) => <option key={i.slug} value={i.slug}>{i.name}</option>)}
                </select>
              </div>
              <div className="col-span-2 text-right">
                <button onClick={() => toggleAdmin(u.id, isAdm)}
                  className={`text-[11px] font-mono uppercase tracking-widest px-2 py-1 rounded ${isAdm ? "bg-cocoa text-linen" : "border hairline text-espresso"}`}>
                  {isAdm ? "admin" : "client"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Content CMS ---------- */
const PAGES = [
  { slug: "home_hero", label: "Home — Hero", fields: ["title", "subtitle", "cta"] },
  { slug: "home_intro", label: "Home — Intro", fields: ["title", "body"] },
  { slug: "contact_intro", label: "Contact — Intro", fields: ["title", "body"] },
];

function ContentTab({ userId }: { userId: string }) {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["page_content"],
    queryFn: async () => (await supabase.from("page_content").select("*")).data ?? [],
  });
  const [drafts, setDrafts] = useState<Record<string, Record<string, string>>>({});
  function set(slug: string, key: string, value: string) {
    setDrafts((d) => ({ ...d, [slug]: { ...(d[slug] ?? {}), [key]: value } }));
  }
  async function save(slug: string) {
    const existing = (q.data ?? []).find((p) => p.slug === slug);
    const merged = { ...((existing?.content as Record<string, string>) ?? {}), ...(drafts[slug] ?? {}) };
    const { error } = await supabase.from("page_content").upsert({ slug, content: merged, updated_by: userId });
    if (error) return toast.error(error.message);
    toast.success("Saved");
    qc.invalidateQueries({ queryKey: ["page_content"] });
  }
  return (
    <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {PAGES.map((p) => {
        const row = (q.data ?? []).find((r) => r.slug === p.slug);
        const current = (row?.content as Record<string, string>) ?? {};
        return (
          <div key={p.slug} className="border hairline rounded-lg p-5 bg-[var(--linen-2)]">
            <div className="divider-num">{p.slug}</div>
            <div className="font-serif text-2xl text-cocoa mt-1">{p.label}</div>
            <div className="mt-4 space-y-3">
              {p.fields.map((f) => (
                <label key={f} className="block">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-espresso mb-1">{f}</span>
                  <textarea
                    defaultValue={current[f] ?? ""}
                    onChange={(e) => set(p.slug, f, e.target.value)}
                    rows={2}
                    className="w-full border hairline rounded-md bg-[var(--linen)] px-3 py-2 text-cocoa text-[13px] focus:outline-none focus:border-cocoa"
                  />
                </label>
              ))}
            </div>
            <button onClick={() => save(p.slug)} className="btn btn-primary mt-4 text-[12px] py-2">Save</button>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Client metrics ---------- */
function MetricsTab() {
  const qc = useQueryClient();
  const users = useQuery({
    queryKey: ["metrics_users"],
    queryFn: async () => (await supabase.from("profiles").select("id, email, full_name").order("created_at", { ascending: false })).data ?? [],
  });
  const [userId, setUserId] = useState<string>("");
  const list = useQuery({
    queryKey: ["metrics_of", userId],
    queryFn: async () => userId ? (await supabase.from("client_metrics").select("*").eq("user_id", userId).order("sort_order")).data ?? [] : [],
    enabled: !!userId,
  });
  const [draft, setDraft] = useState({ category: "Bookings", metric_name: "", metric_value: "" });

  async function add() {
    if (!userId || !draft.metric_name || !draft.metric_value) return;
    const { error } = await supabase.from("client_metrics").insert({ ...draft, user_id: userId });
    if (error) return toast.error(error.message);
    setDraft({ ...draft, metric_name: "", metric_value: "" });
    qc.invalidateQueries({ queryKey: ["metrics_of", userId] });
  }
  async function del(id: string) {
    await supabase.from("client_metrics").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["metrics_of", userId] });
  }

  return (
    <div className="pt-8">
      <label className="block max-w-md">
        <span className="text-[10px] font-mono uppercase tracking-widest text-espresso">Client</span>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}
          className="mt-1 w-full border hairline rounded-md bg-[var(--linen)] px-3 py-2">
          <option value="">Select a client…</option>
          {(users.data ?? []).map((u) => <option key={u.id} value={u.id}>{u.full_name ?? u.email}</option>)}
        </select>
      </label>

      {userId && (
        <>
          <div className="mt-6 border hairline rounded-lg p-5 bg-[var(--linen-2)] grid grid-cols-1 md:grid-cols-4 gap-3">
            <input placeholder="Category" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className="border hairline rounded-md bg-[var(--linen)] px-3 py-2" />
            <input placeholder="Metric name" value={draft.metric_name} onChange={(e) => setDraft({ ...draft, metric_name: e.target.value })} className="border hairline rounded-md bg-[var(--linen)] px-3 py-2" />
            <input placeholder="Value" value={draft.metric_value} onChange={(e) => setDraft({ ...draft, metric_value: e.target.value })} className="border hairline rounded-md bg-[var(--linen)] px-3 py-2" />
            <button onClick={add} className="btn btn-primary justify-center">Add metric</button>
          </div>

          <div className="mt-6 border hairline rounded-lg overflow-hidden">
            {(list.data ?? []).map((m) => (
              <div key={m.id} className="grid grid-cols-12 px-4 py-3 border-b hairline items-center text-[13px]">
                <div className="col-span-3 font-mono text-[11px] uppercase tracking-widest text-espresso">{m.category}</div>
                <div className="col-span-4 text-cocoa">{m.metric_name}</div>
                <div className="col-span-4 font-serif text-xl text-cocoa">{m.metric_value}</div>
                <div className="col-span-1 text-right"><button onClick={() => del(m.id)} className="text-[12px] underline">del</button></div>
              </div>
            ))}
            {(list.data ?? []).length === 0 && <div className="p-6 text-espresso text-[13px]">No metrics yet for this client.</div>}
          </div>
        </>
      )}
    </div>
  );
}
