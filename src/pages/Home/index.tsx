import { useGlobalContext } from "@/utils/GlobalContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { setLogin } = useGlobalContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
        setLogin(false);
        localStorage.setItem("isLogin", JSON.stringify(false));
    };
    return (
        <div>
            <h3>Home</h3>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default Home;
