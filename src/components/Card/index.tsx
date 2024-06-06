import { Tooltip } from "react-tooltip"
import styles from "./Card.module.scss"
import img from "../../assets/images/shot-glass.png"

interface CardProps {
  id?: string
  cityEng?: string
  cityUkr?: string
  continentEng?: string
  continentUkr?: string
  countryEng?: string
  countryUkr?: string
  imageUrl?: string
  latitude?: string
  longitude?: string
  purchaseDate?: Date
}

const Card = ({}: // id,
// cityEng,
// cityUkr,
// continentEng,
// continentUkr,
// countryEng,
// countryUkr,
// imageUrl,
// latitude,
// longitude,
// purchaseDate,
CardProps) => {
  return (
    <div className={styles["card-container"]}>
      <img className={styles["shotglass-image"]} src={img} alt="" />
      <p className={styles.country}>sdsdsds,</p>
      <div>
        <span
          className={styles.city}
          data-tooltip-id="city-id"
          data-tooltip-content="Див. на карті"
        >
          sdsdsdsdsd
        </span>
        <Tooltip
          id="city-id"
          className={styles.tooltip}
          noArrow
          place="right"
        />
      </div>
    </div>
  )
}
export default Card
