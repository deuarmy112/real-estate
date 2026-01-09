import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ListingCard from '../components/ListingCard'
import ListingRow from '../components/ListingRow'
import api from '../services/api'
import SearchBar from '../components/SearchBar'
import Spinner from '../components/Spinner'

export default function ListingList() {
  const [listings, setListings] = useState([] as any[])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [query, setQuery] = useState('')
  const [minPrice, setMinPrice] = useState(null as number | null)
  const [maxPrice, setMaxPrice] = useState(null as number | null)
  const [pageSize, setPageSize] = useState(24)
  const [sort, setSort] = useState('newest')
  const [view, setView] = useState('list' as 'grid' | 'list')
  const location = useLocation()
  const sentinelRef = useRef(null as HTMLDivElement | null)

  useEffect(() => {
    let mounted = true
    api.getListings().then((data) => {
      if (!mounted) return
      setListings(data || [])
      setLoading(false)
    }).catch(() => setLoading(false))
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const cat = params.get('category')
    if (cat) setQuery(cat)
  }, [location.search])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (pageSize >= listings.length) return
          setLoadingMore(true)
          setTimeout(() => {
            setPageSize((p: number) => Math.min(p + 24, listings.length))
            setLoadingMore(false)
          }, 300)
        }
      })
    }, { root: null, rootMargin: '400px', threshold: 0.05 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [sentinelRef, listings.length, pageSize])

  if (loading) return <p className="container">Loading listings…</p>

  const filtered = listings.filter((l: any) => {
    if (!query) return true
    const q = query.toLowerCase()
    return (l.title || '').toLowerCase().includes(q) || (l.address || '').toLowerCase().includes(q)
  })

  const sorted = [...filtered].sort((a: any, b: any) => {
    if (sort === 'price_asc') return (a.price || 0) - (b.price || 0)
    if (sort === 'price_desc') return (b.price || 0) - (a.price || 0)
    return (b.id || 0) - (a.id || 0)
  })

  const pageItems = sorted.slice(0, pageSize)

  return (
    <section className="container">
      <h2>Listings</h2>
      <div style={{ display: 'flex', gap: 16 }}>
        <aside style={{ width: 260 }}>
          <div style={{ background: '#fff', padding: 12, borderRadius: 8 }}>
            <h4>Filters</h4>
            <div style={{ marginTop: 8 }}>
              <div className="muted">Price</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <input placeholder="Min" value={minPrice ?? ''} onChange={(e: any) => setMinPrice(e.target.value ? Number(e.target.value) : null)} />
                <input placeholder="Max" value={maxPrice ?? ''} onChange={(e: any) => setMaxPrice(e.target.value ? Number(e.target.value) : null)} />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <div className="muted">Keywords</div>
              <input placeholder="e.g. sea view" value={query} onChange={(e: any) => setQuery(e.target.value)} />
            </div>
          </div>
        </aside>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <SearchBar value={query} onChange={(v) => setQuery(v)} minPrice={minPrice} maxPrice={maxPrice} onMinChange={(v) => setMinPrice(v)} onMaxChange={(v) => setMaxPrice(v)} />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <select value={sort} onChange={(e: any) => setSort(e.target.value)} style={{ padding: '8px', borderRadius: 8 }}>
                <option value="newest">Newest</option>
                <option value="price_asc">Price ↑</option>
                <option value="price_desc">Price ↓</option>
              </select>
              <button className={`btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}>Grid</button>
              <button className={`btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>List</button>
            </div>
          </div>

          {view === 'grid' ? (
            <div className="grid">
              {pageItems.map((l: any) => (
                <ListingCard key={l.id} id={l.id} title={l.title} price={l.price} address={l.address} image={l.images?.[0]} agentId={l.agentId} vip={l.vip} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {pageItems.map((l: any) => (
                <ListingRow key={l.id} l={l} />
              ))}
            </div>
          )}

          <div style={{ marginTop: 12, textAlign: 'center' }}>
            <div ref={sentinelRef} />
            <div className="loading-more">{loadingMore ? <Spinner /> : <div className="muted">Scroll to load more…</div>}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
