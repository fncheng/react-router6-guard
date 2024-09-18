import { useEffect, useState } from "react";
import { useNumber } from "./useNumber";
import { LoadingOutlined } from "@ant-design/icons";
import { useName } from "./useName";
import Loading from "../Loading";

const About1: React.FC = () => {
    const [number, setNumber] = useState(0);
    const [name, setName] = useState<string>("");

    const getNumber = async () => {
        const number = await useNumber();
        setNumber(number);
    };
    const getName = async () => {
        const name = await useName();
        setName(name);
    };

    useEffect(() => {
        getNumber();
        getName();
    }, []);

    console.log("render");
    return (
        <main>
            <h1>Let's loading some data</h1>
            <div>
                {number ? (
                    <div style={{ color: "red" }}>
                        Here is the number: {name} {number}
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
            <div>{name ? <div>Here is the name: {name}</div> : <Loading />}</div>
        </main>
    );
};

export default About1;
