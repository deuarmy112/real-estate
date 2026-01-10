import Head from 'next/head'
import Header from '../components/Header'
import ListingCard from '../components/ListingCard'
import { useEffect, useState } from 'react'

export default function Home() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/listings')
        const body = await res.json()
        if (res.ok) setListings(body.listings || [])
      } catch (err) {
        console.error('fetch listings error', err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div>
      <Head>
        <title>Bazaraki-like Real Estate</title>
      </Head>

      <Header />

      <main className="container py-8">
        <h2 className="text-2xl font-semibold mb-4">Latest Listings</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
