import L, { Icon } from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import pin from "../../assets/images/pin.png"
import { Item } from "../../redux/slices/itemsSlice"

interface CustomStyles {
  width: number | string
  height?: number | string
  maxHeight?: number | string
  borderRadius?: number | string
  backgroundColor?: string
  marginBottom?: number | string
}

interface MapProps {
  latitude?: string
  longitude?: string
  cityEng?: string
  cityUkr?: string
  isMulti: boolean
  zoom: number
  items?: Item[]
  customStyles: CustomStyles
}

const Map = ({
  latitude = "",
  longitude = "",
  cityEng = "",
  customStyles,
  zoom,
  items,
}: // cityUkr = "",
MapProps) => {
  const icon = new Icon({
    iconUrl: pin,
    iconSize: [20, 20],
    iconAnchor: [12, 20],
  })

  console.log("items", items)

  const createCustomClusterIcon = (cluster: any) => {
    return L.divIcon({
      html: `<div><span>${cluster.getChildCount()}</span></div>`,
      className: "custom-cluster-icon",
      iconSize: L.point(40, 40),
    })
  }

  return (
    <>
      <MapContainer
        center={[Number(latitude), Number(longitude)]}
        zoom={zoom}
        style={customStyles}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {items && items.length > 0 ? (
          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createCustomClusterIcon}
          >
            {items.map((item) => (
              <Marker
                key={item.id}
                position={[Number(item.latitude), Number(item.longitude)]}
                icon={icon}
              >
                <Popup>{item.cityEng}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        ) : (
          <Marker position={[Number(latitude), Number(longitude)]} icon={icon}>
            <Popup>
              <h2>{cityEng}</h2>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  )
}

export default Map
