"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { motion } from "framer-motion"
import { useForm, type SubmitHandler } from "react-hook-form"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  education: z.string().min(1, "Education level is required"),
  graduationDate: z.date().optional(),
  skills: z.string().min(5, "Please list your technical skills"),
  experience: z.string().optional(),
  motivation: z.string().min(10, "Please tell us why you're interested"),
  resumeLink: z.string().url("Please provide a valid URL to your resume"),
})

type FormValues = z.infer<typeof formSchema>

export default function ApplicationFormSection() {
  const formRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const graduationDate = watch("graduationDate")

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        },
      )
    }, formRef)

    return () => ctx.revert()
  }, [])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast(
      ` Application submitted!
       We'll review your application and get back to you soon.`
   )

    // Reset form
    reset()
  }

  // Animate gradient on hover
  const buttonVariants = {
    hover: {
      backgroundPosition: "100% 0%",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div
      ref={formRef}
      className="mx-auto max-w-2xl mt-12 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              {...register("firstName")}
              className={cn(
                "bg-slate-800/50 border-slate-700 focus:border-cyan-500",
                errors.firstName && "border-red-500 focus:border-red-500",
              )}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              {...register("lastName")}
              className={cn(
                "bg-slate-800/50 border-slate-700 focus:border-cyan-500",
                errors.lastName && "border-red-500 focus:border-red-500",
              )}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className={cn(
              "bg-slate-800/50 border-slate-700 focus:border-cyan-500",
              errors.email && "border-red-500 focus:border-red-500",
            )}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            className={cn(
              "bg-slate-800/50 border-slate-700 focus:border-cyan-500",
              errors.phone && "border-red-500 focus:border-red-500",
            )}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="education">Current education</Label>
          <Select onValueChange={(value) => setValue("education", value)} defaultValue={watch("education")}>
            <SelectTrigger
              className={cn(
                "w-full bg-slate-800/50 border-slate-700 focus:border-cyan-500",
                errors.education && "border-red-500 focus:border-red-500",
              )}
            >
              <SelectValue placeholder="Select your education level" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="undergraduate">Undergraduate</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
              <SelectItem value="postgraduate">Postgraduate</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="graduationDate">Expected graduation date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal bg-slate-800/50 border-slate-700 hover:bg-slate-700/70",
                  !graduationDate && "text-slate-400",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {graduationDate ? format(graduationDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
              <Calendar
                mode="single"
                selected={graduationDate}
                onSelect={(date) => setValue("graduationDate", date)}
                initialFocus
                className="bg-slate-800"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Technical skills</Label>
          <Textarea
            id="skills"
            {...register("skills")}
            placeholder="List your technical skills (e.g., Next.js, React, Tailwind CSS, etc.)"
            className={cn(
              "bg-slate-800/50 border-slate-700 focus:border-cyan-500 min-h-[100px]",
              errors.skills && "border-red-500 focus:border-red-500",
            )}
          />
          {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Relevant experience (optional)</Label>
          <Textarea
            id="experience"
            {...register("experience")}
            placeholder="Briefly describe any relevant experience you have"
            className="bg-slate-800/50 border-slate-700 focus:border-cyan-500 min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="motivation">Why do you want to join?</Label>
          <Textarea
            id="motivation"
            {...register("motivation")}
            placeholder="Tell us why you're interested in this internship"
            className={cn(
              "bg-slate-800/50 border-slate-700 focus:border-cyan-500 min-h-[100px]",
              errors.motivation && "border-red-500 focus:border-red-500",
            )}
          />
          {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="resumeLink">Resume/CV link (Google Drive, Dropbox, etc.)</Label>
          <Input
            id="resumeLink"
            type="url"
            {...register("resumeLink")}
            className={cn(
              "bg-slate-800/50 border-slate-700 focus:border-cyan-500",
              errors.resumeLink && "border-red-500 focus:border-red-500",
            )}
          />
          {errors.resumeLink && <p className="text-red-500 text-sm mt-1">{errors.resumeLink.message}</p>}
        </div>

        <motion.button
          whileHover="hover"
          variants={buttonVariants}
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r from-cyan-500 to-purple-600 bg-size-200 shadow-lg shadow-purple-900/20 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </motion.button>
      </form>
    </div>
  )
}
