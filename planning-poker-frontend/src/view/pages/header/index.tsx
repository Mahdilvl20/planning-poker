import {Box, Typography, Card, Chip, Avatar, useMediaQuery} from "@mui/material"
import LOGO from "../../../assets/LOGO.png";
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {me} from "../../../api/api.ts";


const Header=()=>{
    const isMobile = useMediaQuery("(max-width:600px)");
    const Navigate=useNavigate();
    const [Login,setLogin]=useState(false);

    useEffect(()=>{
        const checkAuth = async () => {
            const token=localStorage.getItem('access_token');
            if (!token) {
                setLogin(true);
                return;
            }
            
            try {
                const response = await me();
                if (response.data.valid && response.data.user) {
                    if (response.data.user.name) {
                        localStorage.setItem('name', response.data.user.name);
                    }
                    setLogin(false);
                } else {
                    setLogin(true);
                }
            } catch (error) {
                setLogin(true);
            }
        };
        
        checkAuth();
        
        const handleStorageChange = () => {
            checkAuth();
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        const handleCustomStorageChange = () => {
            checkAuth();
        };
        
        window.addEventListener('localStorageChange', handleCustomStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('localStorageChange', handleCustomStorageChange);
        };
    }, [])
    const handleOnLogoClick=()=>{
        Navigate('/');
        window.location.reload();
    }
    const handleOnSignInClick=()=>{
        Navigate('/login');
        window.location.reload();
    }
    const handleOnSignOutClick=()=>{
        localStorage.clear();
        window.dispatchEvent(new Event('localStorageChange'));
        setLogin(false);
        window.location.reload();
    }
    return(

            <Card sx={{
                display:'flex',
                justifyContent: {md:'space-between',xs:'center'},
                backgroundColor:'#50589C',
                borderBottomRightRadius:'10px',
                alignItems: 'center',
                position:'relative',
                width:'100%',
            }}>
                <Box sx={{
                        height:'9vh',
                }}>
                <Avatar src={LOGO} sx={{height:'10vh',ml:{sm:5}}} alt={'logo'} onClick={handleOnLogoClick}/>
                </Box>
                <Box sx={{
                    display:{xs:'rows',md:'flex'}
                }}>
                    <Typography component="h1" variant="h5">Planning poKer</Typography>
                </Box>
                <Box sx={{
                    m:2,
                    display:{md:'flex'},
                    alignItems: 'center',
                }}>
                    {Login? (
                    isMobile? (

                           <Chip label={<LoginIcon sx={{pt:0.5}}/>} sx={{
                               position:'absolute',
                               right:15,
                               top:18,
                           }} onClick={handleOnSignInClick}/>

                    ) : (
                        <Chip label={"login / signup"} avatar={<LoginIcon fontSize={'large'}/>} sx={{backgroundColor:'#3C467B',fontSize:17,fontWeight:'bolder'}} onClick={handleOnSignInClick}/>
                        )
                    ):(<Chip icon={<ExitToAppIcon fontSize={'medium'}/>} label={'LogOut'} color={'error'} onClick={handleOnSignOutClick}/>) }
                </Box>
            </Card>

    )
}
export default Header;