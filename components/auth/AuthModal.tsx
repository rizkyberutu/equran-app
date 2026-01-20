// components/auth/AuthModal.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/selia/button";
import { Card, CardBody, CardHeader } from "@/components/selia/card";
import { Input } from "@/components/selia/input";
import { Label } from "@/components/selia/label";
import { X, Mail, Lock, User, Chromium } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils/cn";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export function AuthModal({
  isOpen,
  onClose,
  defaultTab = "login",
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const { error } = await signInWithEmail(email, password);
      if (error) {
        setError(error.message);
      } else {
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const { error } = await signUpWithEmail(email, password, fullName);
      if (error) {
        setError(error.message);
      } else {
        setError("");
        alert("Check your email to confirm your account!");
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="relative border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {activeTab === "login" ? "Welcome Back" : "Create Account"}
              </h2>
              <Button variant="plain" size="sm-icon" onClick={onClose}>
                <X className="size-5" />
              </Button>
            </div>
          </CardHeader>

          <CardBody className="p-6 space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-muted/30 rounded-lg">
              <button
                onClick={() => setActiveTab("login")}
                className={cn(
                  "flex-1 py-2 rounded-md font-medium transition-all cursor-pointer",
                  activeTab === "login"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={cn(
                  "flex-1 py-2 rounded-md font-medium transition-all cursor-pointer",
                  activeTab === "register"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                Register
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Google Sign In */}
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <Chromium className="size-5 mr-3" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form
              onSubmit={
                activeTab === "login" ? handleEmailLogin : handleEmailRegister
              }
              className="space-y-4"
            >
              {activeTab === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted" />
                    <Input
                      id="fullname"
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
                progress={loading}
              >
                {activeTab === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
