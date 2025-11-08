import { lazy} from "react";
import {createBrowserRouter} from "react-router-dom";
import Loader from "./pages/Loader/loader";
import MainLayout from "./pages/MainLayout";
import Withoutheader from "./pages/header/withoutheader.tsx";


const LoginPage =lazy(()=>import('./pages/Login'))
const SignUpPage = lazy(() => import("./pages/SignUp"));
const LandingPage = lazy(() => import("./pages/landing/index.tsx"));
// @ts-ignore
const Room=lazy(()=>import("./pages/room/index.tsx"));
const NotFound=lazy(()=>import('./pages/not found'))
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
              path:'/signup',
              element: (
                  <Loader>
                      <SignUpPage/>
                  </Loader>
              )
            },
            {
                path:'/login',
                element: (
                    <Loader>
                        <LoginPage/>
                    </Loader>
                )
            },
            {
                path:'*',
                element: (
                    <Loader>
                        <NotFound/>
                    </Loader>
                )
            }
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
    },

]);
export default mainRoutes;

