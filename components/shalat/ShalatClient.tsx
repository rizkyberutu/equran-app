// components/shalat/ShalatClient.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardBody } from "@/components/selia/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectList,
  SelectItem,
} from "@/components/selia/select";
import { MapPin, Calendar, Clock } from "lucide-react";
import { getKabKotaByProvinsi, getShalatSchedule } from "@/lib/services";
import type { ShalatData } from "@/types/shalat";
import type { Locale } from "@/types/common";
import { ShalatNextPrayer } from "./ShalatNextPrayer";
import { ShalatScheduleTable } from "./ShalatScheduleTable";

interface ShalatClientProps {
  provinces: string[];
  locale: Locale;
  dict: any;
}

export function ShalatClient({ provinces, locale, dict }: ShalatClientProps) {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<{
    value: string;
    label: string;
  }>({
    value: (new Date().getMonth() + 1).toString(),
    label: `${
      dict.months[new Date().getMonth() + 1]
    } ${new Date().getFullYear()}`,
  });
  const [selectedYear] = useState<number>(new Date().getFullYear());

  const [cities, setCities] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<ShalatData | null>(null);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);

  // Fetch cities when province changes
  useEffect(() => {
    if (selectedProvince) {
      setIsLoadingCities(true);
      setSelectedCity("");
      setCities([]);

      getKabKotaByProvinsi(selectedProvince)
        .then((data) => {
          setCities(data);
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        })
        .finally(() => {
          setIsLoadingCities(false);
        });
    }
  }, [selectedProvince]);

  // Fetch schedule when all fields are filled
  useEffect(() => {
    if (selectedProvince && selectedCity && selectedMonth) {
      setIsLoadingSchedule(true);

      getShalatSchedule({
        provinsi: selectedProvince,
        kabkota: selectedCity,
        bulan: parseInt(selectedMonth.value, 10),
        tahun: selectedYear,
      })
        .then((data) => {
          setSchedule(data);
        })
        .catch((error) => {
          console.error("Error fetching schedule:", error);
        })
        .finally(() => {
          setIsLoadingSchedule(false);
        });
    }
  }, [selectedProvince, selectedCity, selectedMonth, selectedYear]);

  // Generate month options
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${dict.months[i + 1]} ${selectedYear}`,
  }));

  return (
    <div className="space-y-6">
      {/* Selection Form */}
      <Card>
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Province Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                {dict.selectProvince}
              </label>
              <Select
                value={selectedProvince}
                onValueChange={(value) => setSelectedProvince(value as string)}
              >
                <SelectTrigger className={"cursor-pointer"}>
                  <SelectValue placeholder={dict.provincePlaceholder}>
                    {selectedProvince || dict.provincePlaceholder}
                  </SelectValue>
                </SelectTrigger>
                <SelectPopup>
                  <SelectList>
                    {provinces.map((province) => (
                      <SelectItem
                        key={province}
                        value={province}
                        className={"cursor-pointer"}
                      >
                        {province}
                      </SelectItem>
                    ))}
                  </SelectList>
                </SelectPopup>
              </Select>
            </div>

            {/* City Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <MapPin className="size-4 text-cyan-500" />
                {dict.selectCity}
              </label>
              <Select
                value={selectedCity}
                onValueChange={(value) => setSelectedCity(value as string)}
                disabled={!selectedProvince || isLoadingCities}
              >
                <SelectTrigger className={"cursor-pointer"}>
                  <SelectValue placeholder={dict.cityPlaceholder}>
                    {isLoadingCities
                      ? "Loading..."
                      : selectedCity || dict.cityPlaceholder}
                  </SelectValue>
                </SelectTrigger>
                <SelectPopup>
                  <SelectList>
                    {cities.map((city) => (
                      <SelectItem
                        key={city}
                        value={city}
                        className={"cursor-pointer"}
                      >
                        {city}
                      </SelectItem>
                    ))}
                  </SelectList>
                </SelectPopup>
              </Select>
            </div>

            {/* Month Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Calendar className="size-4 text-violet-500" />
                {dict.selectMonth}
              </label>
              <Select
                value={selectedMonth}
                onValueChange={(value) =>
                  setSelectedMonth(value as { value: string; label: string })
                }
                disabled={!selectedCity}
              >
                <SelectTrigger className={"cursor-pointer"}>
                  <SelectValue
                    placeholder={dict.monthPlaceholder || "-- Pilih Bulan --"}
                  />
                </SelectTrigger>
                <SelectPopup>
                  <SelectList>
                    {monthOptions.map((month) => (
                      <SelectItem
                        key={month.value}
                        value={{
                          value: month.value,
                          label: month.label,
                        }}
                        className={"cursor-pointer"}
                      >
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectList>
                </SelectPopup>
              </Select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Next Prayer (Today's Schedule) */}
      {schedule && (
        <ShalatNextPrayer schedule={schedule} locale={locale} dict={dict} />
      )}

      {/* Schedule Table */}
      {isLoadingSchedule ? (
        <Card>
          <CardBody className="p-12 text-center">
            <Clock className="size-12 text-muted mx-auto mb-4 animate-spin" />
            <p className="text-muted">Loading schedule...</p>
          </CardBody>
        </Card>
      ) : schedule ? (
        <ShalatScheduleTable schedule={schedule} locale={locale} dict={dict} />
      ) : (
        <Card>
          <CardBody className="p-12 text-center">
            <MapPin className="size-16 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {dict.selectLocation}
            </h3>
            <p className="text-sm text-muted">{dict.selectLocationDesc}</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
