import {Box,TextField,Typography,Button,Divider,Chip} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {login} from "../../../api/api.ts";


export default function Login(){
    const Navigate= useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleSignIn=async ()=>{
        try {
            const res= await login(email,password)
            console.log("success",res.data)
        }catch(err){
            console.log("error",err)
        }
    }
    const handleOnSignUpClick = ()=>{
        Navigate('/signup');
        window.location.reload();
    }
    const handleMainPageClick = ()=>{
        Navigate('/');
        window.location.reload();
    }
    return (
        <Box sx={{
            position: 'fixed',
            display:'flex',
            width:'100%',
            mt:{xs:15,sm:25},
            alignItems:'center',
            justifyContent:'center',
        }}>
            <Box sx={{
                width: '400px',
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                gap:2,
                p:4,
                backgroundColor: '#636CCB',
                borderRadius:'20px',

            }}>
                <Typography variant={'h3'}>Login</Typography>

                <TextField
                    variant="outlined"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    fullWidth
                    sx={{
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderRadius: '25px' },
                            '&.Mui-focused fieldset': { borderColor: 'white' },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'white',
                        },
                    }}
                />
                <TextField
                    variant="outlined"
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    sx={{
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderRadius: '25px' },
                            '&.Mui-focused fieldset': { borderColor: 'white' },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'white',
                        },
                    }}
                />
                <Button variant={'outlined'} sx={{
                    color:'black',
                    borderColor:'black',
                }} onClick={handleSignIn}>
                    Login
                </Button>
                <Divider sx={{width: '100%'}}>
                    You dont have an Account? {<Chip label={'Sign Up'} onClick={handleOnSignUpClick} sx={{backgroundColor:'white'}}/>}
                </Divider>
                <Chip variant={'outlined'} label={'Main Page'} onClick={handleMainPageClick}/>
            </Box>
        </Box>
    )
}