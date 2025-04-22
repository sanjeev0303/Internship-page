"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { toast } from "sonner"


export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState<Date>()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    toast(
      `Application submitted!
      We'll review your application and get back to you soon.`
    //   action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
    )

    // Reset form
    event.currentTarget.reset()
    setDate(undefined)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="first-name">First name</Label>
          <Input id="first-name" name="first-name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last name</Label>
          <Input id="last-name" name="last-name" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone number</Label>
        <Input id="phone" name="phone" type="tel" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="education">Current education</Label>
        <Select name="education" required>
          <SelectTrigger>
            <SelectValue placeholder="Select your education level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="undergraduate">Undergraduate</SelectItem>
            <SelectItem value="graduate">Graduate</SelectItem>
            <SelectItem value="postgraduate">Postgraduate</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="graduation">Expected graduation date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Technical skills</Label>
        <Textarea
          id="skills"
          name="skills"
          placeholder="List your technical skills (e.g., Next.js, React, Tailwind CSS, etc.)"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Relevant experience</Label>
        <Textarea id="experience" name="experience" placeholder="Briefly describe any relevant experience you have" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="why">Why do you want to join?</Label>
        <Textarea id="why" name="why" placeholder="Tell us why you're interested in this internship" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="resume">Resume/CV link (Google Drive, Dropbox, etc.)</Label>
        <Input id="resume" name="resume" type="url" required />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Application"
        )}
      </Button>
    </form>
  )
}
