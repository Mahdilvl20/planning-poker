import {Box, Chip} from "@mui/material";


export default function NumberPad({open,onClose}:{open:any,onClose:any}){
    if (!open) return null;
    const numbers=['?',1,2,3,5,8,13,21,34,55,89,'∞']
    const handletest=()=>{

    }
    return(
        <Box sx={{
            display:'flex',
            width:'100%',
            height:'100vh',
            alignItems:'center',
            justifyContent:'center',
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
        }}>
        <Box sx={{
            display:'flex',
            width:'300px',
            gap:2,
            p:2,
            flexWrap:'wrap',
            backgroundColor:'#636CCB',
            borderRadius:'20px'
        }}>
            {numbers.map((value,index)=>(
                <Chip key={index} variant={'outlined'} sx={{
                    fontSize:18,
                }} label={value} onClick={handletest} />
            ))}
            <Chip label={'Submit'} sx={{backgroundColor:'green',fontWeight:'bold'}} onClick={onClose}/>
        </Box>
        </Box>
    )
}