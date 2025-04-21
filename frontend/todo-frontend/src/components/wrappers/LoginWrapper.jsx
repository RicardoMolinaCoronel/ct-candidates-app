import React from "react";
import Login from "../Login";
import { useNavigate } from "react-router-dom";

const LoginWrapper = () => {
    const navigate = useNavigate();

    return (
        <>
            <Login onLoginSuccess={() => navigate("/tasks")} />
        </>
    );
};

export default LoginWrapper;
