import {Box,Button} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function Indexoptions({open,onClose}:{open:boolean,onClose:()=>void}) {
    if (!open) return null;

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
                        }}} > test</Button>
                    <Button variant={'contained'} sx={{mb:2,borderRadius:'0px',backgroundColor:'transparent',color:'black',boxShadow:'none','&:hover':{
                        fontWeight:'bold',
                        }}}> test</Button>

            </Box>
        </Box>
    )
}
export default Indexoptions