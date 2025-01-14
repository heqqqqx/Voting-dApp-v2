import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="pt-32 pb-16 px-4 max-w-7xl mx-auto">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
          <span className="text-sm text-gray-400">Introducing: Secure Blockchain Voting</span>
          <ArrowRight className="w-4 h-4 ml-2 text-purple-500" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Democracy,
          <br />
          Decentralized.
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Enabling secure and transparent voting through blockchain technology. 
          Powered by cryptographic proof.
        </p>
      </div>
    </section>
  )
}

