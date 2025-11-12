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

export const register=(name:string,email:string,password:string) => {
   return  api.post('/auth/register',{name,email,password});
}
export const login=(email:string,password:string) => {
   return  api.post('/auth/login',{email,password});
}
export const createRoom=(name:string)=>{
   return  api.post('rooms',{name})
}
export const searchRoom=(link:string)=>{
    return  api.post('rooms/findroom',{link})
}