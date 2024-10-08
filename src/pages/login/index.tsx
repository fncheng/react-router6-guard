import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { globalContext } from "../../App";

export default () => {
    const { isLogin, setLogin } = useContext(globalContext);
    console.log("isLogin: ", isLogin);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) navigate("/");
    }, []);
    const handleLogin = () => {
        alert("login");
        setLogin(true);
        localStorage.setItem("isLogin", JSON.stringify(true));
        navigate("/");
    };
    return <button onClick={handleLogin}>login</button>;
};
