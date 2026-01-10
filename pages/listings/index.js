import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import ListingCard from '../../components/ListingCard'

export default function Listings() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchListings()
  }, [search, location, minPrice, maxPrice, page])

  async function fetchListings() {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() })
      if (search) params.append('search', search)
      if (location) params.append('location', location)
      if (minPrice) params.append('minPrice', minPrice)
      if (maxPrice) params.append('maxPrice', maxPrice)
      const res = await fetch(`/api/listings?${params}`)
      const body = await res.json()
      if (res.ok) {
        setListings(body.listings || [])
        setTotal(body.total || 0)
      }
    } catch (err) {
      console.error('fetch listings error', err.message)
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div>
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-6">All Listings</h1>

        {/* Filters */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              placeholder="Search title..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <input
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <input
              placeholder="Min price"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <input
              placeholder="Max price"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="border px-3 py-2 rounded"
            />
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {listings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}