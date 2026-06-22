import Head from "next/head";
import { FC, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateProfile } from "@/store/auth/actions";

const AdminSettingsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { admin } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (admin) {
      setForm({ firstName: admin.firstName, lastName: admin.lastName });
    }
  }, [admin]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(updateProfile(form)).unwrap();
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <Head>
        <title>Settings | Admin</title>
      </Head>
      <div className="space-y-6 max-w-lg">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your admin profile</p>
        </div>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
              />
              <Input
                label="Mobile"
                value={admin?.mobile || ""}
                disabled
              />
              <Button type="submit" isLoading={loading}>
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
