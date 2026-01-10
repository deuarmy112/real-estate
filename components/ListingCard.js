import Link from 'next/link'

export default function ListingCard({ listing }) {
  return (
    <Link href={`/listings/${listing.id}`}>
      <a className="block bg-white rounded shadow-sm overflow-hidden hover:shadow-md">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-44 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{listing.title}</h3>
          <p className="text-sm text-gray-600">{listing.location}</p>
          <p className="mt-2 font-bold">€{listing.price}</p>
        </div>
      </a>
    </Link>
  )
}
