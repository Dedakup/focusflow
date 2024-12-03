import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { logout } from '@auth';
import { useDispatch } from 'react-redux';

const LogoutButton = () => {
    const { logout: auth0Logout } = useAuth0();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()); // Clear Redux state
        auth0Logout({ logoutParams: { returnTo: window.location.origin } }); // Redirect to home
    };

    return (
        <button
            className="text-white px-4 py-2 rounded-md"
            onClick={handleLogout}
        >
            Log Out
        </button>
    );
};

export default LogoutButton;
