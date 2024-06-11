import { useState } from "react"
import { Tooltip } from "react-tooltip"
import styles from "./Card.module.scss"

interface CardProps {
  id?: string
  cityEng: string
  cityUkr?: string
  continentEng?: string
  continentUkr?: string
  countryEng: string
  countryUkr?: string
  imageUrl: string
  latitude?: string
  longitude?: string
  purchaseDate?: Date
}

const Card = ({ cityEng, countryEng, imageUrl }: CardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  // console.log("isOpen", isOpen)

  const truncateText = (text: string, length: number) => {
    if (text) {
      if (text.length > length) {
        return `${text.slice(0, length)}...`
      }
    }
    return text
  }

  return (
    <div className={styles["card-container"]}>
      <img className={styles["shotglass-image"]} src={imageUrl} alt="" />
      <p className={styles.country}>{truncateText(countryEng, 17)}</p>
      <div className={styles["city-container"]}>
        <p className={styles.city}>{truncateText(cityEng, 19)}</p>
        {isOpen ? (
          <span
            className={styles["more-info-close"]}
            data-tooltip-id="city-id"
            data-tooltip-content="Див. на карті"
            onClick={() => setIsOpen(false)}
          >
            x
          </span>
        ) : (
          <span
            className={styles["more-info"]}
            data-tooltip-id="city-id"
            onClick={() => setIsOpen(true)}
          >
            i
          </span>
        )}

        <Tooltip
          id="city-id"
          className={styles.tooltip}
          noArrow
          place="right"
          openOnClick
          isOpen={isOpen}
          style={{ cursor: "pointer" }}
          // render={}
        />
      </div>
    </div>
  )
}
export default Card
