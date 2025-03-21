"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"

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
      className="relative w-full h-64 cursor-crosshair overflow-hidden border-0 shadow-md"
      onClick={handleMapClick}
    >
      {/* Google Maps style California */}
      <div className="absolute inset-0 bg-[#e8f0e8]">
        {/* Pacific Ocean */}
        <div className="absolute left-0 top-0 w-[30%] h-full bg-[#c6dcf1]"></div>

        {/* California shape overlay */}
        <div
          className="absolute"
          style={{
            left: "10%",
            top: "5%",
            width: "40%",
            height: "90%",
            backgroundColor: "#e6efe6",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
            clipPath:
              "polygon(30% 0%, 100% 5%, 90% 20%, 95% 40%, 85% 60%, 75% 80%, 60% 100%, 40% 95%, 20% 90%, 0% 70%, 10% 50%, 5% 30%, 10% 10%)",
          }}
        ></div>

        {/* Major highways */}
        <div className="absolute left-[20%] top-[15%] w-[30%] h-[1px] bg-[#ffd350] rotate-[30deg]"></div>
        <div className="absolute left-[15%] top-[30%] w-[35%] h-[1px] bg-[#ffd350] rotate-[60deg]"></div>
        <div className="absolute left-[15%] top-[50%] w-[30%] h-[1px] bg-[#ffd350] rotate-[90deg]"></div>
        <div className="absolute left-[20%] top-[70%] w-[25%] h-[1px] bg-[#ffd350] rotate-[120deg]"></div>

        {/* Interstate highways */}
        <div className="absolute left-[15%] top-[20%] w-[30%] h-[2px] bg-[#4285F4] rotate-[15deg]"></div>
        <div className="absolute left-[20%] top-[40%] w-[25%] h-[2px] bg-[#4285F4] rotate-[75deg]"></div>
        <div className="absolute left-[15%] top-[60%] w-[30%] h-[2px] bg-[#4285F4] rotate-[165deg]"></div>

        {/* City markers - Google Maps style */}
        <div className="absolute left-[18%] top-[15%] flex flex-col items-center">
          <div className="w-2 h-2 rounded-full bg-white border border-gray-400"></div>
          <div className="text-[10px] font-medium text-gray-700 mt-1">San Francisco</div>
        </div>

        <div className="absolute left-[20%] top-[25%] flex flex-col items-center">
          <div className="w-2 h-2 rounded-full bg-white border border-gray-400"></div>
          <div className="text-[10px] font-medium text-gray-700 mt-1">San Jose</div>
        </div>

        <div className="absolute left-[40%] top-[20%] flex flex-col items-center">
          <div className="w-2 h-2 rounded-full bg-white border border-gray-400"></div>
          <div className="text-[10px] font-medium text-gray-700 mt-1">Sacramento</div>
        </div>

        <div className="absolute left-[35%] top-[45%] flex flex-col items-center">
          <div className="w-2 h-2 rounded-full bg-white border border-gray-400"></div>
          <div className="text-[10px] font-medium text-gray-700 mt-1">Fresno</div>
        </div>

        <div className="absolute left-[18%] top-[70%] flex flex-col items-center">
          <div className="w-2 h-2 rounded-full bg-white border border-gray-400"></div>
          <div className="text-[10px] font-medium text-gray-700 mt-1">Los Angeles</div>
        </div>

        <div className="absolute left-[20%] top-[85%] flex flex-col items-center">
          <div className="w-2 h-2 rounded-full bg-white border border-gray-400"></div>
          <div className="text-[10px] font-medium text-gray-700 mt-1">San Diego</div>
        </div>

        {/* Nevada */}
        <div
          className="absolute"
          style={{
            right: "10%",
            top: "10%",
            width: "30%",
            height: "60%",
            backgroundColor: "#f0ebe0",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
          }}
        ></div>

        {/* Map label */}
        <div className="absolute left-3 bottom-3 bg-white/80 px-2 py-1 rounded text-xs font-medium text-gray-700">
          California
        </div>
      </div>

      {/* Selected location pin - removed the white oval label */}
      {selectedLocation && (
        <div
          className="absolute z-10 transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${selectedLocation.x * 100}%`,
            top: `${selectedLocation.y * 100}%`,
          }}
        >
          <MapPin className="h-8 w-8 text-red-500 drop-shadow-md" fill="#ef4444" strokeWidth={1.5} />
        </div>
      )}

      {/* Instructions overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {!selectedLocation && (
          <div className="bg-white/90 px-4 py-2 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-700">Click to select outage location</p>
          </div>
        )}
      </div>
    </Card>
  )
}

