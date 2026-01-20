// components/profile/ProfileSidebar.tsx
"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/selia/avatar";
import { Card, CardBody } from "@/components/selia/card";
import { User, Shield, Globe, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileSidebarProps {
  fullName: string;
  email: string;
  avatarUrl: string;
  activeTab: "profile" | "security" | "preferences";
  onTabChange: (tab: "profile" | "security" | "preferences") => void;
}

export function ProfileSidebar({
  fullName,
  email,
  avatarUrl,
  activeTab,
  onTabChange,
}: ProfileSidebarProps) {
  return (
    <Card className="sticky top-24">
      <CardBody className="p-6">
        {/* Profile Preview */}
        <div className="flex flex-col items-center text-center mb-6 pb-6 border-b border-border">
          <div className="relative mb-4 group">
            <Avatar size="lg" className="h-24 w-24">
              <AvatarImage src={avatarUrl} alt={fullName || email} />
              <AvatarFallback>
                {email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <button className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="size-6 text-white" />
            </button>
          </div>
          <h3 className="font-semibold text-lg mb-1">{fullName || "User"}</h3>
          <p className="text-sm text-muted truncate max-w-full px-4">{email}</p>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-1">
          <button
            onClick={() => onTabChange("profile")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left cursor-pointer",
              activeTab === "profile"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            )}
          >
            <User className="size-5" />
            <span className="font-medium">Profile Info</span>
          </button>

          <button
            onClick={() => onTabChange("security")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left cursor-pointer",
              activeTab === "security"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            )}
          >
            <Shield className="size-5" />
            <span className="font-medium">Security</span>
          </button>

          <button
            onClick={() => onTabChange("preferences")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left cursor-pointer",
              activeTab === "preferences"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            )}
          >
            <Globe className="size-5" />
            <span className="font-medium">Preferences</span>
          </button>
        </nav>
      </CardBody>
    </Card>
  );
}
