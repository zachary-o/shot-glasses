import { Tooltip } from "react-tooltip"
import styles from "./Card.module.scss"
import img from "../../assets/images/shot-glass.png"

const Card = () => {
  return (
    <div className={styles["card-container"]}>
      <img className={styles["shotglass-image"]} src={img} alt="" />
      <p className={styles.country}>Country,</p>
      <div>
        <span data-tooltip-id="city-id" data-tooltip-content="Див. на карті">
          CityCity
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
