import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <div>HomePage</div>
            <Link to="/dashboard" className="text-blue-500 hover:text-blue-700">
                Go to Dashboard
            </Link>
        </div>
    );
};

export default HomePage;