"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, AlertTriangle, Check, Loader2 } from "lucide-react"
import LocationPicker from "./location-picker"
import SeveritySelector from "./severity-selector"

type Severity = "low" | "medium" | "high" | "critical"

interface OutageReport {
  location: { x: number; y: number }
  severity: Severity
}

export default function OutageReporter() {
  const [location, setLocation] = useState<{ x: number; y: number } | null>(null)
  const [severity, setSeverity] = useState<Severity>("medium")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!location) return

    const report: OutageReport = {
      location,
      severity,
    }

    // In a real app, you would send this data to your API
    console.log("Submitting report:", report)

    // Show loading state
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setLocation(null)
    setSeverity("medium")
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900">
              <Check className="h-8 w-8 text-emerald-600 dark:text-emerald-300" />
            </div>
            <h3 className="text-xl font-medium">Report Submitted</h3>
            <p className="text-center text-muted-foreground">
              Thank you for reporting the power outage. Your report has been received and will be addressed.
            </p>
            <Button
              onClick={handleReset}
              className="mt-4 bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-800 dark:text-white"
            >
              Report Another Outage
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Report a Power Outage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </label>
          <LocationPicker selectedLocation={location} onLocationSelect={setLocation} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Outage Severity
          </label>
          <SeveritySelector value={severity} onChange={setSeverity} />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={!location || isLoading}
          className="w-full bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-800 dark:text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Report"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

