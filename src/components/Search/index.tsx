import React from "react"

interface SearchProps {
  className?: string
  placeholder?: string
  spellCheck: boolean
  value: string
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
  onChange: (newValue: string) => void
  ref?: React.RefObject<HTMLInputElement>
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, placeholder, spellCheck, value, onClick, onChange }, ref) => {
    return (
      <input
        className={className}
        placeholder={placeholder}
        spellCheck={spellCheck}
        value={value}
        onClick={onClick}
        onChange={(event) => onChange(event.target.value)}
        ref={ref}
      />
    )
  }
)

export default Search
