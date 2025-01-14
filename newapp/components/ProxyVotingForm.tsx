'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { AlertCircle, CheckCircle } from 'lucide-react'

export function ProxyVotingForm() {
  const router = useRouter()
  const [proxyName, setProxyName] = useState('')
  const [proxyId, setProxyId] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!proxyName.trim() || !proxyId.trim()) {
      setError('Please fill in all fields.')
      return
    }

    // In a real application, you would validate the proxy's information here
    // and send the delegation request to your backend

    // For this example, we'll simulate a successful delegation
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
    currentUser.proxyVote = { name: proxyName, id: proxyId }
    localStorage.setItem('currentUser', JSON.stringify(currentUser))

    setSuccess(true)
    router.push('/')
  }

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Vote Successfully Delegated</h2>
        <p className="text-gray-400">Your vote has been delegated to {proxyName}. Redirecting to home page...</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle>Delegate Your Vote</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="proxyName">Proxy's Name</Label>
                <Input
                  id="proxyName"
                  value={proxyName}
                  onChange={(e) => setProxyName(e.target.value)}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div>
                <Label htmlFor="proxyId">Proxy's ID</Label>
                <Input
                  id="proxyId"
                  value={proxyId}
                  onChange={(e) => setProxyId(e.target.value)}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-500 mt-4">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">Delegate Vote</Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

