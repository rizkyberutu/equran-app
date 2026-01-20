// components/profile/PreferencesTab.tsx
"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardDescription,
} from "@/components/selia/card";
import { Switch } from "@/components/selia/switch";
import { IconBox } from "@/components/selia/icon-box";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectList,
  SelectItem,
} from "@/components/selia/select";
import { Globe, Moon, Bell } from "lucide-react";

export function PreferencesTab() {
  const [language, setLanguage] = useState<string>("id");
  const [theme, setTheme] = useState<string>("system");
  const [prayerReminders, setPrayerReminders] = useState(false);

  return (
    <Card>
      <CardHeader>
        <IconBox variant="info-subtle" size="md">
          <Globe className="size-5" />
        </IconBox>
        <div>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </div>
      </CardHeader>

      <CardBody className="space-y-6">
        {/* Language */}
        <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
          <div className="flex items-center gap-3 flex-1">
            <Globe className="size-5 text-muted shrink-0" />
            <div className="flex-1">
              <p className="font-medium">Language</p>
              <p className="text-sm text-muted">
                Choose your preferred language
              </p>
            </div>
          </div>
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value as string)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectPopup>
              <SelectList>
                <SelectItem value="id">Bahasa Indonesia</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectList>
            </SelectPopup>
          </Select>
        </div>

        {/* Theme */}
        <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
          <div className="flex items-center gap-3 flex-1">
            <Moon className="size-5 text-muted shrink-0" />
            <div className="flex-1">
              <p className="font-medium">Theme</p>
              <p className="text-sm text-muted">Light or dark mode</p>
            </div>
          </div>
          <Select
            value={theme}
            onValueChange={(value) => setTheme(value as string)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectPopup>
              <SelectList>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectList>
            </SelectPopup>
          </Select>
        </div>

        {/* Prayer Reminders */}
        <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
          <div className="flex items-center gap-3 flex-1">
            <Bell className="size-5 text-muted shrink-0" />
            <div className="flex-1">
              <p className="font-medium">Prayer Reminders</p>
              <p className="text-sm text-muted">
                Get notified for prayer times
              </p>
            </div>
          </div>
          <Switch
            checked={prayerReminders}
            onCheckedChange={setPrayerReminders}
          />
        </div>
      </CardBody>
    </Card>
  );
}
