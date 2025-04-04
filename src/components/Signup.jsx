import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add validation logic here
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full p-2 rounded bg-slate-700"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full p-2 rounded bg-slate-700"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              required
              className="w-full p-2 rounded bg-slate-700"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <button type="submit" className="btn-primary w-full">Sign Up</button>
        </form>
        
        <p className="text-center">
          Already have an account?{' '}
          <Link to="/" className="text-primary hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  )
}