import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Loading } from "@/utils/Loading";

interface UserData {
    number: boolean;
    name: string;
}

const About: React.FC = () => {
    const userLoaderData = useLoaderData() as UserData;
    console.log("userLoaderData: ", userLoaderData);

    console.log("render");

    return (
        <main>
            <h1>Let's loading some data</h1>
            <Suspense fallback={<Loading />}>
                <Await resolve={userLoaderData.number}>
                    {(data) => {
                        console.log("render number");
                        return (
                            <div style={{ color: "red" }}>
                                <h3>Number: {data}</h3>
                            </div>
                        );
                    }}
                </Await>
            </Suspense>
            <Suspense fallback={<Loading />}>
                <Await resolve={userLoaderData.name}>
                    {(data) => {
                        console.log("render name");
                        return (
                            <div style={{ color: "red" }}>
                                <h3>Name: {data}</h3>
                            </div>
                        );
                    }}
                </Await>
            </Suspense>
        </main>
    );
};

export default About;
