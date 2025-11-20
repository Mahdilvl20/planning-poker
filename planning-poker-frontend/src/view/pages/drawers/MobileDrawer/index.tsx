
import {Box, ListItem, ListItemText, SwipeableDrawer, Tab, Tabs} from "@mui/material";
import {useEffect, useState} from "react";
import {getSocket} from "../../socket";
import Chat from "../chat";

export default function MobileDrawer({open,onClose}:{open:any,onClose:any}){
    const [tab, setTab] = useState(0);
    const [members, setMembers] = useState([]);
    useEffect(() => {
        if (!open) return;
        const socket = getSocket();
        const handleroomUsers=(users:string[])=>{
            console.log("Received roomUsers:", users);
            // @ts-ignore
            setMembers(users);
        }
        socket?.on("roomUsers",handleroomUsers);
        return () => {
            socket?.off("roomUsers",handleroomUsers);
        }
    }, [open]);


    return(
        <SwipeableDrawer variant={'persistent'} anchor={'bottom'} open={open}
                         onClose={onClose} PaperProps={{
            sx: {
                display: "flex",
                flexDirection: "column",
                height:'50vh'
            }
        }} onOpen={function (): void {
            throw new Error("Function not implemented.");
        }}>
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
        </SwipeableDrawer>
    )
}