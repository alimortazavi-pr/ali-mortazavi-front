import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Plus, Save, Trash2 } from "lucide-react";
import adminApi from "@/common/api/adminApi";
import { ISiteSettings } from "@/common/interfaces/site-settings.interface";
import { DEFAULT_SITE_SETTINGS } from "@/common/data/default-site-settings";
import { mergeSettings } from "@/lib/fetchSiteSettings";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const TABS = [
  "Profile & Contact",
  "Social Links",
  "Hero",
  "Stats",
  "Tech Stack",
  "Expertise",
  "Experience",
  "About & CTA",
  "Pages",
  "SEO & Footer",
] as const;

type Tab = (typeof TABS)[number];

const SiteContentEditor: FC = () => {
  const [tab, setTab] = useState<Tab>("Profile & Contact");
  const [form, setForm] = useState<ISiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi.get("/admins/site-settings").then(({ data }) => {
      setForm(mergeSettings(data.settings));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const { data } = await adminApi.put("/admins/site-settings", form);
      setForm(data.settings);
      toast.success("Site content saved!");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  function update<K extends keyof ISiteSettings>(key: K, value: ISiteSettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Content</h1>
          <p className="text-gray-500 text-sm mt-1">Manage everything visitors see on your website</p>
        </div>
        <Button onClick={handleSave} isLoading={saving}>
          <Save className="w-4 h-4" />
          Save All Changes
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors",
              tab === t ? "bg-violet-500/20 text-violet-300 border border-violet-500/30" : "text-gray-500 hover:text-white"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="space-y-4">
          {tab === "Profile & Contact" && (
            <>
              <Input label="Full Name" value={form.profile.name} onChange={(e) => update("profile", { ...form.profile, name: e.target.value })} />
              <Input label="Job Title" value={form.profile.title} onChange={(e) => update("profile", { ...form.profile, title: e.target.value })} />
              <Input label="Email" value={form.profile.email} onChange={(e) => update("profile", { ...form.profile, email: e.target.value })} />
              <Input label="Phone" value={form.profile.phone} onChange={(e) => update("profile", { ...form.profile, phone: e.target.value })} />
              <Textarea label="Bio" value={form.profile.bio} onChange={(e) => update("profile", { ...form.profile, bio: e.target.value })} rows={3} />
              <Input label="Resume Path" value={form.resumePath} onChange={(e) => update("resumePath", e.target.value)} placeholder="/my-resume/file.pdf" />
            </>
          )}

          {tab === "Social Links" && (
            <>
              {(["linkedin", "github", "telegram", "npm", "instagram"] as const).map((key) => (
                <Input
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={form.social[key]}
                  onChange={(e) => update("social", { ...form.social, [key]: e.target.value })}
                />
              ))}
            </>
          )}

          {tab === "Hero" && (
            <>
              <Input label="Badge Text" value={form.hero.badgeText} onChange={(e) => update("hero", { ...form.hero, badgeText: e.target.value })} />
              <Input label="Line 1" value={form.hero.line1} onChange={(e) => update("hero", { ...form.hero, line1: e.target.value })} />
              <Input label="Highlight" value={form.hero.highlight} onChange={(e) => update("hero", { ...form.hero, highlight: e.target.value })} />
              <Input label="Line 2 Prefix" value={form.hero.line2Prefix} onChange={(e) => update("hero", { ...form.hero, line2Prefix: e.target.value })} />
              <Textarea
                label="Rotating Words (one per line)"
                value={form.hero.rotatingWords.join("\n")}
                onChange={(e) => update("hero", { ...form.hero, rotatingWords: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
                rows={4}
              />
              <Textarea label="Description" value={form.hero.description} onChange={(e) => update("hero", { ...form.hero, description: e.target.value })} rows={3} />
            </>
          )}

          {tab === "Stats" && (
            <div className="space-y-4">
              {form.stats.map((stat, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <Input label="Value" value={stat.value} onChange={(e) => { const s = [...form.stats]; s[i] = { ...s[i], value: e.target.value }; update("stats", s); }} />
                  <Input label="Label" value={stat.label} onChange={(e) => { const s = [...form.stats]; s[i] = { ...s[i], label: e.target.value }; update("stats", s); }} />
                  <div className="flex items-end gap-2">
                    <Input label="Accent" value={stat.accent} onChange={(e) => { const s = [...form.stats]; s[i] = { ...s[i], accent: e.target.value }; update("stats", s); }} />
                    <button onClick={() => update("stats", form.stats.filter((_, j) => j !== i))} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg mb-0.5"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              <Button variant="secondary" size="sm" onClick={() => update("stats", [...form.stats, { value: "", label: "", accent: "violet" }])}>
                <Plus className="w-4 h-4" /> Add Stat
              </Button>
            </div>
          )}

          {tab === "Tech Stack" && (
            <Textarea
              label="Technologies (one per line)"
              value={form.techStack.join("\n")}
              onChange={(e) => update("techStack", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
              rows={10}
            />
          )}

          {tab === "Expertise" && (
            <div className="space-y-4">
              {form.expertise.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <Input label="Title" value={item.title} onChange={(e) => { const a = [...form.expertise]; a[i] = { ...a[i], title: e.target.value }; update("expertise", a); }} />
                  <Textarea label="Description" value={item.description} onChange={(e) => { const a = [...form.expertise]; a[i] = { ...a[i], description: e.target.value }; update("expertise", a); }} rows={2} />
                  <div className="flex gap-2">
                    <Input label="Icon (code|zap|palette|layers)" value={item.icon} onChange={(e) => { const a = [...form.expertise]; a[i] = { ...a[i], icon: e.target.value }; update("expertise", a); }} />
                    <button onClick={() => update("expertise", form.expertise.filter((_, j) => j !== i))} className="self-end p-2 text-red-400"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              <Button variant="secondary" size="sm" onClick={() => update("expertise", [...form.expertise, { title: "", description: "", icon: "code" }])}>
                <Plus className="w-4 h-4" /> Add Expertise
              </Button>
            </div>
          )}

          {tab === "Experience" && (
            <div className="space-y-4">
              {form.experience.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Year" value={item.year} onChange={(e) => { const a = [...form.experience]; a[i] = { ...a[i], year: e.target.value }; update("experience", a); }} />
                    <Input label="Role" value={item.role} onChange={(e) => { const a = [...form.experience]; a[i] = { ...a[i], role: e.target.value }; update("experience", a); }} />
                  </div>
                  <Input label="Title" value={item.title} onChange={(e) => { const a = [...form.experience]; a[i] = { ...a[i], title: e.target.value }; update("experience", a); }} />
                  <Textarea label="Description" value={item.description} onChange={(e) => { const a = [...form.experience]; a[i] = { ...a[i], description: e.target.value }; update("experience", a); }} rows={2} />
                  <button onClick={() => update("experience", form.experience.filter((_, j) => j !== i))} className="text-red-400 text-sm flex items-center gap-1"><Trash2 className="w-3 h-3" /> Remove</button>
                </div>
              ))}
              <Button variant="secondary" size="sm" onClick={() => update("experience", [...form.experience, { year: "", title: "", role: "", description: "" }])}>
                <Plus className="w-4 h-4" /> Add Experience
              </Button>
            </div>
          )}

          {tab === "About & CTA" && (
            <>
              <Textarea
                label="About Paragraphs (separate paragraphs with a blank line)"
                value={form.aboutParagraphs.join("\n\n")}
                onChange={(e) => update("aboutParagraphs", e.target.value.split("\n\n").map((s) => s.trim()).filter(Boolean))}
                rows={6}
              />
              <Input label="CTA Title" value={form.cta.title} onChange={(e) => update("cta", { ...form.cta, title: e.target.value })} />
              <Input label="CTA Highlight" value={form.cta.highlight} onChange={(e) => update("cta", { ...form.cta, highlight: e.target.value })} />
              <Textarea label="CTA Description" value={form.cta.description} onChange={(e) => update("cta", { ...form.cta, description: e.target.value })} rows={3} />
            </>
          )}

          {tab === "Pages" && (
            <>
              {(["about", "contact", "portfolios"] as const).map((key) => (
                <div key={key} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <p className="text-sm font-semibold text-violet-300 capitalize">{key} Page</p>
                  <Input label="Label" value={form.pages[key].label} onChange={(e) => update("pages", { ...form.pages, [key]: { ...form.pages[key], label: e.target.value } })} />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Title" value={form.pages[key].title} onChange={(e) => update("pages", { ...form.pages, [key]: { ...form.pages[key], title: e.target.value } })} />
                    <Input label="Highlight" value={form.pages[key].highlight} onChange={(e) => update("pages", { ...form.pages, [key]: { ...form.pages[key], highlight: e.target.value } })} />
                  </div>
                  <Textarea label="Description" value={form.pages[key].description} onChange={(e) => update("pages", { ...form.pages, [key]: { ...form.pages[key], description: e.target.value } })} rows={2} />
                </div>
              ))}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <p className="text-sm font-semibold text-violet-300">Contact Modal</p>
                <Input label="Title" value={form.contactModal.title} onChange={(e) => update("contactModal", { ...form.contactModal, title: e.target.value })} />
                <Input label="Subtitle" value={form.contactModal.subtitle} onChange={(e) => update("contactModal", { ...form.contactModal, subtitle: e.target.value })} />
              </div>
            </>
          )}

          {tab === "SEO & Footer" && (
            <>
              <Textarea label="Default SEO Description" value={form.seo.defaultDescription} onChange={(e) => update("seo", { ...form.seo, defaultDescription: e.target.value })} rows={3} />
              <Input label="Site URL" value={form.seo.siteUrl} onChange={(e) => update("seo", { ...form.seo, siteUrl: e.target.value })} />
              <Textarea label="Footer Tagline" value={form.footerTagline} onChange={(e) => update("footerTagline", e.target.value)} rows={2} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteContentEditor;
