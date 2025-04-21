import React from "react";
import Register from "../Register";
import { useNavigate } from "react-router-dom";

const RegisterWrapper = () => {
    const navigate = useNavigate();

    return (
        <>
            <Register onRegisterSuccess={() => navigate("/tasks")} />
        </>
    );
};

export default RegisterWrapper;
