import {Outlet} from "react-router-dom";
import Header from "./header";
import {useEffect} from "react";
import {me} from "../../api/api.ts";



const MainLayout=()=>{
    useEffect(() => {
        // بررسی اعتبار توکن هنگام بارگذاری صفحه
        const token = localStorage.getItem('access_token');
        if (token) {
            me()
                .then((response) => {
                    // توکن معتبر است
                    if (response.data.user && response.data.user.name) {
                        // به‌روزرسانی نام در صورت نیاز
                        localStorage.setItem('name', response.data.user.name);
                    }
                })
                .catch((error) => {
                    // توکن نامعتبر است - interceptor خودش localStorage را پاک می‌کند
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