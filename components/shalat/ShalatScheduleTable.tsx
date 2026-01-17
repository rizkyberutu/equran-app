// components/shalat/ShalatScheduleTable.tsx
"use client";

import { Card, CardBody, CardHeader } from "@/components/selia/card";
import { Badge } from "@/components/selia/badge";
import {
  Table,
  TableContainer,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/selia/table";
import { Calendar } from "lucide-react";
import type { ShalatData } from "@/types/shalat";
import type { Locale } from "@/types/common";
import { cn } from "@/lib/utils/cn";
import { IconBox } from "../selia/icon-box";

interface ShalatScheduleTableProps {
  schedule: ShalatData;
  locale: Locale;
  dict: any;
}

export function ShalatScheduleTable({
  schedule,
  locale,
  dict,
}: ShalatScheduleTableProps) {
  const today = new Date();
  const todayDate = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  // Check if viewing current month
  const isCurrentMonth =
    schedule.bulan === currentMonth && schedule.tahun === currentYear;

  return (
    <Card>
      <CardHeader className="border-b-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <IconBox variant="primary" size="lg">
              <Calendar className="size-6" />
            </IconBox>
            <div>
              <h3 className="text-xl font-bold">
                {dict.scheduleTitle || "Jadwal Shalat"} {schedule.bulan_nama}{" "}
                {schedule.tahun}
              </h3>
              <p className="text-sm text-muted">
                <span className="text-primary font-medium">
                  {schedule.kabkota}, {schedule.provinsi}
                </span>{" "}
                • {schedule.jadwal.length} {dict.daysLabel || "hari"}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="mx-6">
        {/* Table */}
        <TableContainer className="border border-primary rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="">
                <TableHead className="text-left py-4 bg-primary/10">
                  {dict.table?.date || "Tgl"}
                </TableHead>
                <TableHead className="text-left text-primary bg-primary/10">
                  {dict.table?.day || "Hari"}
                </TableHead>
                <TableHead className="text-center text-pink-600 bg-primary/10">
                  {dict.table?.imsak || "Imsak"}
                </TableHead>
                <TableHead className="text-center text-blue-600 bg-primary/10">
                  {dict.table?.subuh || "Subuh"}
                </TableHead>
                <TableHead className="text-center bg-primary/10">
                  {dict.table?.terbit || "Terbit"}
                </TableHead>
                <TableHead className="text-center text-tertiary bg-primary/10">
                  {dict.table?.dhuha || "Dhuha"}
                </TableHead>
                <TableHead className="text-center text-cyan-600 bg-primary/10">
                  {dict.table?.dzuhur || "Dzuhur"}
                </TableHead>
                <TableHead className="text-center text-violet-600 bg-primary/10">
                  {dict.table?.ashar || "Ashar"}
                </TableHead>
                <TableHead className="text-center text-orange-600 bg-primary/10">
                  {dict.table?.maghrib || "Maghrib"}
                </TableHead>
                <TableHead className="text-center text-purple-600 bg-primary/10">
                  {dict.table?.isya || "Isya"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.jadwal.map((day) => {
                const isToday = isCurrentMonth && day.tanggal === todayDate;

                return (
                  <TableRow
                    key={day.tanggal}
                    className={cn(
                      isToday && "bg-primary/5 hover:bg-primary/10"
                    )}
                  >
                    {/* Date */}
                    <TableCell>
                      <div className="flex items-center min-w-17 gap-2">
                        <span className="font-medium">{day.tanggal}</span>
                        {isToday && (
                          <Badge variant="primary-outline" size="sm">
                            {dict.today}
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    {/* Day */}
                    <TableCell className="text-primary">
                      {dict.days[day.hari as keyof typeof dict.days] ||
                        day.hari}
                    </TableCell>

                    {/* Imsak */}
                    <TableCell className="text-center">
                      <span className=" text-sm text-pink-600">
                        {day.imsak}
                      </span>
                    </TableCell>

                    {/* Subuh */}
                    <TableCell className="text-center">
                      <span className=" text-sm text-blue-600 font-medium">
                        {day.subuh}
                      </span>
                    </TableCell>

                    {/* Terbit */}
                    <TableCell className="text-center">
                      <span className=" text-sm text-muted">{day.terbit}</span>
                    </TableCell>

                    {/* Dhuha */}
                    <TableCell className="text-center">
                      <span className=" text-sm text-tertiary">
                        {day.dhuha}
                      </span>
                    </TableCell>

                    {/* Dzuhur */}
                    <TableCell className="text-center">
                      <span className=" text-sm text-cyan-600 font-medium">
                        {day.dzuhur}
                      </span>
                    </TableCell>

                    {/* Ashar */}
                    <TableCell className="text-center">
                      <span className=" text-sm text-violet-600 font-medium">
                        {day.ashar}
                      </span>
                    </TableCell>

                    {/* Maghrib */}
                    <TableCell className="text-center">
                      <span className=" text-sm text-orange-600 font-medium">
                        {day.maghrib}
                      </span>
                    </TableCell>

                    {/* Isya */}
                    <TableCell className="text-center">
                      <span className=" text-sm text-purple-600 font-medium">
                        {day.isya}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer Info */}
        <div className="mt-12 py-4 bg-primary/10 rounded-lg">
          <p className="font-medium text-sm md:text-base text-primary text-center">
            {dict.footerInfo}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
