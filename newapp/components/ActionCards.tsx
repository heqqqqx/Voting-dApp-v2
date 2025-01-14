import { ArrowRight, Vote, UserCheck, BarChart3 } from 'lucide-react'

const cards = [
  {
    title: 'Register',
    description: 'Verify your identity and join the secure voting platform.',
    icon: UserCheck,
    href: '/register'
  },
  {
    title: 'Vote',
    description: 'Cast your vote securely and transparently.',
    icon: Vote,
    href: '/vote'
  },
  {
    title: 'Track Results',
    description: 'Monitor voting results in real-time with full transparency.',
    icon: BarChart3,
    href: '/results'
  }
]

export function ActionCards() {
  return (
    <section className="px-4 py-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <a
              key={index}
              href={card.href}
              className="group bg-zinc-900 rounded-lg p-6 transition-all hover:bg-zinc-800"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-purple-500" />
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-500 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-400">{card.description}</p>
            </a>
          )
        })}
      </div>
    </section>
  )
}

