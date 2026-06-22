import Head from "next/head";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Plus, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import adminApi from "@/common/api/adminApi";
import { IPortfolio } from "@/common/interfaces/portfolios.interface";
import { assetUrl } from "@/common/utils/image";

const AdminPortfoliosPage: FC = () => {
  const [portfolios, setPortfolios] = useState<IPortfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function loadPortfolios(p = page) {
    setLoading(true);
    try {
      const { data } = await adminApi.get(`/admins/portfolios?page=${p}`);
      setPortfolios(data.portfolios);
      setTotalPages(data.totalPages);
    } catch {
      toast.error("Failed to load portfolios");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPortfolios();
  }, [page]);

  async function handleDelete(slug: string) {
    if (!confirm("Are you sure you want to delete this portfolio?")) return;
    try {
      await adminApi.delete(`/admins/portfolios/${slug}/soft`);
      toast.success("Portfolio deleted");
      loadPortfolios();
    } catch {
      toast.error("Failed to delete");
    }
  }

  async function handleRecovery(slug: string) {
    try {
      await adminApi.put(`/admins/portfolios/${slug}/recovery`);
      toast.success("Portfolio recovered");
      loadPortfolios();
    } catch {
      toast.error("Failed to recover");
    }
  }

  return (
    <AdminLayout>
      <Head>
        <title>Portfolios | Admin</title>
      </Head>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Portfolios</h1>
            <p className="text-gray-500 mt-1">Manage your portfolio projects</p>
          </div>
          <Link href="/admin/portfolios/new">
            <Button>
              <Plus className="w-4 h-4" />
              New Portfolio
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
          </div>
        ) : portfolios.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <p className="text-gray-500 mb-4">No portfolios yet</p>
              <Link href="/admin/portfolios/new">
                <Button>Create your first portfolio</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {portfolios.map((portfolio) => (
              <Card key={portfolio._id} hover className="overflow-hidden">
                <div className="relative h-40 bg-white/[0.02]">
                  {portfolio.images?.[0] && (
                    <Image
                      src={assetUrl(portfolio.images[0])}
                      alt={portfolio.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge variant={portfolio.deleted ? "danger" : "success"}>
                      {portfolio.deleted ? "Deleted" : "Active"}
                    </Badge>
                  </div>
                </div>
                <CardContent>
                  <h3 className="text-white font-semibold text-lg">{portfolio.title}</h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{portfolio.description}</p>
                  <div className="flex gap-2 mt-4">
                    <Link href={`/admin/portfolios/${portfolio.slug}/edit`} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full">
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </Button>
                    </Link>
                    {portfolio.deleted ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRecovery(portfolio.slug)}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(portfolio.slug)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  p === page
                    ? "bg-violet-500/20 text-violet-300"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPortfoliosPage;
