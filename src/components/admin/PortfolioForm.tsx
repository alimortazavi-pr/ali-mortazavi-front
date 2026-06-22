import { FC, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import adminApi from "@/common/api/adminApi";
import { IPortfolio } from "@/common/interfaces/portfolios.interface";
import { assetUrl } from "@/common/utils/image";
import Image from "next/image";

interface PortfolioFormProps {
  slug?: string;
}

const PortfolioForm: FC<PortfolioFormProps> = ({ slug }) => {
  const router = useRouter();
  const isEdit = Boolean(slug);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    link: "",
    features: "",
    skills: "",
    startDate: "",
    endDate: "",
  });
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  useEffect(() => {
    if (!slug) return;
    async function loadPortfolio() {
      try {
        const { data } = await adminApi.get(`/admins/portfolios/${slug}`);
        const p: IPortfolio = data.portfolio;
        setForm({
          title: p.title,
          slug: p.slug,
          description: p.description,
          link: p.link,
          features: p.features?.join("\n") || "",
          skills: p.skills?.join(", ") || "",
          startDate: p.startDate || "",
          endDate: p.endDate || "",
        });
        setExistingImages(p.images || []);
      } catch {
        toast.error("Portfolio not found");
        router.push("/admin/portfolios");
      }
    }
    loadPortfolio();
  }, [slug, router]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  }

  function removeExistingImage(index: number) {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("slug", form.slug);
    formData.append("description", form.description);
    formData.append("link", form.link);
    form.features.split("\n").filter(Boolean).forEach((f) => formData.append("features", f));
    form.skills.split(",").map((s) => s.trim()).filter(Boolean).forEach((s) => formData.append("skills", s));
    if (form.startDate) formData.append("startDate", form.startDate);
    if (form.endDate) formData.append("endDate", form.endDate);

    if (isEdit) {
      existingImages.forEach((img) => formData.append("images", img));
    }
    newImages.forEach((file) => formData.append("images", file));

    try {
      if (isEdit) {
        await adminApi.put(`/admins/portfolios/${slug}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Portfolio updated");
      } else {
        await adminApi.post("/admins/portfolios", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Portfolio created");
      }
      router.push("/admin/portfolios");
    } catch {
      toast.error("Failed to save portfolio");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
        <Input label="Slug" name="slug" value={form.slug} onChange={handleChange} required placeholder="my-project" />
      </div>
      <Textarea label="Description" name="description" value={form.description} onChange={handleChange} required rows={5} />
      <Input label="Website Link" name="link" value={form.link} onChange={handleChange} required placeholder="https://..." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Textarea label="Features (one per line)" name="features" value={form.features} onChange={handleChange} rows={5} />
        <Input label="Skills (comma separated)" name="skills" value={form.skills} onChange={handleChange} placeholder="React, TypeScript, Node.js" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Start Date" name="startDate" value={form.startDate} onChange={handleChange} placeholder="2024-01" />
        <Input label="End Date" name="endDate" value={form.endDate} onChange={handleChange} placeholder="2024-06" />
      </div>

      <Card>
        <CardContent>
          <label className="block text-sm font-medium text-gray-400 mb-3">Images (max 6)</label>
          {existingImages.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {existingImages.map((img, i) => (
                <div key={img} className="relative w-24 h-24 rounded-lg overflow-hidden group">
                  <Image src={assetUrl(img)} alt="" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(i)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 text-sm transition-opacity"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-violet-500/20 file:text-violet-300 hover:file:bg-violet-500/30"
          />
          {newImages.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">{newImages.length} new image(s) selected</p>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" isLoading={loading}>
          {isEdit ? "Update Portfolio" : "Create Portfolio"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PortfolioForm;
