"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Briefcase, BookOpen, Clock, MapPin, DollarSign, GraduationCap } from "lucide-react"

const details = [
  {
    icon: Briefcase,
    title: "Role Details",
    description:
      "Technical Support Intern focusing on frontend UI optimization, documentation, testing, and basic backend deployments.",
  },
  {
    icon: BookOpen,
    title: "Focus Areas",
    description: "Frontend UI (Next.js, TailwindCSS), Documentation, Testing, and AWS deployments",
    list: true,
    items: [
      "Frontend UI optimization (Next.js, TailwindCSS)",
      "Documentation",
      "Testing",
      "Backend deployments on AWS (basic involvement)",
    ],
  },
  {
    icon: Clock,
    title: "Timings",
    description: "9:20 AM – 4:30 PM with full flexibility during exams, semesters, and seasonal breaks",
  },
  {
    icon: MapPin,
    title: "Location",
    description: "E-Cell, A Block, MIT Campus",
  },
  {
    icon: DollarSign,
    title: "Stipend",
    description: "Paid internship — Payout begins after 2 months (we've been working since February)",
  },
  {
    icon: GraduationCap,
    title: "Learning Curve",
    description: "Full onboarding guide provided to help you get comfortable with the codebase within 1–2 weeks",
  },
]

export default function InternshipDetails() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".detail-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        },
      )
    }, cardsRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={cardsRef} className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-6">
      {details.map((detail, index) => (
        <div
          key={index}
          className="detail-card flex flex-col h-full space-y-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 hover:border-slate-700 transition-colors"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 text-cyan-400">
            <detail.icon className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold">{detail.title}</h3>
          {detail.list ? (
            <ul className="text-slate-400 space-y-2 list-disc list-inside flex-1">
              {detail.items?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 flex-1">{detail.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}
