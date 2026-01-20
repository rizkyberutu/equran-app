// components/profile/SecurityTab.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/selia/button";
import { Input } from "@/components/selia/input";
import { Label } from "@/components/selia/label";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardDescription,
} from "@/components/selia/card";
import { Field } from "@/components/selia/field";
import { IconBox } from "@/components/selia/icon-box";
import { Shield, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface SecurityTabProps {
  onSuccess: (message: string) => void;
  onError: (error: string) => void;
}

export function SecurityTab({ onSuccess, onError }: SecurityTabProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      onError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      onError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      onSuccess("Password changed successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      onError(err.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <IconBox variant="danger-subtle" size="md">
          <Shield className="size-5" />
        </IconBox>
        <div>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your password and security</CardDescription>
        </div>
      </CardHeader>

      <CardBody className="space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Field>
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted z-10" />
              <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </Field>

          <Field>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted z-10" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </Field>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading}
            progress={loading}
          >
            <Lock className="size-4" />
            Change Password
          </Button>
        </form>

        {/* 2FA Section */}
        <div className="pt-8 border-t border-border">
          <h3 className="font-semibold mb-4">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium">2FA Status</p>
              <p className="text-sm text-muted">Not enabled</p>
            </div>
            <Button variant="outline" size="sm" disabled>
              Enable 2FA
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
