import { FC, ReactNode, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Briefcase,
  Globe,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth, logoutAdmin } from "@/store/auth/actions";
import { hydrateAuth } from "@/store/auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/site-content", label: "Site Content", icon: Globe },
  { href: "/admin/portfolios", label: "Portfolios", icon: Briefcase },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "My Profile", icon: Settings },
];

export const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { admin, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(hydrateAuth());
    const token = localStorage.getItem("admin_token");
    if (token) {
      dispatch(checkAuth());
    } else {
      router.replace("/admin/login");
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isLoading, isAuthenticated, router]);

  async function handleLogout() {
    await dispatch(logoutAdmin());
    router.push("/admin/login");
  }

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent pointer-events-none" />
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-xl z-40 hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/[0.06]">
          <Link href="/" className="block">
            <span className="text-sm text-gray-500">Back to site</span>
            <div className="text-xl font-bold mt-1">
              <span className="text-violet-400">Admin</span>
              <span className="text-white"> Panel</span>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? router.pathname === item.href
              : router.pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/[0.06]">
          <div className="px-4 py-2 mb-2">
            <p className="text-sm font-medium text-white">
              {admin?.firstName} {admin?.lastName}
            </p>
            <p className="text-xs text-gray-500">{admin?.mobile}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between p-4">
            <span className="font-bold">Admin Panel</span>
            <button onClick={handleLogout} className="text-red-400 text-sm">
              Logout
            </button>
          </div>
          <div className="flex gap-1 px-4 pb-3 overflow-x-auto">
            {navItems.map((item) => {
              const isActive = item.exact
                ? router.pathname === item.href
                : router.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs whitespace-nowrap",
                    isActive
                      ? "bg-violet-500/20 text-violet-300"
                      : "text-gray-400"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </header>
        <main className="p-4 md:p-8 max-w-7xl">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
