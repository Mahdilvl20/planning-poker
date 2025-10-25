
import {Box} from "@mui/material"
// @ts-ignore
function ResultModal({open,onClose,resultText}) {
    if(!open) return null;
    return (
        <Box sx={{
            position:'fixed',
            top:0,
            left:0,
            width:"100vw",
            height:"100vh",
            background:'rgba(0, 0, 0, 0.3)',
            backdropFilter:'blur(15px)',
            webkitBackdropFilter:'blur(15px)',
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <Box sx={{
                background:'white',
                p:5,
                width:'20%',
                display:'flex',
                justifyContent:'center',
                borderRadius:5,
            }}>
            <h2>Result</h2>
            <p>{resultText}</p>
            <button onClick={onClose}>Close</button>
            </Box>
        </Box>
    )
}
export default ResultModal;