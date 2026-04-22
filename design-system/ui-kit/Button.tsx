import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  ariaLabel?: string;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', ariaLabel, disabled }) => {
  const className = 'ds-btn ' + (variant === 'secondary' ? 'secondary' : '');
  return (
    <button
      className={className}
      onClick={onClick}
      aria-label={ariaLabel || (typeof children === 'string' ? children : 'button')}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
