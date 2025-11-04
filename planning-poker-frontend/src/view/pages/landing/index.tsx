import {Card,Box,Typography,Button,TextField,InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";
//**********page import **********//
import Indexoptions from "../Create Room Options/indexOptions.tsx";
import CreateRoom from "../createRoom";




const LandingPage=()=>{
    const [values,setValues]=useState("");
    const [open, setOpen]=useState(false);
    const [openCreate,setopenCreate]=useState(false);
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
               <Typography fontSize={'100px'} color={'white'} fontWeight={'bolder'} sx={{fontSize:{xs:70,sm:100}}}>Planning poKer</Typography>
           </Box>
           <Box sx={{
               display:"flex",
               justifyContent:'center',
               mt:'45px',
           }}>
                <Box sx={{
                    pl:5,
                    pr:5,
                    pt:1,
                    pb:1,
                    backgroundColor:'#6E8CFB',
                    borderRadius:'9px',
                    display: 'flex',
                    flexDirection:{xs:'column',sm:'row'},
                    alignItems: 'center',
                    justifyContent:'space-between',
                    gap: {xs:0,sm:5},
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
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),
                            },
                        }}
                        sx={{
                            m: 1,
                            borderRadius: '25px',
                            backgroundColor: '#D9D9D9',
                            width: {xs:'100%',sm:'650px'},
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderRadius: '25px' },
                            },
                        }}
                    />
                    <Button variant={'text'} disabled={!values.trim()} sx={{color:'white',fontWeight:'bold'}}>join</Button>
                </Box>
           </Box>
           <Indexoptions open={open} onClose={()=>setOpen(false)} onOpenCreate={()=> {
               setOpen(false);
               setopenCreate(true);
           }}/>
           <CreateRoom open={openCreate} onClose={()=>setopenCreate(false)}/>
       </Card>
   )

}

export default LandingPage;