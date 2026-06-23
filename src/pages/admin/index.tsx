import Head from "next/head";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Globe, MessageSquare, Plus, TrendingUp } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import adminApi from "@/common/api/adminApi";
import { IPortfolio } from "@/common/interfaces/portfolios.interface";
import { IMessage } from "@/common/interfaces/message.interface";
import { Badge } from "@/components/ui/Badge";

const AdminDashboard: FC = () => {
  const [stats, setStats] = useState({
    portfolios: 0,
    activePortfolios: 0,
    messages: 0,
    recentPortfolios: [] as IPortfolio[],
    recentMessages: [] as IMessage[],
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const [portfoliosRes, messagesRes] = await Promise.all([
          adminApi.get("/admins/portfolios"),
          adminApi.get("/admins/messages"),
        ]);
        const portfolios: IPortfolio[] = portfoliosRes.data.portfolios;
        const messages: IMessage[] = messagesRes.data.messages;
        setStats({
          portfolios: portfoliosRes.data.totalItems,
          activePortfolios: portfolios.filter((p) => !p.deleted).length,
          messages: messagesRes.data.totalItems,
          recentPortfolios: portfolios.slice(0, 5),
          recentMessages: messages.slice(0, 5),
        });
      } catch {
        // handled by interceptor
      }
    }
    loadStats();
  }, []);

  const statCards = [
    {
      label: "Total Portfolios",
      value: stats.portfolios,
      icon: Briefcase,
      color: "text-violet-400",
    },
    {
      label: "Active Projects",
      value: stats.activePortfolios,
      icon: TrendingUp,
      color: "text-emerald-400",
    },
    {
      label: "Messages",
      value: stats.messages,
      icon: MessageSquare,
      color: "text-cyan-400",
    },
  ];

  return (
    <AdminLayout>
      <Head>
        <title>Dashboard | Admin</title>
      </Head>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-500 mt-1">Overview of your portfolio site</p>
          </div>
          <Link href="/admin/site-content">
            <Button variant="secondary">
              <Globe className="w-4 h-4" />
              Edit Site Content
            </Button>
          </Link>
          <Link href="/admin/portfolios/new">
            <Button>
              <Plus className="w-4 h-4" />
              New Portfolio
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} hover>
                <CardContent className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/[0.05]">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Recent Portfolios</h2>
                <Link href="/admin/portfolios" className="text-sm text-violet-400 hover:text-violet-300">
                  View all
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.recentPortfolios.length === 0 ? (
                <p className="text-gray-500 text-sm">No portfolios yet</p>
              ) : (
                stats.recentPortfolios.map((p) => (
                  <Link
                    key={p._id}
                    href={`/admin/portfolios/${p.slug}/edit`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="text-white font-medium">{p.title}</span>
                    <Badge variant={p.deleted ? "danger" : "success"}>
                      {p.deleted ? "Deleted" : "Active"}
                    </Badge>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Recent Messages</h2>
                <Link href="/admin/messages" className="text-sm text-violet-400 hover:text-violet-300">
                  View all
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.recentMessages.length === 0 ? (
                <p className="text-gray-500 text-sm">No messages yet</p>
              ) : (
                stats.recentMessages.map((m) => (
                  <div key={m._id} className="p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-gray-300 text-sm line-clamp-2">{m.message}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {new Date(m.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
