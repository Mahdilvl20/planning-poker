
import {Box, Chip, Typography,Alert,Snackbar,Button} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {useEffect, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {createRoom} from "../../../api/api.ts";

function CreateRoom({open,onClose}:{open:boolean,onClose:()=>void}){
    if (!open) return null;
    const [openS,setopenS]=useState(false);
    const [name,setName]=useState("test");
    const [roomLink,setRoomLink]=useState("");
    const handleGetRoomLink= async ()=>{
        try {
            const res=await createRoom(name);
            setRoomLink(res.data.link);
            localStorage.setItem('roomLink',res.data.slug);
            localStorage.setItem('isRoomOwner','true');
        }catch (err:any){
            console.log(err.response.data.message);
        }
    }
    const handleChipClick=()=>{
        navigator.clipboard.writeText(roomLink);
        setopenS(true);
    }
    useEffect(()=>{
        handleGetRoomLink();
    },[]);
    return(
        <Box sx={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }} onClick={onClose}>
            <Snackbar open={openS} autoHideDuration={2000} onClose={()=>setopenS(false)} anchorOrigin={{vertical:'top',horizontal:'center'}}>
                <Alert severity={'success'}>your link room successfully copy</Alert>
            </Snackbar>
            <Box sx={{
                position: 'relative',
                backgroundColor: 'white',
                width: {xs:'50%',sm:'20%'},
                borderRadius: 2,
                boxShadow: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems:'center',
                p:2,
            }}
                onClick={(e)=>e.stopPropagation()}>
                <Button variant={'outlined'} onClick={onClose} sx={{
                    display:{xs:'none',md:'flex'},
                    position:"absolute",
                    top:8,
                    right:8,
                    minWidth:'auto',
                    p:'4px',
                }}>
                    <CloseIcon/>
                </Button>

                <Typography sx={{fontWeight:'bolder',mt:3}}>your room link</Typography>
                <Chip label={roomLink} onClick={handleChipClick} icon={<ContentCopyIcon/>} sx={{p:2,m:2}} >

                </Chip>


            </Box>

        </Box>
    )
}
export default CreateRoom;