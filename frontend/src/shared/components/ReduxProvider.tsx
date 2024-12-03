'use client';

import { Provider } from 'react-redux';
import { store } from 'src/shared/store/store';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
