import { lazy} from "react";
import {createBrowserRouter} from "react-router-dom";
import Loader from "./pages/Loader/loader";
import MainLayout from "./pages/MainLayout";
import Withoutheader from "./pages/header/withoutheader.tsx";


const LandingPage = lazy(() => import("./pages/landing/index.tsx"));
// @ts-ignore
const Room=lazy(()=>import("./pages/room/index.tsx"));
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
        ]
    },
    {
      path:'/room',
        element:(
            <Loader>
                <Withoutheader/>
            </Loader>
        ),
        children:[
            {
                index: true,
                element: (
                    <Loader>
                        <Room/>
                    </Loader>
                )
            }
        ]
    }
]);
export default mainRoutes;

