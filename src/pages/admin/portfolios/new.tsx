import Head from "next/head";
import { FC } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import PortfolioForm from "@/components/admin/PortfolioForm";

const NewPortfolioPage: FC = () => (
  <AdminLayout>
    <Head>
      <title>New Portfolio | Admin</title>
    </Head>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">New Portfolio</h1>
        <p className="text-gray-500 mt-1">Add a new project to your portfolio</p>
      </div>
      <PortfolioForm />
    </div>
  </AdminLayout>
);

export default NewPortfolioPage;
