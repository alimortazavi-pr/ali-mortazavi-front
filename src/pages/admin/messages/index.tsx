import Head from "next/head";
import { FC, useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/Card";
import adminApi from "@/common/api/adminApi";
import { IMessage } from "@/common/interfaces/message.interface";

const AdminMessagesPage: FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const { data } = await adminApi.get(`/admins/messages?page=${page}`);
        setMessages(data.messages);
        setTotalPages(data.totalPages);
      } catch {
        // handled by interceptor
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page]);

  return (
    <AdminLayout>
      <Head>
        <title>Messages | Admin</title>
      </Head>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Messages</h1>
          <p className="text-gray-500 mt-1">Contact form submissions from visitors</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <p className="text-gray-500">No messages yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <Card key={msg._id}>
                <CardContent>
                  <p className="text-gray-200 whitespace-pre-wrap">{msg.message}</p>
                  <p className="text-xs text-gray-600 mt-3">
                    {new Date(msg.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
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

export default AdminMessagesPage;
