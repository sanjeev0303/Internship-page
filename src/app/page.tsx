"use client"

import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Link as ScrollLink } from "react-scroll"
import Heading from "@/components/global/heading"
import InternshipDetails from "@/components/global/internship-details"
import BenefitsSection from "@/components/global/benefits-sections"
import ApplicationFormSection from "@/components/global/application-form-section"
import Footer from "@/components/global/footer"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function InternshipLanding() {
  const heroRef = useRef<HTMLDivElement>(null)

  // Hero animation on page load
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.2 },
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

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
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-slate-900/80 border-b border-slate-800">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">MUF</span>{" "}
            Corporation
          </div>
          <nav className="hidden md:flex gap-6">
            {["about", "benefits", "apply"].map((section) => (
              <ScrollLink
                key={section}
                to={section}
                spy={true}
                smooth={true}
                duration={800}
                offset={-80}
                className="text-sm font-medium text-slate-300 hover:text-white cursor-pointer capitalize"
              >
                {section}
              </ScrollLink>
            ))}
          </nav>
          <ScrollLink to="apply" spy={true} smooth={true} duration={800} offset={-80} className="hidden md:flex">
            <motion.button
              whileHover="hover"
              variants={buttonVariants}
              className="px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-purple-600 bg-size-200 shadow-lg shadow-purple-900/20"
            >
              Apply Now
            </motion.button>
          </ScrollLink>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="w-full py-20 md:py-32 overflow-hidden relative"
          style={{
            background: "radial-gradient(circle at top right, rgba(124, 58, 237, 0.15), transparent 800px)",
          }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute top-1/2 -left-40 w-80 h-80 bg-cyan-500 rounded-full opacity-10 blur-3xl"></div>
          </div>

          <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hero-content inline-block rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-600/20 px-3 py-1 text-sm"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-medium">
                Internship Opportunity
              </span>
            </motion.div>
            <h1 className="hero-content text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-300">
              Join Our Tech Team as a Technical Support Intern
            </h1>
            <p className="hero-content max-w-[700px] text-slate-300 md:text-xl/relaxed">
              Gain real-world experience in a dynamic startup environment under MUF Corporation
            </p>
            <div className="hero-content flex flex-col md:flex-row gap-4 mt-6">
              <ScrollLink to="apply" spy={true} smooth={true} duration={800} offset={-80}>
                <motion.button
                  whileHover="hover"
                  variants={buttonVariants}
                  className="px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r from-cyan-500 to-purple-600 bg-size-200 shadow-lg shadow-purple-900/20 flex items-center justify-center w-full md:w-auto"
                >
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </ScrollLink>
              <ScrollLink to="about" spy={true} smooth={true} duration={800} offset={-80}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="px-6 py-3 rounded-full font-medium border border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 transition-colors flex items-center justify-center w-full md:w-auto"
                >
                  Learn More
                </motion.button>
              </ScrollLink>
            </div>
          </div>
        </section>

        {/* About the Internship */}
        <section id="about" className="w-full py-20 bg-slate-900 border-t border-slate-800">
          <div className="container px-4 md:px-6">
            <Heading title="About the Internship" subtitle="Everything you need to know about the role" />
            <InternshipDetails />
          </div>
        </section>

        {/* What You'll Gain */}
        <section
          id="benefits"
          className="w-full py-20 relative"
          style={{
            background: "radial-gradient(circle at bottom left, rgba(6, 182, 212, 0.15), transparent 800px)",
          }}
        >
          <div className="container px-4 md:px-6">
            <Heading title="What You'll Gain" subtitle="Valuable experience and skills for your career" />
            <BenefitsSection />
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="w-full py-20 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full opacity-10 blur-3xl"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <Heading title="Apply Now" subtitle="Fill out the form below to apply for the position" />
            <ApplicationFormSection />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
