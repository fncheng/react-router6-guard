import { useEffect, useState } from "react";
import { useNumber } from "./useNumber";
import { LoadingOutlined } from "@ant-design/icons";

const About1: React.FC = () => {
    const [number, setNumber] = useState(0);

    const abortController = new AbortController();
    const { signal } = abortController;

    const getNumber = async () => {
        const number = await useNumber(signal);
        setNumber(number);
    };

    useEffect(() => {
        getNumber();
        return () => abortController.abort()
    }, []);

    console.log("render");
    return (
        <main>
            <h1>Let's loading some data</h1>
            {number ? (
                <div style={{ color: "red" }}>Here is the number: {number}</div>
            ) : (
                <LoadingOutlined />
            )}
        </main>
    );
};

export default About1;
