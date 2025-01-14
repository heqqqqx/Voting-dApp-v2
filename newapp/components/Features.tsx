import { motion } from 'framer-motion'
import { Shield, Lock, Eye } from 'lucide-react'

const features = [
  {
    icon: <Shield className="w-12 h-12 text-purple-400" />,
    title: 'Secure',
    description: 'Your vote is protected by advanced cryptographic techniques.'
  },
  {
    icon: <Lock className="w-12 h-12 text-purple-400" />,
    title: 'Private',
    description: 'Your personal information remains confidential throughout the voting process.'
  },
  {
    icon: <Eye className="w-12 h-12 text-purple-400" />,
    title: 'Transparent',
    description: 'All votes are recorded on a public blockchain, ensuring full transparency.'
  }
]

export default function Features() {
  return (
    <section className="px-4 py-20 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Our Platform?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

