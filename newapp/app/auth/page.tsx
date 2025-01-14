import { AuthForm } from '@/components/auth/AuthForm'
import {GeometricShapes} from "@/components/GeometricShapes";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-md mx-auto px-4">
          <GeometricShapes />
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to SecureVote</h1>
        <AuthForm />
      </div>
    </div>
  )
}

