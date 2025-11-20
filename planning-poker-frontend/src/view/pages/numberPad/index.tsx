import {Box, Chip} from "@mui/material";
import {useState} from "react";
import {getSocket} from "../socket";


export default function NumberPad({open,onClose}:{open:any,onClose:any}){
    if (!open) return null;
    const numbers=['?',1,2,3,5,8,13,21,34,55,89,'∞'];
    const [selectedindex,setSelectIndex]=useState<number|null>(null);

    //@ts-ignore
    const handleSubmit=()=>{
        if(selectedindex===null)return;
        const s=getSocket();
        const roomId=localStorage.getItem("roomLink");
        const selectedValue=numbers[selectedindex];
        if(s && roomId){
            s.emit('submit-vote',{
                roomId,
                vote:selectedValue,
            });
            onClose();
        }
    }
    return(
        <Box sx={{
            display:'flex',
            width:'100%',
            height:'100vh',
            alignItems:'center',
            justifyContent:'center',
            position:'fixed',
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
                <Chip key={index}
                      variant={selectedindex===index?'filled':'outlined'}
                      sx={{
                          fontSize: 18,
                          transition: 'all .2s',
                          boxShadow: selectedindex === index ? 3 : 'none',
                          transform: selectedindex === index ? 'translateY(-4px)' : 'none',
                          backgroundColor: selectedindex === index ? 'white' : 'default',
                }}
                      label={value}
                      //@ts-ignore
                      onClick={()=>setSelectIndex(index)} />
            ))}
            <Chip label={'Submit'} sx={{backgroundColor:'green',fontWeight:'bold'}} onClick={handleSubmit}/>
        </Box>
        </Box>
    )
}