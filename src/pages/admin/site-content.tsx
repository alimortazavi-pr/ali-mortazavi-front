import Head from "next/head";
import { FC } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import SiteContentEditor from "@/components/admin/SiteContentEditor";

const AdminSiteContentPage: FC = () => (
  <AdminLayout>
    <Head>
      <title>Site Content | Admin</title>
    </Head>
    <SiteContentEditor />
  </AdminLayout>
);

export default AdminSiteContentPage;
