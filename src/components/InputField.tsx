/* InputField code from canvas */
import React, { useState, useMemo } from 'react'

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: string;
  clearable?: boolean;
  showPasswordToggle?: boolean;
  id?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  clearable = false,
  showPasswordToggle = false,
  id,
}) => {
  const [internalType, setInternalType] = useState(type)

  // Size styles
  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'sm': return 'px-2 py-1 text-sm'
      case 'lg': return 'px-4 py-3 text-base'
      default: return 'px-3 py-2 text-sm'
    }
  }, [size])

  // Variant styles
  const variantClasses = useMemo(() => {
    switch (variant) {
      case 'filled': return 'bg-gray-100 border-transparent'
      case 'ghost': return 'bg-transparent border-transparent'
      default: return 'bg-white border border-gray-300'
    }
  }, [variant])

  const base = `w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${sizeClasses} ${variantClasses}`
  const disabledClass = disabled ? 'opacity-60 cursor-not-allowed' : ''
  const invalidClass = invalid ? 'border-red-500 focus:ring-red-400' : ''

  const showClear = clearable && !disabled && value !== ''
  const canTogglePassword = showPasswordToggle && type === 'password'

  function handleClear() {
    const fakeEvent = { target: { value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>
    onChange?.(fakeEvent)
  }

  function togglePassword() {
    setInternalType(prev => (prev === 'password' ? 'text' : 'password'))
  }

  const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`

  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="block text-sm font-medium mb-1">{label}</label>}
      <div className={`relative ${disabledClass}`}>
        <input
          id={inputId}
          className={`${base} ${invalidClass}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          aria-describedby={helperText || errorMessage ? `${inputId}-help` : undefined}
          type={internalType}
        />
        {showClear && (
          <button
            aria-label="Clear input"
            onClick={handleClear}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-sm"
            type="button"
          >
            ✖
          </button>
        )}
        {canTogglePassword && (
          <button
            aria-label="Toggle password visibility"
            onClick={togglePassword}
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
          >
            {internalType === 'password' ? 'Show' : 'Hide'}
          </button>
        )}
        {invalid && <span className="sr-only">Error: {errorMessage}</span>}
      </div>
      <div id={`${inputId}-help`} className="mt-1 text-xs text-gray-500">
        {invalid ? <span className="text-red-600">{errorMessage}</span> : helperText}
      </div>
    </div>
  )
}

export default InputField
