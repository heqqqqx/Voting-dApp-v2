import { Navbar } from '@/components/Navbar'
import { VotingTab } from '@/components/VotingTab'
import {GeometricShapes} from "@/components/GeometricShapes";

export default function VotePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-20 px-4 relative">
          <GeometricShapes />
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <h1 className="text-3xl font-bold text-center mb-8">Cast Your Vote</h1>
        <VotingTab />
      </div>
    </main>
  )
}

