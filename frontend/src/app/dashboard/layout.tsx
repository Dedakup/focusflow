'use client';

import { ProtectedRoute } from '@auth';
import { BottomMenu } from '@dashboard';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ProtectedRoute>
                {children}
                <BottomMenu />
            </ProtectedRoute>
        </>
    );
}
