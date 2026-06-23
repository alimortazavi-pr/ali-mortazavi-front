import Link from "next/link";
import { useRouter } from "next/router";
import { Home, ArrowLeft } from "lucide-react";
import SEOHead from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/Button";
import NavBar from "@/components/layouts/NavBar";
import { withSiteSettings } from "@/lib/withSiteSettings";

function NotFoundPage() {
  const router = useRouter();

  return (
    <div>
      <SEOHead title="404" description="Page not found" />
      <NavBar />
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="relative mb-8">
          <span className="text-[8rem] md:text-[12rem] font-bold font-display text-white/[0.03] leading-none select-none">404</span>
          <span className="absolute inset-0 flex items-center justify-center text-6xl md:text-8xl font-bold font-display text-gradient">404</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white font-display mb-3">Page not found</h1>
        <p className="text-gray-500 max-w-md mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex gap-3">
          <Link href="/"><Button><Home className="w-4 h-4" />Go Home</Button></Link>
          <Button variant="secondary" onClick={() => router.back()}><ArrowLeft className="w-4 h-4" />Go Back</Button>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = withSiteSettings();
export default NotFoundPage;
