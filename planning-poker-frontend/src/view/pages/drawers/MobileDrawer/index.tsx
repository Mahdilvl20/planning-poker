
import {Box, ListItem, ListItemText, SwipeableDrawer, Tab, Tabs} from "@mui/material";
import {useState} from "react";

export default function MobileDrawer({open,onClose}:{open:any,onClose:any}){
    const [tab, setTab] = useState(0);

    const drawerlist = (
        <div>
            sssssssssss
        </div>
    );
    const members = [
        {key: 1, name: 'ali'},
        {key: 2, name: 'mahdi'},
        {key: 3, name: 'test'},
    ]

    return(
        <SwipeableDrawer variant={'persistent'} anchor={'bottom'} open={open}
                         onClose={onClose} PaperProps={{
            sx: {
                display: "flex",
                flexDirection: "column",
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
                        <ListItemText primary={name.name}/>
                    </ListItem>
                ))}
                {tab===1 && <div>{drawerlist}</div>}
            </Box>
        </SwipeableDrawer>
    )
}