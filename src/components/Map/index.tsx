import L, { Icon, MarkerCluster } from "leaflet"
import { useTranslation } from "react-i18next"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import pin from "../../assets/images/pin.png"
import { Item } from "../../redux/slices/itemsSlice"
import styles from "./Map.module.scss"
import "./normalize.css"

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
  cityUkr = "",
  customStyles,
  zoom,
  items,
}: MapProps) => {
  const { i18n } = useTranslation()

  const icon = new Icon({
    iconUrl: pin,
    iconSize: [20, 20],
    iconAnchor: [12, 20],
  })

  const createCustomClusterIcon = (cluster: MarkerCluster): L.DivIcon => {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: `${styles["custom-marker-cluster"]}`,
      iconSize: L.point(40, 40),
    })
  }

  const bounds: L.LatLngBoundsExpression = [
    [-85, -180],
    [85, 180],
  ]

  const city = i18n.language === "uk" ? cityUkr : cityEng

  return (
    <>
      <MapContainer
        center={[Number(latitude), Number(longitude)]}
        style={customStyles}
        zoom={zoom}
        minZoom={2}
        maxZoom={18}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
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
                <Popup>
                  {i18n.language === "uk" ? item.cityUkr : item.cityEng}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        ) : (
          <Marker position={[Number(latitude), Number(longitude)]} icon={icon}>
            <Popup>
              <h2>{city}</h2>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  )
}

export default Map
