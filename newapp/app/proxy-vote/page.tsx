import { Navbar } from '@/components/Navbar'
import { ProxyVotingForm } from '@/components/ProxyVotingForm'

export default function ProxyVotePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-20 px-4 relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <h1 className="text-3xl font-bold text-center mb-8">Delegate Your Vote</h1>
        <ProxyVotingForm />
      </div>
    </main>
  )
}

