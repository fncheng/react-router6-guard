import { GlobalContext } from "@/utils/GlobalContext"
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
    const { isLogin, setLogin } = useContext(GlobalContext);
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
