import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNSS(value: string): string {
  // Remove all non-digits
  const cleaned = value.replace(/\D/g, '')
  
  // Limit to 13 digits
  const limited = cleaned.slice(0, 13)
  
  // Format as X XX XX XX XXX XXX
  let formatted = ''
  for (let i = 0; i < limited.length; i++) {
    if (i === 1 || i === 3 || i === 5 || i === 7 || i === 10) {
      formatted += ' '
    }
    formatted += limited[i]
  }
  
  return formatted
}

export function validateNSS(nss: string, secretKey: string, gender: string, birthDate: string, birthDepartment: string, birthCommune: string): boolean {
  const cleanNss = nss.replace(/\s/g, '')
  
  if (cleanNss.length !== 13) return false

  const genderMatch = (gender === 'male' && cleanNss[0] === '1') || (gender === 'female' && cleanNss[0] === '2')
  const birthYear = birthDate.slice(2, 4)
  const birthMonth = birthDate.slice(5, 7)
  
  const yearMatch = cleanNss.slice(1, 3) === birthYear
  const monthMatch = cleanNss.slice(3, 5) === birthMonth
  const departmentMatch = cleanNss.slice(5, 7) === birthDepartment
  const communeMatch = cleanNss.slice(7, 10) === birthCommune

  // Calculate the secret key
  const number = parseInt(cleanNss, 10)
  const calculatedKey = 97 - (number % 97)
  const keyMatch = parseInt(secretKey, 10) === calculatedKey

  console.log('Validation Results:', {
    genderMatch,
    yearMatch,
    monthMatch,
    departmentMatch,
    communeMatch,
    keyMatch,
    calculatedKey
  })

  return genderMatch && yearMatch && monthMatch && departmentMatch && communeMatch && keyMatch
}

