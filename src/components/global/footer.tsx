"use client"

import { motion } from "framer-motion"
import { Link as ScrollLink } from "react-scroll"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="w-full border-t border-slate-800 py-12 bg-slate-950">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-10 px-4 md:px-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">MUF</span>{" "}
            Corporation
          </div>
          <p className="text-slate-400">
            Join our team and be part of an exciting startup journey. We're building the next generation of web
            applications.
          </p>
          <div className="flex space-x-4">
            {[Facebook, Twitter, Instagram, Linkedin, Github].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ y: -3 }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="space-y-2">
            {["About", "Benefits", "Apply"].map((item) => (
              <li key={item}>
                <ScrollLink
                  to={item.toLowerCase()}
                  spy={true}
                  smooth={true}
                  duration={800}
                  offset={-80}
                  className="text-slate-400 hover:text-white cursor-pointer transition-colors"
                >
                  {item}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Contact Us</h3>
          <p className="text-slate-400">E-Cell, A Block, MIT Campus</p>
          <p className="text-slate-400">hello@mufcorp.com</p>
          <p className="text-slate-400">+91 9876543210</p>
        </div>
      </div>
      <div className="container mt-10 border-t border-slate-800 pt-6 px-4 md:px-6">
        <p className="text-center text-sm text-slate-500">© 2024 MUF Corporation. All rights reserved.</p>
      </div>
    </footer>
  )
}
