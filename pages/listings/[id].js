import { useRouter } from 'next/router'
import Header from '../../components/Header'

export default function ListingDetail() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Header />
      <main className="container py-8">
        <h1 className="text-2xl font-bold">Listing {id}</h1>
        <p className="text-gray-600 mt-2">This is a placeholder detail page for listing {id}.</p>
        <div className="mt-4 bg-white rounded shadow p-4">
          <img src={`https://via.placeholder.com/1000x600?text=Listing+${id}`} alt={`Listing ${id}`} className="w-full h-auto rounded" />
          <div className="mt-4">
            <p className="font-semibold">€120,000</p>
            <p className="text-sm text-gray-600">Location: Example City</p>
            <p className="mt-2">Description: This is a mock listing to demonstrate the layout.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
