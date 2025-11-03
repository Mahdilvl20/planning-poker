
import {Box} from "@mui/material";

function CreateRoom({open,onClose}:{open:boolean,onClose:()=>void}){
    if (!open) return null;
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
            <Box onClick={(e)=>e.stopPropagation()}>

            </Box>
        </Box>
    )
}
export default CreateRoom;