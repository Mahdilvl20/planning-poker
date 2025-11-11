import {Box, TextField, Typography, Button, Divider, Chip, Snackbar, Alert} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {register} from "../../../api/api.ts";
import {useState} from "react";


export default function SignUpPage(){
    const Navigate= useNavigate();
    const [signUpFailed, setSignUpFailed] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [result,setResult]=useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignUp = async ()=>{
        try {
            const res=await register(name,email,password)
            console.log(res.data)
            setSignUpSuccess(true);
        }catch(err:any){
            const msg=err.response?.data?.message;
            setResult(msg)
            setSignUpFailed(true);
        }
    }
    const handleSignUpFailed=()=>{
        setSignUpFailed(false);
    }
    const handleSignUpSuccess=()=>{

        setSignUpSuccess(false);
    }
    const handleOnLoginClick = ()=>{
        Navigate('/login');
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
                <Typography variant={'h3'}>Sign Up</Typography>
                <TextField
                    variant="outlined"
                    label="Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={event => setName(event.target.value)}
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
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={event => setEmail(event.target.value)}
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
                    onChange={event => setPassword(event.target.value)}
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
                }} onClick={handleSignUp}>
                    Create Account
                </Button>
                <Divider sx={{width: '100%'}}>
                    Do you have a account ? {<Chip label={'Login'} onClick={handleOnLoginClick} sx={{backgroundColor:'white'}}/>}
                </Divider>
                <Chip variant={'outlined'} label={'Main Page'} onClick={handleMainPageClick}/>
            </Box>
            <Snackbar
                open={signUpSuccess}
                autoHideDuration={2000}
                onClose={handleSignUpSuccess}
                anchorOrigin={{vertical:'top',horizontal:'center'}}
            >
                <Alert severity={'success'}>You are successfully signUp </Alert>
            </Snackbar>
            <Snackbar
                open={signUpFailed}
                autoHideDuration={2000}
                onClose={handleSignUpFailed}
                anchorOrigin={{vertical:'top',horizontal:'center'}}
            >
                <Alert severity={'error'}>{result}</Alert>
            </Snackbar>
        </Box>
    )
}