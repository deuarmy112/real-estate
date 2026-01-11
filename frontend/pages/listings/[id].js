import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'

export default function ListingDetail() {
  const router = useRouter()
  const { id } = router.query
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(typeof window !== 'undefined' ? localStorage.getItem('token') : null)
  }, [])

  useEffect(() => {
    if (id) fetchListing()
  }, [id])

  async function fetchListing() {
    try {
      const res = await fetch(`/api/listings/${id}`)
      const body = await res.json()
      if (res.ok) {
        setListing(body.listing)
        setTitle(body.listing.title)
        setPrice(body.listing.price)
        setLocation(body.listing.location || '')
        setImage(body.listing.image || '')
        setDescription(body.listing.description || '')
      }
    } catch (err) {
      console.error('fetch listing error', err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate(e) {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, price: Number(price), location, image, description }),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body.error || 'Update failed')
      setListing(body.listing)
      setEditing(false)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this listing?')) return
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Delete failed')
      router.push('/listings')
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div><Header /><main className="container py-8"><p>Loading...</p></main></div>
  if (!listing) return <div><Header /><main className="container py-8"><p>Listing not found</p></main></div>

  return (
    <div>
      <Header />
      <main className="container py-8">
        {editing ? (
          <form onSubmit={handleUpdate} className="max-w-2xl bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Edit Listing</h1>
            <label className="block mb-2">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded mb-4" />
            <label className="block mb-2">Price (€)</label>
            <input value={price} onChange={e => setPrice(e.target.value)} className="w-full border px-3 py-2 rounded mb-4" />
            <label className="block mb-2">Location</label>
            <input value={location} onChange={e => setLocation(e.target.value)} className="w-full border px-3 py-2 rounded mb-4" />
            <label className="block mb-2">Image URL</label>
            <input value={image} onChange={e => setImage(e.target.value)} className="w-full border px-3 py-2 rounded mb-4" />
            <label className="block mb-2">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border px-3 py-2 rounded mb-4" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Save</button>
            <button type="button" onClick={() => setEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        ) : (
          <div className="bg-white rounded shadow p-6">
            <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
            <img src={listing.image || 'https://via.placeholder.com/800x500?text=No+Image'} alt={listing.title} className="w-full h-64 object-cover rounded mb-4" />
            <p className="text-2xl font-bold text-green-600 mb-2">€{listing.price}</p>
            <p className="text-gray-600 mb-2"><strong>Location:</strong> {listing.location || 'Not specified'}</p>
            <p className="mb-4">{listing.description || 'No description'}</p>
            {token && (
              <div className="flex gap-2">
                <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
                <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
              </div>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        )}
      </main>
    </div>
  )
}
