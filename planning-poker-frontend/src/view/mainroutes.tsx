import { lazy} from "react";
import {createBrowserRouter} from "react-router-dom";
import Loader from "./pages/Loader/loader";
import MainLayout from "./pages/MainLayout";



const LandingPage = lazy(() => import("./pages/landing/index.tsx"));
const CreateRoom=lazy(()=>import("./pages/createRoom/index.tsx"));

const mainRoutes =createBrowserRouter ([
    {
        path: "/",
        element: (
            <Loader>
                <MainLayout/>
            </Loader>
        ),
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
                index:false,
                path:'/tt',
                element:(
                    <Loader>
                        <CreateRoom/>
                    </Loader>
                )
            },
        ]
    }
]);
export default mainRoutes;

