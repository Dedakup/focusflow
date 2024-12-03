import '@styles/globals.css';
import { ClientLayout } from '@components';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
