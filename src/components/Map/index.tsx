import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import pin from "../../assets/images/pin.png"
import { Icon } from "leaflet"

// interface MapItem {
//   latitude: string
//   longitude: string
//   cityEng: string
//   cityUkr: string
// }

interface MapProps {
  latitude: string
  longitude: string
  cityEng: string
  cityUkr: string
  //   items?: MapItem[]
  isMulti: boolean
  zoom: number
}

const Map = ({ latitude, longitude, cityEng, cityUkr, zoom }: MapProps) => {
  const icon = new Icon({
    iconUrl: pin,
    iconSize: [20, 20],
    iconAnchor: [12, 20],
  })

  console.log("cityUkr", cityUkr)

  return (
    <MapContainer
      center={[Number(latitude), Number(longitude)]}
      zoom={zoom}
      style={{ height: 400, width: 600 }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[Number(latitude), Number(longitude)]} icon={icon}>
        <Popup>
          <h2>{cityEng}</h2>
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
