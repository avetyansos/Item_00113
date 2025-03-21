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
      <div className="flex items-center space-x-2 rounded-md sm:rounded-l-md sm:rounded-r-none border p-2 bg-green-50">
        <RadioGroupItem value="low" id="low" />
        <Label htmlFor="low" className="cursor-pointer">
          Low
        </Label>
      </div>

      <div className="flex items-center space-x-2 rounded-md sm:rounded-none border p-2 bg-yellow-50">
        <RadioGroupItem value="medium" id="medium" />
        <Label htmlFor="medium" className="cursor-pointer">
          Medium
        </Label>
      </div>

      <div className="flex items-center space-x-2 rounded-md sm:rounded-none border p-2 bg-orange-50">
        <RadioGroupItem value="high" id="high" />
        <Label htmlFor="high" className="cursor-pointer">
          High
        </Label>
      </div>

      <div className="flex items-center space-x-2 rounded-md sm:rounded-r-md sm:rounded-l-none border p-2 bg-red-50">
        <RadioGroupItem value="critical" id="critical" />
        <Label htmlFor="critical" className="cursor-pointer">
          Critical
        </Label>
      </div>
    </RadioGroup>
  )
}

