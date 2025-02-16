import type { RefObject, FC } from 'react'
import { useState, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { ChevronDown } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  value: string
  options: Option[]
  placeholder?: string
  onChange: (value: string) => void
}

export const Select: FC<SelectProps> = ({
  value,
  options,
  placeholder = 'Select an option',
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(selectRef as RefObject<HTMLDivElement>, () => {
    setIsOpen(false)
  })

  // Derive the selected option from the required value prop
  const selectedOption = options.find(option => option.value === value)

  function handleSelect(option: Option) {
    onChange(option.value)
    setIsOpen(false)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(prev => !prev)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()

      if (!isOpen) {
        setIsOpen(true)
        return
      }

      const currentIndex = selectedOption
        ? options.findIndex(option => option.value === selectedOption.value)
        : -1

      const nextIndex =
        event.key === 'ArrowDown'
          ? (currentIndex + 1) % options.length
          : (currentIndex - 1 + options.length) % options.length

      handleSelect(options[nextIndex])
    }
  }

  return (
    <div ref={selectRef} className="relative w-64" onKeyDown={handleKeyDown} tabIndex={0}>
      <div
        className="bg-white border border-gray-300 rounded-md p-2 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700">{selectedOption ? selectedOption.label : placeholder}</span>

        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map(option => (
            <li
              key={option.value}
              className="p-2 hover:bg-gray-100 cursor-pointer text-gray-700"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
