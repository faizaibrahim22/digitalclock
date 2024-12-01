"use client"
import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const DigitalClock = () => {
  const [time, setTime] = useState<Date>(new Date()) 
  const [is24Hour, setIs24Hour] = useState<boolean>(true)
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000) 
    return () => clearInterval(interval)
  }, [])

  const formattedTime = useMemo<string>(() => {
    if (!mounted) return ""

    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0")
      : ((time.getHours() % 12) || 12).toString().padStart(2, "0")  // 12-hour format conversion
    const minutes = time.getMinutes().toString().padStart(2, "0")
    const seconds = time.getSeconds().toString().padStart(2, "0")
    const amPm = !is24Hour && time.getHours() >= 12 ? "PM" : "AM"  // Add AM/PM for 12-hour format

    return is24Hour ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}:${seconds} ${amPm}`
  }, [time, is24Hour, mounted])

  return (
    <div className="flex items-center justify-center bg-purple-950 h-screen">
      <Card className="p-9 shadow-lg rounded-full">
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold  tracking-tight">Digital Clock</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Display current time in hours, minutes, and seconds.
          </div>
          <div className="text-6xl font-semibold tracking-tight">
            {formattedTime}
          </div>
          <div className="mt-4 flex items-center">
            <Button
              variant={is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(true)}
              className="mr-2 font-bold"
            >
              24-Hour Format
            </Button>
            <Button
              variant={!is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(false)}
              className="mr-2 font-bold"
            >
              12-Hour Format
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default DigitalClock
