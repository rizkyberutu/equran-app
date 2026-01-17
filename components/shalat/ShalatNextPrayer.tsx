// components/shalat/ShalatNextPrayer.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardBody } from "@/components/selia/card";
import { Badge } from "@/components/selia/badge";
import { Bell, Clock } from "lucide-react";
import type { ShalatData } from "@/types/shalat";
import type { Locale } from "@/types/common";
import { cn } from "@/lib/utils/cn";
import { IconBox } from "../selia/icon-box";

interface ShalatNextPrayerProps {
  schedule: ShalatData;
  locale: Locale;
  dict: any;
}

export function ShalatNextPrayer({
  schedule,
  locale,
  dict,
}: ShalatNextPrayerProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const today = new Date();
  const todayDate = today.getDate();
  const todaySchedule = schedule.jadwal.find((s) => s.tanggal === todayDate);

  if (!todaySchedule) return null;

  // Format current time for comparison (HH:MM)
  const currentTimeString = `${String(currentTime.getHours()).padStart(
    2,
    "0"
  )}:${String(currentTime.getMinutes()).padStart(2, "0")}`;

  // Format current time for display (HH:MM:SS)
  const displayTime = `${String(currentTime.getHours()).padStart(
    2,
    "0"
  )}:${String(currentTime.getMinutes()).padStart(2, "0")}:${String(
    currentTime.getSeconds()
  ).padStart(2, "0")}`;

  const prayers = [
    { name: dict.table.subuh, time: todaySchedule.subuh, color: "bg-blue-500" },
    {
      name: dict.table.dzuhur,
      time: todaySchedule.dzuhur,
      color: "bg-cyan-500",
    },
    {
      name: dict.table.ashar,
      time: todaySchedule.ashar,
      color: "bg-violet-500",
    },
    {
      name: dict.table.maghrib,
      time: todaySchedule.maghrib,
      color: "bg-orange-500",
    },
    { name: dict.table.isya, time: todaySchedule.isya, color: "bg-purple-500" },
  ];

  const nextPrayer =
    prayers.find((p) => p.time > currentTimeString) || prayers[0];
  const nextPrayerIndex = prayers.indexOf(nextPrayer);

  return (
    <Card className="border-primary/20">
      <CardBody className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <IconBox variant="primary" size="lg">
              <Bell className="size-6" />
            </IconBox>
            <div>
              <p className="text-sm text-muted">
                {dict.nextPrayer || "Shalat Berikutnya"}
              </p>
              <h3 className="text-2xl font-bold">{nextPrayer.name}</h3>
            </div>
          </div>
          <div className="text-right flex items-center gap-2 mb-1">
            <Badge variant="primary-outline" size="lg">
              {displayTime}
            </Badge>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {prayers.map((prayer, index) => (
            <div
              key={prayer.name}
              className={cn(
                "p-3 rounded-lg border transition-all",
                index === nextPrayerIndex
                  ? "border-primary bg-primary/5"
                  : "border-primary/10 bg-primary/10"
              )}
            >
              <p className="text-xs text-primary mb-1">{prayer.name}</p>
              <p className="text-lg text-primary font-bold">{prayer.time}</p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
