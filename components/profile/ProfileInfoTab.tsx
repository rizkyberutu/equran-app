// components/profile/ProfileInfoTab.tsx
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
import { User, Mail, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ProfileInfoTabProps {
  user: any;
  initialFullName: string;
  initialEmail: string;
  onSuccess: (message: string) => void;
  onError: (error: string) => void;
}

export function ProfileInfoTab({
  user,
  initialFullName,
  initialEmail,
  onSuccess,
  onError,
}: ProfileInfoTabProps) {
  const [fullName, setFullName] = useState(initialFullName);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: { full_name: fullName },
      });

      if (updateError) throw updateError;

      const { error: profileError } = await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", user?.id);

      if (profileError) throw profileError;

      onSuccess("Profile updated successfully!");
    } catch (err: any) {
      onError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <IconBox variant="primary-subtle" size="md">
          <User className="size-5" />
        </IconBox>
        <div>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </div>
      </CardHeader>

      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Field>
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted z-10" />
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10"
              />
            </div>
          </Field>

          <Field>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted z-10" />
              <Input
                id="email"
                type="email"
                value={initialEmail}
                disabled
                className="pl-10 opacity-70 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-muted mt-1">
              Email cannot be changed. Contact support if needed.
            </p>
          </Field>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading}
            progress={loading}
          >
            <Save className="size-4" />
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
