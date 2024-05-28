import styles from "./Card.module.scss";
import img from "../../assets/images/shot-glass.png";

const Card = () => {
  return (
    <div className={styles["card-container"]}>
      <img src={img} alt="" />
      <p>Country</p>
      <p>City</p>
    </div>
  );
};
export default Card;
