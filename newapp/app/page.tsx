import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { ActionCards } from '@/components/ActionCards'
import { GeometricShapes } from '@/components/GeometricShapes'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="relative">
        <GeometricShapes />
        <div className="relative z-10">
          <Hero />
          <ActionCards />
        </div>
      </div>
    </main>
  )
}

