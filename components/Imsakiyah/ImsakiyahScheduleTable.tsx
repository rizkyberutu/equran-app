// components/imsakiyah/ImsakiyahScheduleTable.tsx
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
import { Moon } from "lucide-react";
import type { ImsakiyahData } from "@/types/shalat";
import type { Locale } from "@/types/common";
import { cn } from "@/lib/utils/cn";
import { IconBox } from "../selia/icon-box";

interface ImsakiyahScheduleTableProps {
  schedule: ImsakiyahData;
  locale: Locale;
  dict: any;
}

export function ImsakiyahScheduleTable({
  schedule,
  locale,
  dict,
}: ImsakiyahScheduleTableProps) {
  const today = new Date();
  const todayDate = today.getDate();

  return (
    <Card>
      <CardHeader className="border-b-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <IconBox variant="primary" size="lg">
              <Moon className="size-6" />
            </IconBox>
            <div>
              <h3 className="text-xl font-bold">
                {dict.scheduleTitle || "Jadwal Imsakiyah Ramadan"}
              </h3>
              <p className="text-sm text-muted">
                <span className="text-primary font-medium">
                  {schedule.kabkota}, {schedule.provinsi}
                </span>{" "}
                • {schedule.hijriah} H / {schedule.masehi} M
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="mx-6">
        <TableContainer className="border border-primary rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left py-4 bg-primary/10">
                  {dict.table?.date || "Tanggal"}
                </TableHead>
                <TableHead className="text-center text-orange-600 bg-primary/10">
                  {dict.table?.imsak || "Imsak"}
                </TableHead>
                <TableHead className="text-center bg-primary/10">
                  {dict.table?.subuh || "Subuh"}
                </TableHead>
                <TableHead className="text-center bg-primary/10">
                  {dict.table?.terbit || "Terbit"}
                </TableHead>
                <TableHead className="text-center bg-primary/10">
                  {dict.table?.dhuha || "Dhuha"}
                </TableHead>
                <TableHead className="text-center bg-primary/10">
                  {dict.table?.dzuhur || "Dzuhur"}
                </TableHead>
                <TableHead className="text-center bg-primary/10">
                  {dict.table?.ashar || "Ashar"}
                </TableHead>
                <TableHead className="text-center text-orange-600 bg-primary/10">
                  {dict.table?.maghrib || "Maghrib"}
                </TableHead>
                <TableHead className="text-center bg-primary/10">
                  {dict.table?.isya || "Isya"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.imsakiyah.map((day) => {
                const isToday = day.tanggal === todayDate;

                return (
                  <TableRow
                    key={day.tanggal}
                    className={cn(
                      isToday && "bg-primary/5 hover:bg-primary/10"
                    )}
                  >
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

                    <TableCell className="text-center">
                      <span className="text-sm text-orange-600 font-semibold">
                        {day.imsak}
                      </span>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="text-sm font-medium">{day.subuh}</span>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="text-sm">{day.terbit}</span>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="text-sm">{day.dhuha}</span>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="text-sm font-medium">{day.dzuhur}</span>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="text-sm font-medium">{day.ashar}</span>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="text-sm text-orange-600 font-semibold">
                        {day.maghrib}
                      </span>
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="text-sm font-medium">{day.isya}</span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="mt-12 py-4 bg-primary/10 rounded-lg">
          <p className="font-medium text-sm md:text-base text-primary text-center">
            {dict.footerInfo}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
