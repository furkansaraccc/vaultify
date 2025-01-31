//file:components/ui/Card.tsx
import React from 'react';
import '@/styles/globals.css'
interface CardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

interface CardHeaderProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children?: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children?: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => (
  <div
    className={`
      rounded-lg border bg-card text-card-foreground shadow-sm
      ${hoverable ? 'transition-transform hover:scale-105 hover:shadow-lg cursor-pointer' : ''}
      ${className}
    `}
    onClick={onClick}
  >
    {children}
  </div>
);

const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  description,
  children,
  className = '',
}) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {title && <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>}
    {description && <p className="text-sm text-muted-foreground">{description}</p>}
    {children}
  </div>
);

const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = '',
}) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
}) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
}) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>
    {children}
  </div>
);

// components/ui/Card.tsx
export {
  // Core Card Components
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  // TypeScript Type Exports
  type CardProps,
  type CardHeaderProps,
  type CardTitleProps,
  type CardContentProps,
  type CardFooterProps,
};