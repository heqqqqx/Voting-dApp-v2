import { motion } from 'framer-motion'

const steps = [
  { number: '01', title: 'Register', description: 'Verify your identity using your social security number.' },
  { number: '02', title: 'Vote', description: 'Cast your vote securely for your chosen proposal.' },
  { number: '03', title: 'Delegate', description: 'Optionally delegate your vote to a trusted representative.' },
  { number: '04', title: 'Track', description: 'Monitor the results in real-time with full transparency.' }
]

export default function HowItWorks() {
  return (
    <section className="px-4 py-20 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute -left-4 -top-4 text-6xl font-bold text-purple-600 opacity-20">
              {step.number}
            </div>
            <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 relative z-10">
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

