import styles from "./Loader.module.scss"
import loaderImg from "../../assets/images/loader.gif"
import ReactDOM from "react-dom"

const Loader = () => {
  const loaderElement = document.getElementById("loader")

  if (!loaderElement) {
    return null
  }

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="Loader" />
      </div>
    </div>,
    loaderElement
  )
}

export default Loader
