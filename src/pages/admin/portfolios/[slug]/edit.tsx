import Head from "next/head";
import { FC } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import PortfolioForm from "@/components/admin/PortfolioForm";

const EditPortfolioPage: FC = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  return (
    <AdminLayout>
      <Head>
        <title>Edit Portfolio | Admin</title>
      </Head>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Edit Portfolio</h1>
          <p className="text-gray-500 mt-1">Update project details and images</p>
        </div>
        {slug && <PortfolioForm slug={slug} />}
      </div>
    </AdminLayout>
  );
};

export default EditPortfolioPage;
