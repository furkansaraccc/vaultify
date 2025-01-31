//file:components/ui/Alert.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, XCircle, AlertTriangle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import '@/styles/globals.css'
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-green-500/50 text-green-700 dark:border-green-500 [&>svg]:text-green-600",
        warning: "border-yellow-500/50 text-yellow-700 dark:border-yellow-500 [&>svg]:text-yellow-600",
        info: "border-blue-500/50 text-blue-700 dark:border-blue-500 [&>svg]:text-blue-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const variantIcons = {
  default: AlertCircle,
  destructive: XCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", icon, onClose, children, ...props }, ref) => {
    const VariantIcon = variant ? variantIcons[variant] : null;
    const hasIcon = !!icon || !!VariantIcon;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {icon && (
          <div className="absolute left-4 top-4">
            {React.isValidElement(icon) 
              ? React.cloneElement(icon as React.ReactElement<{ className?: string, 'aria-hidden'?: boolean }>, { className: "h-4 w-4", "aria-hidden": true })
              : icon}
          </div>
        )}
        
        {!icon && VariantIcon && (
          <VariantIcon className="h-4 w-4 absolute left-4 top-4" aria-hidden="true" />
        )}

        <div className="flex justify-between items-start">
          <div className={cn("flex-1", hasIcon && "pl-7")}>
            {children}
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="ml-4 h-4 w-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close alert"
            >
              <XCircle className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

// Define AlertTitle as a separate component
const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  )
);

AlertTitle.displayName = "AlertTitle";

// Define AlertDescription as a separate component
const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
);

AlertDescription.displayName = "AlertDescription";

Alert.displayName = "Alert";
export { Alert, AlertTitle, AlertDescription };