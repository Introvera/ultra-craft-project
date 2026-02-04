'use client';

import { HeroUIProvider } from '@heroui/react';
import { ReactNode, useEffect } from 'react';

/**
 * Handles version mismatch errors that occur when cached client JS
 * tries to call Server Actions from an older deployment.
 * Auto-refreshes the page to get the latest version.
 */
function useServerActionErrorHandler() {
    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            const message = event.message || '';
            if (message.includes('Failed to find Server Action')) {
                // Prevent the error from showing in console
                event.preventDefault();
                // Reload to get fresh JS bundle
                window.location.reload();
            }
        };

        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            const message = event.reason?.message || event.reason?.toString() || '';
            if (message.includes('Failed to find Server Action')) {
                event.preventDefault();
                window.location.reload();
            }
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);
}

export function Providers({ children }: { children: ReactNode }) {
    // Auto-refresh on Server Action version mismatch
    useServerActionErrorHandler();

    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    );
}