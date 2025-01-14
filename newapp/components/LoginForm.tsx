'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatNSS } from '@/lib/utils'

export function LoginForm() {
  const router = useRouter()
  const [nss, setNss] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const user = storedUsers.find((u: { nss: string, secretKey: string }) => 
      u.nss.replace(/\s/g, '') === nss.replace(/\s/g, '') && u.secretKey === secretKey
    )

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      setSuccessMessage(`Welcome back, ${user.name}!`)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } else {
      setError('Invalid NSS or secret key. Please try again or register.')
    }
  }

  const handleNssChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNss = formatNSS(e.target.value)
    setNss(formattedNss)
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="X XX XX XX XXX XXX"
          value={nss}
          onChange={handleNssChange}
          maxLength={19}
          className="bg-zinc-800 border-zinc-700 font-mono"
          aria-label="Social Security Number"
        />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Secret Key (2 digits)"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          maxLength={2}
          className="bg-zinc-800 border-zinc-700"
          aria-label="Secret Key"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {successMessage && <p className="text-green-500 text-sm mt-1">{successMessage}</p>}
      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
        Login
      </Button>
    </form>
  )
}

