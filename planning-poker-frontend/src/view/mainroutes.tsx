import { lazy} from "react";
import {createBrowserRouter} from "react-router-dom";
import Loader from "./pages/Loader/loader";
import MainLayout from "./pages/MainLayout";



const LandingPage = lazy(() => import("./pages/landing/index.tsx"));


const mainRoutes =createBrowserRouter ([
    {
        path: "/",
        element: <MainLayout />,
        children:[
            {
                index:true,
                element:(
                    <Loader>
                    <LandingPage/>
                    </Loader>
                )
            },
            {
                path:'/tt',
                element:(
                    <Loader>
                        <LandingPage/>
                    </Loader>
                )
            },
        ]
    }
]);
export default mainRoutes;

