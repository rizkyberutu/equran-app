// app/[locale]/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/selia/alert";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { ProfileInfoTab } from "@/components/profile/ProfileInfoTab";
import { SecurityTab } from "@/components/profile/SecurityTab";
import { PreferencesTab } from "@/components/profile/PreferencesTab";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Profile state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // UI state
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "preferences"
  >("profile");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }

    if (user) {
      setFullName(user.user_metadata?.full_name || "");
      setEmail(user.email || "");
      setAvatarUrl(user.user_metadata?.avatar_url || "");
    }
  }, [user, authLoading, router]);

  const handleSuccess = (msg: string) => {
    setMessage(msg);
    setError("");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleError = (err: string) => {
    setError(err);
    setMessage("");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <Alert variant="success" className="mb-6">
            <CheckCircle2 className="size-5" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="danger" className="mb-6">
            <AlertCircle className="size-5" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <ProfileSidebar
              fullName={fullName}
              email={email}
              avatarUrl={avatarUrl}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            {activeTab === "profile" && (
              <ProfileInfoTab
                user={user}
                initialFullName={fullName}
                initialEmail={email}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            )}

            {activeTab === "security" && (
              <SecurityTab onSuccess={handleSuccess} onError={handleError} />
            )}

            {activeTab === "preferences" && <PreferencesTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
