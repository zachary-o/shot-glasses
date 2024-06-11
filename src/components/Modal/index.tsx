import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import pin from "../../assets/images/pin.png";
import styles from "./Modal.module.scss";

interface ModalProps {
  cityEng: string;
  cityUkr?: string;
  continentEng?: string;
  continentUkr?: string;
  countryEng: string;
  countryUkr?: string;
  imageUrl: string;
  latitude?: string;
  longitude?: string;
  isOpenModal?: boolean;
  // setIsOpenModal: (isOpen: boolean) => void;
}
const Modal = ({
  // cityUkr,
  isOpenModal,
  cityEng,
}: // setIsOpenModal,

//   cityUkr,
//   continentEng,
//   continentUkr,
//   countryEng,
//   countryUkr,
//   imageUrl,
//   latitude,
//   longitude,
ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (isOpenModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const marker = {
    geocode: [48.8566, 2.3522],
  };

  const icon = new Icon({
    iconUrl: pin,
    size: [30, 30],
  });

  return (
    <div className={styles.modal} ref={modalRef}>
      <div className={styles.overlay}></div>
      <div className={styles["modal-content"]}>
        <MapContainer
          center={[48.85, 2.35]}
          zoom={6}
          style={{ height: 400, width: 600 }}
        >
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={marker.geocode} icon={icon}>
            <Popup>
              <h2>{cityEng}</h2>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Modal;
