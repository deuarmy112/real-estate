import Head from 'next/head'
import Header from '../components/Header'
import ListingCard from '../components/ListingCard'

const SAMPLE_LISTINGS = [
  { id: '1', title: '2 Bedroom Apartment in Nicosia', price: 75000, location: 'Nicosia', image: 'https://via.placeholder.com/800x500?text=Apartment+1' },
  { id: '2', title: '3 Bedroom House in Limassol', price: 185000, location: 'Limassol', image: 'https://via.placeholder.com/800x500?text=House+2' },
  { id: '3', title: 'Studio near Larnaca Beach', price: 45000, location: 'Larnaca', image: 'https://via.placeholder.com/800x500?text=Studio+3' },
]

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bazaraki-like Real Estate</title>
      </Head>

      <Header />

      <main className="container py-8">
        <h2 className="text-2xl font-semibold mb-4">Latest Listings</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_LISTINGS.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </main>
    </div>
  )
}
