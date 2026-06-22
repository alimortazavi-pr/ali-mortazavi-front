import Head from "next/head";
import { FC, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginAdmin, requestActivationCode } from "@/store/auth/actions";

const AdminLoginPage: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);

  async function handleRequestCode(e: FormEvent) {
    e.preventDefault();
    if (!mobile) {
      toast.error("Please enter your mobile number");
      return;
    }
    setSendingCode(true);
    try {
      await dispatch(requestActivationCode(mobile)).unwrap();
      setCodeSent(true);
      toast.success("Verification code sent to your phone");
    } catch {
      toast.error("Failed to send code. Check your mobile number.");
    } finally {
      setSendingCode(false);
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (!mobile || !code) {
      toast.error("Please enter mobile and verification code");
      return;
    }
    try {
      await dispatch(loginAdmin({ mobile, code })).unwrap();
      toast.success("Welcome back!");
      router.push("/admin");
    } catch {
      toast.error("Invalid code or mobile number");
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login | Ali Mortazavi</title>
      </Head>
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent pointer-events-none" />
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/15 border border-violet-500/20 mb-4">
              <Shield className="w-8 h-8 text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-500 mt-2">Sign in with your mobile number</p>
          </div>
          <Card>
            <CardContent>
              <form onSubmit={codeSent ? handleLogin : handleRequestCode} className="space-y-4">
                <Input
                  label="Mobile Number"
                  name="mobile"
                  placeholder="09xxxxxxxxx"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={codeSent}
                />
                {codeSent && (
                  <Input
                    label="Verification Code"
                    name="code"
                    placeholder="6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                  />
                )}
                <Button
                  type="submit"
                  className="w-full"
                  isLoading={codeSent ? isLoading : sendingCode}
                >
                  {codeSent ? "Sign In" : "Send Verification Code"}
                </Button>
                {codeSent && (
                  <button
                    type="button"
                    onClick={() => {
                      setCodeSent(false);
                      setCode("");
                    }}
                    className="w-full text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    Change mobile number
                  </button>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
