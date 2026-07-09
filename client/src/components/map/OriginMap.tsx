import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const origins = [
  { name: 'Ethiopia', lat: 9.145, lng: 40.489, slug: 'ethiopia', note: 'Floral, fruity, wine-like' },
  { name: 'Colombia', lat: 4.570, lng: -74.297, slug: 'colombia', note: 'Caramel, nutty, balanced' },
  { name: 'Indonesia', lat: -0.789, lng: 113.921, slug: 'indonesia', note: 'Earthy, chocolate, full-bodied' },
  { name: 'Costa Rica', lat: 9.748, lng: -83.753, slug: 'costa-rica', note: 'Citrus, honey, bright' },
  { name: 'Kenya', lat: -0.023, lng: 37.906, slug: 'kenya', note: 'Grapefruit, blackcurrant, wine-like' },
]

const markerIcon = L.divIcon({
  className: 'custom-marker',
  html: '<div style="background:#D4A04A;width:16px;height:16px;border-radius:50%;border:3px solid #1C1512;box-shadow:0 0 8px rgba(212,160,74,0.4)"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

export default function OriginMap() {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border border-outline-variant/30">
      <MapContainer
        center={[10, 20]}
        zoom={2}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {origins.map((origin) => (
          <Marker key={origin.name} position={[origin.lat, origin.lng]} icon={markerIcon}>
            <Popup>
              <div className="text-center font-body">
                <h3 className="font-bold text-lg">{origin.name}</h3>
                <p className="text-sm text-gray-600">{origin.note}</p>
                <Link
                  to={`/shop?origin=${origin.slug}`}
                  className="text-sm text-amber-700 hover:underline font-semibold mt-1 inline-block"
                >
                  Shop {origin.name} coffee &rarr;
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
