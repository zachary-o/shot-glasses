import { ReactNode } from "react"

interface ButtonCustomProps {
  className: string
  children: ReactNode
  onClick: () => void
}

const ButtonCustom = ({ className, onClick, children }: ButtonCustomProps) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export default ButtonCustom
