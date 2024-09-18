import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { GlobalProvider } from "./utils/GlobalContext";
import { Suspense } from "react";
import { Loading } from "./utils/Loading";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <GlobalProvider>
        <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
        </Suspense>
    </GlobalProvider>
);
