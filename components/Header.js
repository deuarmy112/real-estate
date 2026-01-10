import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Link href="/">
          <a className="text-2xl font-bold">Bazaraki-CY Clone</a>
        </Link>
        <nav className="flex items-center gap-4">
          <input
            className="border rounded px-3 py-2 w-72"
            placeholder="Search listings, e.g., '2 bedroom'"
          />
          <Link href="/create">
            <a className="bg-blue-600 text-white px-4 py-2 rounded">Post Ad</a>
          </Link>
        </nav>
      </div>
    </header>
  )
}
