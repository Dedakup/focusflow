import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // Base alias for the `src` directory
            '@app': path.resolve(__dirname, 'src/app'), // Alias for `app` directory
            '@components': path.resolve(__dirname, 'src/components'), // Alias for `components`
            '@features': path.resolve(__dirname, 'src/features'), // Alias for `features`
            '@auth': path.resolve(__dirname, 'src/features/auth'), // Alias for `auth` in `features`
            '@background': path.resolve(__dirname, 'src/features/background'), // Alias for `background`
            '@dashboard': path.resolve(__dirname, 'src/features/dashboard'), // Alias for `dashboard`
            '@music': path.resolve(__dirname, 'src/features/music'), // Alias for `music`
            '@pomodoro': path.resolve(__dirname, 'src/features/pomodoro'), // Alias for `pomodoro`
            '@sounds': path.resolve(__dirname, 'src/features/sounds'), // Alias for `sounds`
            '@tasks': path.resolve(__dirname, 'src/features/tasks'), // Alias for `tasks`
            '@shared': path.resolve(__dirname, 'src/shared'), // Alias for `shared`
            '@config': path.resolve(__dirname, 'src/shared/config'), // Alias for `config` in `shared`
            '@hooks': path.resolve(__dirname, 'src/shared/hooks'), // Alias for `hooks` in `shared`
            '@utils': path.resolve(__dirname, 'src/shared/utils'), // Alias for `utils` in `shared`
            '@styles': path.resolve(__dirname, 'src/styles'), // Alias for `styles`
        },
    },
});
