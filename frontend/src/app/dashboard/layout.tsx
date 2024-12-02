'use client';

import BottomMenu from '@dashboard/components/BottomMenu';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <BottomMenu />
        </>
    );
}
