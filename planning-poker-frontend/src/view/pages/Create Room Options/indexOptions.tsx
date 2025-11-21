import {Alert, Box, Button, Snackbar} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {createRoom} from "../../../api/api.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Indexoptions({open,onClose,onOpenCreate}:{open:boolean,onClose:()=>void,onOpenCreate:()=>void  }) {
    if (!open) return null;
    const navigate = useNavigate();
    const [roomLink,setRoomLink]=useState();
    const [roomCreateAlert,setRoomCreateAlert]=useState(false);
    const handleCreateRoom=async ()=>{
        try {
            const res = await createRoom("test");
            localStorage.setItem('roomLink',res.data.slug);
            localStorage.setItem('isRoomOwner','true');
            setRoomLink(res.data.slug);
            setRoomCreateAlert(true);
        }
        catch(err){
            console.log(err);
        }
    }
    const handleOpenRoom=()=>{
        if(roomLink){
            navigate(`/room/${roomLink}`);
        }
        setRoomCreateAlert(false);
    }
    return (
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

            <Box sx={{
                position: 'relative',
                backgroundColor: 'white',
                width: {xs:'50%',sm:'20%'},
                borderRadius: 2,
                boxShadow: 4,
                display: 'flex',
                flexDirection: 'column',
            }} onClick={(e)=>e.stopPropagation()}>

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

                    <Button variant={'contained'} sx={{mt:{xs:2,md:6},borderRadius:'0px',backgroundColor:'transparent',color:'black',boxShadow:'none','&:hover':{
                        fontWeight:'bold',
                        }}} onClick={handleCreateRoom}>Create and Enter the room</Button>
                    <Button variant={'contained'} sx={{mb:2,borderRadius:'0px',backgroundColor:'transparent',color:'black',boxShadow:'none','&:hover':{
                        fontWeight:'bold',
                        }}}
                            onClick={onOpenCreate}>
                        Create Room link
                    </Button>

            </Box>
            <Snackbar
                open={roomCreateAlert}
                autoHideDuration={4000}
                onClose={handleOpenRoom}
                anchorOrigin={{vertical:'top',horizontal:'center'}}
            >
                <Alert severity={'success'}>room created wait 5 second</Alert>
            </Snackbar>
        </Box>
    )
}
export default Indexoptions