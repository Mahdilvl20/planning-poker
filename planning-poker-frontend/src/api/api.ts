import axios from "axios";


const api= axios.create({
    baseURL:'http://localhost:3000',
});

api.interceptors.request.use((config)=>{
    const token=localStorage.getItem('access_token');
    if (token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('name');
            window.dispatchEvent(new Event('localStorageChange'));
            if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export const register=(name:string,email:string,password:string) => {
   return  api.post('/auth/register',{name,email,password});
}
export const login=(email:string,password:string) => {
   return  api.post('/auth/login',{email,password});
}
export const me=()=>{
   return  api.get('/auth/me');
}
export const createRoom=(name:string)=>{
   return  api.post('rooms',{name})
}
export const searchRoom=(link:string)=>{
    return  api.post('rooms/findroom',{link})
}
