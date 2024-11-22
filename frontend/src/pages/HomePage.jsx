import React from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center">Home Page</h1>
            {!isAuthenticated && <LoginButton />}
        </div>
    );
};

export default HomePage;
