import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Header() {
  const [token, setToken] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setToken(typeof window !== 'undefined' ? localStorage.getItem('token') : null)
  }, [])

  function handleLogout() {
    localStorage.removeItem('token')
    setToken(null)
    router.push('/')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link href="/">
            <a className="text-2xl font-bold">Bazaraki-CY Clone</a>
          </Link>
          <Link href="/listings">
            <a className="text-sm text-gray-700 hover:text-blue-600">Listings</a>
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <input
            className="border rounded px-3 py-2 w-72"
            placeholder="Search listings, e.g., '2 bedroom'"
          />
          <Link href="/create">
            <a className="bg-blue-600 text-white px-4 py-2 rounded">Post Ad</a>
          </Link>
          {!token ? (
            <Link href="/login">
              <a className="text-sm px-3 py-2 border rounded">Login</a>
            </Link>
          ) : (
            <button onClick={handleLogout} className="text-sm px-3 py-2 border rounded">Logout</button>
          )}
        </nav>
      </div>
    </header>
  )
}
