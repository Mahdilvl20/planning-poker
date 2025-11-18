import {Box, Drawer, ListItem, ListItemText, Tab, Tabs} from "@mui/material";
import {useEffect, useState} from "react";
import {getSocket} from "../../socket";
import Chat from '../chat'

export default function DesktopDrawer({open,onClose}:{open:any,onClose:any}){
    const [tab, setTab] = useState(0);
    const [members, setMembers] = useState([]);
    useEffect(() => {
        if (!open) return;
        const socket = getSocket();
        const handleroomUsers=(users:string[])=>{

            // @ts-ignore
            setMembers(users);
        }
        socket?.on("roomUsers",handleroomUsers);
        return () => {
            socket?.off("roomUsers",handleroomUsers);
        }
    }, [open]);



    return(
        <Drawer variant={'persistent'} open={open} anchor={'right'} onClose={onClose} PaperProps={{sx:{
                height:'70vh',
                top:80,
                right:20,
                bottom:0,
                borderRadius:'25px',
                display:'flex',
                flexDirection:'column',
                p:2
            }}} >
            <Tabs value={tab} onChange={(_,v)=>setTab(v)}>
                <Tab label={'members'} />
                <Tab label={'chat'}/>
            </Tabs>
            <Box sx={{ flex: 1, overflowY: "auto" }}>
                {tab===0 && members.map((name,index)=>(
                    <ListItem key={index} component={'div'} >
                        <ListItemText primary={name}/>
                    </ListItem>
                ))}
                {tab===1 && <Chat roomId={localStorage.getItem('roomLink')||''} />}
            </Box>
        </Drawer>
    )
}