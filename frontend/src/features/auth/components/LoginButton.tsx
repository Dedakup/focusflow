import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { setAuth } from '@auth';

const LoginButton = () => {
    const { loginWithRedirect, getAccessTokenSilently, user } = useAuth0();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        await loginWithRedirect(); // Redirect to Auth0 login
        const token = await getAccessTokenSilently(); // Retrieve token

        // Dispatch user and token to Redux
        dispatch(setAuth({ user, token }));
    };

    return (
        <button
            className="text-white px-4 py-2 rounded-md"
            onClick={handleLogin}
        >
            Login
        </button>
    );
};

export default LoginButton;
