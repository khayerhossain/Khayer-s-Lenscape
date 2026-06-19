"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        router.refresh();
      } else {
        setError(data.message || "Invalid password");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md glass-premium p-8 md:p-10 relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <span className="text-red-500 font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-2 block">
            Author Space
          </span>
          <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-anton)] tracking-tight text-white uppercase">
            Admin Login
          </h1>
          <p className="text-white/40 text-xs mt-2">
            Enter password to access dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-white/50 text-[10px] uppercase font-bold tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-white/30">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-colors focus:ring-1 focus:ring-red-500/20"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs font-semibold text-center bg-red-500/10 border border-red-500/20 py-3 rounded-xl"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full relative py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-950/40 disabled:text-white/30 rounded-2xl text-white font-bold uppercase tracking-[0.2em] text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Access Dashboard"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
