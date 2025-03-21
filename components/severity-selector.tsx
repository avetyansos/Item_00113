"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type Severity = "low" | "medium" | "high" | "critical"

interface SeveritySelectorProps {
  value: Severity
  onChange: (value: Severity) => void
}

export default function SeveritySelector({ value, onChange }: SeveritySelectorProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(val) => onChange(val as Severity)}
      className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-1"
    >
      <div className="flex items-center space-x-2 rounded-md sm:rounded-l-md sm:rounded-r-none border p-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800">
        <RadioGroupItem
          value="low"
          id="low"
          className="border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400"
        />
        <Label htmlFor="low" className="cursor-pointer">
          Low
        </Label>
      </div>

      <div className="flex items-center space-x-2 rounded-md sm:rounded-none border p-2 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800">
        <RadioGroupItem
          value="medium"
          id="medium"
          className="border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400"
        />
        <Label htmlFor="medium" className="cursor-pointer">
          Medium
        </Label>
      </div>

      <div className="flex items-center space-x-2 rounded-md sm:rounded-none border p-2 bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200 dark:border-orange-800">
        <RadioGroupItem
          value="high"
          id="high"
          className="border-orange-600 text-orange-600 dark:border-orange-400 dark:text-orange-400"
        />
        <Label htmlFor="high" className="cursor-pointer">
          High
        </Label>
      </div>

      <div className="flex items-center space-x-2 rounded-md sm:rounded-r-md sm:rounded-l-none border p-2 bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800">
        <RadioGroupItem
          value="critical"
          id="critical"
          className="border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400"
        />
        <Label htmlFor="critical" className="cursor-pointer">
          Critical
        </Label>
      </div>
    </RadioGroup>
  )
}

