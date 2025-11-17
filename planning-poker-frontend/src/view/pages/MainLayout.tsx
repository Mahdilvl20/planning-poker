import {Outlet} from "react-router-dom";
import Header from "./header";
import {useEffect} from "react";
import {me} from "../../api/api.ts";



const MainLayout=()=>{
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            me()
                .then((response) => {
                    if (response.data.user && response.data.user.name) {
                        localStorage.setItem('name', response.data.user.name);
                    }
                })
                .catch((error) => {
                    console.log('Token validation failed:', error);
                });
        }
    }, []);

    return (
        <div>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default MainLayout;