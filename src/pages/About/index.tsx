import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

interface UserData {
    number: boolean;
}

const About: React.FC = () => {
    const userLoaderData = useLoaderData() as UserData;
    console.log("userLoaderData: ", userLoaderData);

    console.log("render");

    return (
        <main>
            <h1>Let's loading some data</h1>
            <Suspense fallback={<LoadingOutlined />}>
                <Await resolve={userLoaderData.number}>
                    {(data) => {
                        console.log("render data");
                        return (
                            <div style={{ color: "red" }}>
                                <h3>About: {data}</h3>
                            </div>
                        );
                    }}
                </Await>
            </Suspense>
        </main>
    );
};

export default About;
