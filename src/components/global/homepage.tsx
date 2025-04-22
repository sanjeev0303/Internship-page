"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const Page = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-yellow-100 text-gray-800 px-4 py-12 md:px-16 lg:px-32">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          🚀 Internship Opportunity at MUF Corporation
        </h1>

        <p className="text-lg md:text-xl mb-4">
          We’re working on a startup under MUF Corporation — currently just two devs handling both frontend and backend. To reduce workload and build faster, we’re expanding!
        </p>

        <p className="text-lg md:text-xl mb-6">
          Join us as a <strong>Technical Support Intern</strong>. This is a <strong>paid internship</strong> focused on frontend UI optimization, docs, testing, and AWS backend deployments.
        </p>

        {/* ... other sections ... */}

        <motion.div whileHover={{ scale: 1.05 }} className="inline-block mt-4">
          <Button className="text-lg px-6 py-3 rounded-2xl shadow-md">
            Apply Now <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </motion.section>
    </main>
  )
}

export default Page
