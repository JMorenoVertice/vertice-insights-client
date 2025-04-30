import React, { ReactNode } from 'react';

type TextVariant = 'title' | 'subtitle' | 'body' | 'button' | 'caption';

interface AppTextProps {
  variant?: TextVariant;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const variantStyles: Record<TextVariant, React.CSSProperties> = {
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '1.2px',
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#e0e0e0',
    letterSpacing: '1px',
  },
  body: {
    fontSize: '1rem',
    fontWeight: '400',
    color: '#cccccc',
    lineHeight: 1.5,
  },
  button: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  caption: {
    fontSize: '0.875rem',
    fontWeight: '300',
    color: '#999999',
  },
};

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  children,
  className,
  style,
  onClick,
}) => {
  const combinedStyle = { ...variantStyles[variant], ...style };

  return (
    <p
      className={className}
      style={combinedStyle}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick();
            }
          }
          : undefined
      }
      role={onClick ? 'button' : undefined}
    >
      {children}
    </p>
  );
};
