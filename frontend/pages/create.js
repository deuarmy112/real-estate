import { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../components/Header'

export default function Create() {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const token = localStorage.getItem('token')
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, price: Number(price), location, image, description }),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body.error || 'Create failed')
      router.push('/listings')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <Header />
      <main className="container py-8">
        <h1 className="text-2xl font-bold mb-4">Create Listing</h1>
        <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-6 rounded shadow">
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

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </main>
    </div>
  )
}
