import { ReactNode } from "react"

interface ButtonCustomProps {
  className: string
  children: ReactNode
  onClick?: () => void
  type?: "submit" | "reset" | "button" | undefined
}

const ButtonCustom = ({
  className,
  type,
  onClick,
  children,
}: ButtonCustomProps) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default ButtonCustom
