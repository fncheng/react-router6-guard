import { useEffect, useState } from "react";
import { useNumber } from "./useNumber";
import { LoadingOutlined } from "@ant-design/icons";
import { useAbortRequest } from "@/hooks/useAbortController";
import PieChart from "./Pie";
import { useFetchPieData } from "./useFetchPieData";

const About1: React.FC = () => {
    const [pieData, setPieData] = useState<any[]>([]);

    const { data: number, error, loading, run } = useAbortRequest(useNumber);
    console.log("data: ", number, loading, error);

    const fetchPieData = async () => {
        setPieData(await useFetchPieData());
    };

    useEffect(() => {
        fetchPieData();
    }, []);

    useEffect(() => {
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
            <PieChart data={pieData} />
        </main>
    );
};

export default About1;
