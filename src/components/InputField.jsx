import { useState } from 'react'

const InputField = ({ 
  value, 
  onChange, 
  placeholder = "Enter text", 
  label,
  type = "text"
}) => {
  const [isFocused, setIsFocused] = useState(false)
  
  return (
    <div className="mb-4">
      {label && (
        <label 
          className="block text-sm font-medium mb-2 text-gray-700"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="input-field"
        />
        
        {isFocused && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary">
            <i className="bi bi-pencil-fill"></i>
          </span>
        )}
      </div>
    </div>
  )
}

export default InputField
