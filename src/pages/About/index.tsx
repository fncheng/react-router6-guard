import { Suspense, useEffect } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { Loading } from "@/utils/Loading";

interface UserData {
    number: boolean;
    name: string;
    abortController: AbortController;
}

const About: React.FC = () => {
    const { number, name, abortController } = useLoaderData() as UserData;

    useEffect(()=>{
        return ()=>{
            abortController.abort();
        }
    },[])


    console.log("render");

    return (
        <main>
            <h1>Let's loading some data</h1>
            <Suspense fallback={<Loading />}>
                <Await resolve={number}>
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
                <Await resolve={name}>
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
