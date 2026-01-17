// components/imsakiyah/ImsakiyahClient.tsx
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
import { MapPin, Clock, Moon } from "lucide-react";
import { getImsakiyahKabKota, getImsakiyahSchedule } from "@/lib/services";
import type { ImsakiyahData } from "@/types/shalat";
import type { Locale } from "@/types/common";
import { ImsakiyahScheduleTable } from "./ImsakiyahScheduleTable";

interface ImsakiyahClientProps {
  provinces: string[];
  locale: Locale;
  dict: any;
}

export function ImsakiyahClient({
  provinces,
  locale,
  dict,
}: ImsakiyahClientProps) {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const [cities, setCities] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<ImsakiyahData | null>(null);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);

  // Fetch cities when province changes
  useEffect(() => {
    if (selectedProvince) {
      setIsLoadingCities(true);
      setSelectedCity("");
      setCities([]);

      getImsakiyahKabKota(selectedProvince)
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

  // Fetch schedule when province and city are selected
  useEffect(() => {
    if (selectedProvince && selectedCity) {
      setIsLoadingSchedule(true);

      getImsakiyahSchedule({
        provinsi: selectedProvince,
        kabkota: selectedCity,
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
  }, [selectedProvince, selectedCity]);

  return (
    <div className="space-y-6">
      {/* Selection Form */}
      <Card>
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        </CardBody>
      </Card>

      {/* Schedule Table */}
      {isLoadingSchedule ? (
        <Card>
          <CardBody className="p-12 text-center">
            <Clock className="size-12 text-muted mx-auto mb-4 animate-spin" />
            <p className="text-muted">{dict.loadingSchedule}</p>
          </CardBody>
        </Card>
      ) : schedule ? (
        <ImsakiyahScheduleTable
          schedule={schedule}
          locale={locale}
          dict={dict}
        />
      ) : (
        <Card>
          <CardBody className="p-12 text-center">
            <Moon className="size-16 text-primary mx-auto mb-4" />
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
