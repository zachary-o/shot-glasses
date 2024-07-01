import "leaflet/dist/leaflet.css"
import { useCallback, useEffect, useRef } from "react"
import useWindowWidth from "../../hooks/useWindowWidth"
import ButtonCustom from "../ButtonCustom"
import Map from "../Map"
import styles from "./Modal.module.scss"

interface ModalProps {
  cityEng: string
  cityUkr: string
  continentEng?: string
  continentUkr?: string
  countryEng: string
  countryUkr?: string
  imageUrl: string
  latitude: string
  longitude: string
  isOpenModal?: boolean
  setIsOpenModal: (isOpen: boolean) => void
}

const Modal = ({
  latitude,
  longitude,
  isOpenModal,
  cityEng,
  cityUkr,
  setIsOpenModal,
}: ModalProps) => {
  const windowWidth = useWindowWidth()
  const contentRef = useRef<HTMLDivElement>(null)

  // Function to close the modal if click is outside modal content
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpenModal(false)
      }
    },
    [setIsOpenModal]
  )

  useEffect(() => {
    if (isOpenModal) {
      document.body.classList.add("active-modal")
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.body.classList.remove("active-modal")
      document.removeEventListener("mousedown", handleClickOutside)
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpenModal, handleClickOutside])

  const customStyles = { height: 400, width: windowWidth <= 690 ? 350 : 600 }

  return (
    <div className={styles.modal}>
      <div className={styles.overlay}></div>
      <div className={styles["modal-content"]} ref={contentRef}>
        <ButtonCustom
          type="button"
          onClick={() => setIsOpenModal(false)}
          className={styles["modal-close"]}
        >
          x
        </ButtonCustom>
        <Map
          cityEng={cityEng}
          cityUkr={cityUkr}
          latitude={latitude}
          longitude={longitude}
          isMulti={false}
          zoom={6}
          customStyles={customStyles}
        />
      </div>
    </div>
  )
}

export default Modal
