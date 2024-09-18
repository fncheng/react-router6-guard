import { Suspense, useEffect } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Loading from "../Loading";

interface UserData {
    number: number;
    name: string;
}

const About: React.FC = () => {
    const userLoaderData = useLoaderData() as UserData;
    console.log("userLoaderData: ", userLoaderData);

    console.log("render");

    useEffect(() => {
        const timestamp = performance.now();
        console.log(timestamp);
    }, []);

    return (
        <main>
            <h1>Let's loading some data</h1>
            <section>
                <Suspense fallback={<Loading />}>
                    <Await resolve={userLoaderData.name}>
                        {(name) => {
                            console.log("render name", name);
                            return (
                                <Await resolve={userLoaderData.number}>
                                    {(number) => {
                                        console.log("render number", number);
                                        return (
                                            <div style={{ color: "red" }}>
                                                <h3>
                                                    About: {name} - {number}
                                                </h3>
                                            </div>
                                        );
                                    }}
                                </Await>
                            );
                        }}
                    </Await>
                </Suspense>
            </section>
            <section>
                <Suspense fallback={<Loading />}>
                    <Await resolve={userLoaderData.name}>
                        {(name) => {
                            console.log("render number", name);
                            return (
                                <div style={{ color: "red" }}>
                                    <h3>
                                        About: {name} - {name}
                                    </h3>
                                </div>
                            );
                        }}
                    </Await>
                </Suspense>
            </section>
        </main>
    );
};

export default About;
