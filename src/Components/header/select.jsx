import React, { useId, forwardRef } from 'react';

const Select = forwardRef(function Select(
  { options = [], label, className = '', ...props }, 
  ref
) {
  const id = useId();

  return (
    <div className={className}>
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} ref={ref} {...props} className="border p-2">
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
