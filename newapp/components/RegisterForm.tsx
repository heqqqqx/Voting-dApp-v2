'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatNSS, validateNSS } from '@/lib/utils'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface ValidationState {
  format: boolean
  uniqueness: boolean
  validity: boolean
}

export function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [nss, setNss] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [gender, setGender] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [birthDepartment, setBirthDepartment] = useState('')
  const [birthCommune, setBirthCommune] = useState('')
  const [error, setError] = useState('')
  const [validations, setValidations] = useState<ValidationState>({
    format: false,
    uniqueness: false,
    validity: false
  })

  useEffect(() => {
    validateAndUpdateNSS()
  }, [nss, secretKey, gender, birthDate, birthDepartment, birthCommune])

  const validateAndUpdateNSS = () => {
    const cleanNss = nss.replace(/\s/g, '')
    const validFormat = /^\d{13}$/.test(cleanNss)
    
    // Check uniqueness
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const isUnique = !storedUsers.some((u: { nss: string }) => 
      u.nss.replace(/\s/g, '') === cleanNss
    )
    
    // Validate NSS
    const isValid = validateNSS(cleanNss, secretKey, gender, birthDate, birthDepartment, birthCommune)

    setValidations({
      format: validFormat,
      uniqueness: isUnique,
      validity: isValid
    })

    return validFormat && isUnique && isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateAndUpdateNSS()) {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const newUser = { 
        name,
        nss, 
        secretKey,
        gender,
        birthDate,
        birthDepartment,
        birthCommune,
        registeredAt: new Date().toISOString() 
      }
      storedUsers.push(newUser)
      localStorage.setItem('users', JSON.stringify(storedUsers))
      localStorage.setItem('currentUser', JSON.stringify(newUser))
      router.push('/')
    } else {
      setError('Please ensure all validation checks pass.')
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
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-zinc-800 border-zinc-700"
          aria-label="Your Name"
          required
        />
      </div>
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
        <p className="text-sm text-gray-400 mt-1">Entered NSS: {nss}</p>
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
      <div>
        <Select onValueChange={setGender}>
          <SelectTrigger className="bg-zinc-800 border-zinc-700">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="bg-zinc-800 border-zinc-700"
          aria-label="Birth Date"
        />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Birth Department (2 digits)"
          value={birthDepartment}
          onChange={(e) => setBirthDepartment(e.target.value)}
          maxLength={2}
          className="bg-zinc-800 border-zinc-700"
          aria-label="Birth Department"
        />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Birth Commune Code (3 digits)"
          value={birthCommune}
          onChange={(e) => setBirthCommune(e.target.value)}
          maxLength={3}
          className="bg-zinc-800 border-zinc-700"
          aria-label="Birth Commune Code"
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <div className="space-y-2">
        <ValidationItem
          title="Format"
          description="Must be 13 digits"
          isValid={validations.format}
        />
        <ValidationItem
          title="Uniqueness"
          description="NSS not already registered"
          isValid={validations.uniqueness}
        />
        <ValidationItem
          title="Validity"
          description="Matches provided information"
          isValid={validations.validity}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-purple-600 hover:bg-purple-700"
        disabled={!Object.values(validations).every(Boolean)}
      >
        Register
      </Button>
    </form>
  )
}

function ValidationItem({ title, description, isValid }: { 
  title: string; 
  description: string; 
  isValid: boolean 
}) {
  return (
    <div className="flex items-start gap-2 text-sm">
      {isValid ? (
        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
      ) : (
        <AlertCircle className="w-5 h-5 text-gray-500 mt-0.5" />
      )}
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  )
}

