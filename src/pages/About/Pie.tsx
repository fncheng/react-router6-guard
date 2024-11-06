import * as echarts from "echarts";
import { useEffect, useRef } from "react";

interface PieChartProps {
    data: any[] | undefined;
}

var chart: echarts.ECharts;

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const node = useRef<HTMLDivElement>(null);
    const option: echarts.EChartsOption = {
        tooltip: {
            trigger: "item",
        },
        legend: {
            top: "5%",
            left: "center",
        },
        series: [
            {
                name: "Access From",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: "center",
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: "bold",
                    },
                },
                labelLine: {
                    show: false,
                },
                data,
            },
        ],
    };

    useEffect(() => {
        chart = echarts.init(node.current);
        const listener = () => {
            chart.resize();
        };

        window.addEventListener("resize", listener);
        return () => {
            chart.dispose();
            window.removeEventListener("resize", listener);
        };
    }, []);
    useEffect(() => {
        if (data) {
            chart.setOption(option);
        }
    }, [data]);

    return <div style={{ width: "100%", height: "100%" }} ref={node}></div>;
};

export default PieChart;
