import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <button
            className="text-white px-4 py-2 rounded-md"
            onClick={() => loginWithRedirect()}
        >
            Log In
        </button>
    );
};

export default LoginButton;
