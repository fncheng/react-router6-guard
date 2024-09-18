import { useEffect, useState } from "react";
import { useNumber } from "./useNumber";
import { LoadingOutlined } from "@ant-design/icons";
import { useAbortRequest } from "@/hooks/useAbortController";

const About1: React.FC = () => {
    // const abortController = new AbortController();
    // const { signal } = abortController;

    // const { signal } = useAbortController();

    const { data: number, error, loading, run } = useAbortRequest(useNumber);
    console.log("data: ", number, loading, error);

    // const getNumber = async () => {
    //     const number = await useNumber(signal);
    //     setNumber(number);
    // };

    useEffect(() => {
        // getNumber();

        const abort = run();
        return () => {
            abort();
        };
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
