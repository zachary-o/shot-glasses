import { useEffect, useState } from "react"

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleResize = () => {
    const width = window.innerWidth
    setWindowWidth(width)
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return windowWidth
}

export default useWindowWidth
