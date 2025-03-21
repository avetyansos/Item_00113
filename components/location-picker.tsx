"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface LocationPickerProps {
  selectedLocation: { x: number; y: number } | null
  onLocationSelect: (location: { x: number; y: number }) => void
}

export default function LocationPicker({ selectedLocation, onLocationSelect }: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (mapRef.current) {
      const updateSize = () => {
        setMapSize({
          width: mapRef.current?.offsetWidth || 0,
          height: mapRef.current?.offsetHeight || 0,
        })
      }

      updateSize()
      window.addEventListener("resize", updateSize)
      return () => window.removeEventListener("resize", updateSize)
    }
  }, [])

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return

    const rect = mapRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    onLocationSelect({ x, y })
  }

  return (
    <Card
      ref={mapRef}
      className="relative w-full h-64 bg-gray-100 cursor-crosshair overflow-hidden"
      onClick={handleMapClick}
    >
      {/* Simple map representation */}
      <svg width="100%" height="100%" className="absolute inset-0">
        <rect x="10%" y="20%" width="80%" height="10%" fill="#6b7280" />
        <rect x="30%" y="40%" width="40%" height="10%" fill="#6b7280" />
        <rect x="20%" y="60%" width="60%" height="10%" fill="#6b7280" />
        <rect x="50%" y="20%" width="10%" height="70%" fill="#6b7280" />
        <rect x="20%" y="30%" width="10%" height="50%" fill="#6b7280" />
      </svg>

      {selectedLocation && (
        <div
          className="absolute w-6 h-6 transform -translate-x-3 -translate-y-3 z-10"
          style={{
            left: `${selectedLocation.x * 100}%`,
            top: `${selectedLocation.y * 100}%`,
          }}
        >
          <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse" />
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {!selectedLocation && (
          <p className="text-sm text-muted-foreground bg-background/80 p-2 rounded">Click to select location</p>
        )}
      </div>
    </Card>
  )
}

