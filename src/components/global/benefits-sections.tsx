"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { motion } from "framer-motion"

const benefits = [
  {
    number: "01",
    title: "Real Startup Experience",
    description: "Build scalable products in a real startup environment and understand the development lifecycle.",
  },
  {
    number: "02",
    title: "Technical Skills",
    description: "Hands-on experience with Next.js, Tailwind CSS, and AWS deployments.",
  },
  {
    number: "03",
    title: "Production-Ready Code",
    description: "Learn to write clean, tested, production-ready code that meets industry standards.",
  },
  {
    number: "04",
    title: "Team Collaboration",
    description: "Collaborate with a passionate, friendly, and flexible development team.",
  },
]

export default function BenefitsSection() {
  const benefitsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".benefit-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        },
      )
    }, benefitsRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={benefitsRef} className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-10 mt-12">
      {benefits.map((benefit, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className="benefit-item flex flex-col items-start space-y-4"
        >
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-white font-bold text-lg shadow-lg shadow-purple-900/20">
            {benefit.number}
          </div>
          <h3 className="text-2xl font-bold">{benefit.title}</h3>
          <p className="text-slate-400">{benefit.description}</p>
        </motion.div>
      ))}
    </div>
  )
}
