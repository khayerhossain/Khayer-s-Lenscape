import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import LoginForm from "@/components/LoginForm";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

function checkAuth(cookieStore) {
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "lenscape_secret_key_2026_xyz");
    return decoded && decoded.role === "admin";
  } catch (error) {
    return false;
  }
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = checkAuth(cookieStore);

  return (
    <main className="min-h-screen bg-[#060608] text-white pt-24 pb-12 font-sans relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {isAuthenticated ? <AdminDashboard /> : <LoginForm />}
      </div>
    </main>
  );
}
