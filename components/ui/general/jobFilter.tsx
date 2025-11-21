"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "../separator";
import { Checkbox } from "../checkbox";
import { countryList } from "@/app/utils/countryList";

export function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const jobTypes = ["full-time", "part-time", "contract", "internship"];

  const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];
  const currentLocation = searchParams.get("location") || "";
  const currentMinSalary = searchParams.get("minSalary") || "";
  const currentMaxSalary = searchParams.get("maxSalary") || "";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      value ? params.set(name, value) : params.delete(name);
      return params.toString();
    },
    [searchParams]
  );

  const handleJobTypeChange = (type: string, checked: boolean) => {
    const current = new Set(currentJobTypes);
    checked ? current.add(type) : current.delete(type);
    const newValue = Array.from(current).join(",");
    router.push(`?${createQueryString("jobTypes", newValue)}`);
  };

  const clearFilters = () => router.push("/");

  return (
    <Card className="w-full h-fit bg-white dark:bg-neutral-900 shadow-md rounded-xl p-4 sm:p-6 lg:p-8">
      <CardHeader className="space-y-4 p-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Filter
          </CardTitle>
          <Button
            variant="destructive"
            size="sm"
            className="h-8  w-fit px-2 rounded-md flex items-center"
            onClick={clearFilters}
          >
            <span className="mr-2">Clear all</span>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Separator />
      </CardHeader>

      <CardContent className="space-y-6 p-0">
        {/* Job Type */}
        <div className="space-y-4">
          <Label className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">
            Job Type
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {jobTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type.toLowerCase()}
                  checked={currentJobTypes.includes(type)}
                  onCheckedChange={(checked) => handleJobTypeChange(type, checked as boolean)}
                />
                <Label
                  htmlFor={type.toLowerCase()}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Location */}
        <div className="space-y-4">
          <Label className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">
            Location
          </Label>
          <Select
            value={currentLocation}
            onValueChange={(loc) => router.push(`?${createQueryString("location", loc)}`)}
          >
            <SelectTrigger className="bg-white dark:bg-neutral-800 border dark:border-neutral-700 text-gray-800 dark:text-gray-200">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent className="dark:bg-neutral-800 dark:text-gray-200 max-h-64 overflow-y-auto">
              <SelectGroup>
                <SelectLabel>Worldwide</SelectLabel>
                <SelectItem value="worldwide">
                  <span>🌍</span>
                  <span className="pl-2">Worldwide / Remote</span>
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Countries</SelectLabel>
                {countryList.map((country) => (
                  <SelectItem value={country.name} key={country.name}>
                    <span>{country.flagEmoji}</span>
                    <span className="pl-2">{country.name}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Salary Range */}
        <div className="space-y-4">
          <Label className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">
            Salary Range
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minSalary" className="text-sm text-gray-700 dark:text-gray-300">
                Min Salary
              </Label>
              <Input
                id="minSalary"
                type="number"
                placeholder="0"
                value={currentMinSalary}
                onChange={(e) => router.push(`?${createQueryString("minSalary", e.target.value)}`)}
                className="w-full bg-white dark:bg-neutral-800 border dark:border-neutral-700 text-gray-800 dark:text-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxSalary" className="text-sm text-gray-700 dark:text-gray-300">
                Max Salary
              </Label>
              <Input
                id="maxSalary"
                type="number"
                placeholder="500,000"
                value={currentMaxSalary}
                onChange={(e) => router.push(`?${createQueryString("maxSalary", e.target.value)}`)}
                className="w-full bg-white dark:bg-neutral-800 border dark:border-neutral-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}