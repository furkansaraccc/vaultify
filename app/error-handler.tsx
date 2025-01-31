// file: app/error-handler.tsx
// app/error-handler.tsx
import { useEffect } from 'react';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import '@/styles/globals.css'
type ErrorHandlerProps = {
  error?: Error & { digest?: string };
  reset?: () => void;
  type: 'error' | 'not-found';
};

export function ErrorHandler({ error, reset, type }: ErrorHandlerProps) {
  useEffect(() => {
    if (type === 'error' && error) {
      console.error('Application error:', error);
    }
  }, [error, type]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center">
            {type === 'error' ? (
              <>
                <AlertCircle className="h-6 w-6 text-red-500" />
                Something went wrong
              </>
            ) : (
              <>
                <AlertCircle className="h-6 w-6 text-gray-500" />
                404 - Page Not Found
              </>
            )}
          </CardTitle>
          {type === 'not-found' && (
            <p className="text-center text-gray-600 mt-2 dark:text-gray-400">
              The page you&apos;re looking for doesn&apos;t exist or has been moved
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {type === 'error' && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error Details</AlertTitle>
              <AlertDescription className="mt-2">
                {error?.message || 'An unexpected error occurred'}
                {error?.digest && (
                  <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
                    Error ID: {error.digest}
                  </p>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              {type === 'error'
                ? "Don't worry - your data and settings are safe. You can try:"
                : "You might want to:"}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              {type === 'error' ? (
                <>
                  <li>Refreshing the page</li>
                  <li>Clearing your browser cache</li>
                  <li>Checking your internet connection</li>
                </>
              ) : (
                <>
                  <li>
                    <Button
                      variant="link"
                      className="text-blue-600 dark:text-blue-400"
                      onClick={() => window.history.back()}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Go back to the previous page
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="link"
                      className="text-blue-600 dark:text-blue-400"
                      onClick={() => (window.location.href = '/dashboard')}
                    >
                      Visit your dashboard
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="link"
                      className="text-blue-600 dark:text-blue-400"
                      onClick={() => (window.location.href = '/security')}
                    >
                      Check your security settings
                    </Button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4 justify-center">
          {type === 'error' && reset && (
            <Button onClick={reset} variant="primary">
              Try Again
            </Button>
          )}
          <Button
            variant={type === 'error' ? 'outline' : 'primary'}
            onClick={() => (window.location.href = '/')}
          >
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}