import { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../components/Header'

export default function Login() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body.error || 'Login failed')
      localStorage.setItem('token', body.token)
      router.push('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <Header />
      <main className="container py-8">
        <h1 className="text-2xl font-bold mb-4">Login (demo)</h1>
        <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded shadow">
          <label className="block mb-2">Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} className="w-full border px-3 py-2 rounded mb-4" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </main>
    </div>
  )
}
