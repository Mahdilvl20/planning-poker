import {Card,Box,Typography,Button,TextField,InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import ButtonLog from "../../../example/components/Card.tsx"
import ResultModal from "../../../example/components/ResultModal.tsx"
import {useState} from "react";

const LandingPage=()=>{
    const [values,setValues]=useState("");
    const [open, setOpen]=useState(false);
    return (
       <Card sx={{
           backgroundColor:'transparent',
           border:'none',
           boxShadow:'none',
       }}>
           <Box sx={{
               mt:'45px',
               display: 'flex',
               justifyContent:'center',
           }}>
               <Typography variant="h5" fontSize={'100px'} color={'white'} fontWeight={'bolder'}>Planning poKer</Typography>
           </Box>
           <Box sx={{

               display:"flex",
               justifyContent:'center',
               mt:'45px',
           }}>
                <Box sx={{
                    pl:5,
                    pr:5,
                    backgroundColor:'#6E8CFB',
                    borderRadius:'9px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:'space-between',
                    gap:5,
                }}>
                <Button variant={'contained'} onClick={()=>setOpen(true)} sx={{fontWeight:'bold',borderRadius:'25px',m:1}}>Create Room</Button>
                    <TextField
                        variant="outlined"
                        placeholder="enter room code"
                        value={values}
                        onChange={(e)=>setValues(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        sx={{
                            m: 1,
                            borderRadius: '25px',
                            backgroundColor: '#D9D9D9',
                            width: '650px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderRadius: '25px' },
                            },
                        }}
                    />
                    <Button variant={'text'} disabled={!values.trim()} sx={{color:'white',fontWeight:'bold'}}>join</Button>
                </Box>
           </Box>
           <ResultModal open={open} onClose={()=>setOpen(false)} resultText={"test"}/>
       </Card>
   )

}

export default LandingPage;