"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface HeadingProps {
  title: string
  subtitle: string
}

export default function Heading({ title, subtitle }: HeadingProps) {
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        },
      )
    }, headingRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={headingRef} className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="max-w-[700px] text-slate-400 md:text-xl/relaxed">{subtitle}</p>
      </div>
    </div>
  )
}
