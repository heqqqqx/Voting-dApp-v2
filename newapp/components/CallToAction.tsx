import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CallToAction() {
  return (
    <section className="px-4 py-20 max-w-4xl mx-auto text-center">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Ready to Make Your Voice Heard?
      </motion.h2>
      <motion.p 
        className="text-xl mb-10 text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Join our secure and transparent voting platform today and be part of the future of democracy.
      </motion.p>
      <motion.button 
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Get Started Now
        <ArrowRight className="ml-2" />
      </motion.button>
    </section>
  )
}

