import {Chip,Box,Drawer,Tabs,Tab,ListItem,ListItemText,useMediaQuery,SwipeableDrawer} from '@mui/material';
import {useState} from "react";
//*******icons
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DehazeIcon from '@mui/icons-material/Dehaze';




function Room() {
    const [tab, setTab] = useState(0);
    const [openDrawer, setOpenDrawer] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");
    const handleExitClick = () => {

    }
    const handleSideBarClick = () => {
        if (!openDrawer) {
            setOpenDrawer(true);
        } else setOpenDrawer(false)
    }
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
    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            height: {xs: '8vh', sm: '7vh'},
        }} >
            <Chip sx={{
                position: 'absolute',
                right: 80,
                mt: 2,
                fontWeight: 'bolder',
                height: '4vh'
            }} label={'EXIT'} variant={'filled'} icon={<HighlightOffIcon color={'error'} fontSize={'large'}/>}
                  onClick={handleExitClick}/>
            <Chip sx={{
                position: 'absolute',
                right: 10,
                mt: 2,
                pt: 0.5,
                height: '4vh'
            }} label={<DehazeIcon fontSize={'large'}/>} onClick={handleSideBarClick}/>
            <Chip sx={{
                position: 'absolute',
                left: 10,
                mt: 2,
                height: '4vh',
                fontWeight: 'bolder',
                fontSize: 17
            }} label={'welcome TEST'}/>
            {isMobile ? (
                <SwipeableDrawer variant={'persistent'} anchor={'bottom'} open={openDrawer}
                                 onClose={() => setOpenDrawer(false)} PaperProps={{
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
             ) : (
                <Drawer variant={'persistent'} open={openDrawer} anchor={'right'} onClose={()=>setOpenDrawer(false)} PaperProps={{sx:{
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
                                <ListItemText primary={name.name}/>
                            </ListItem>
                        ))}
                        {tab===1 && <div>{drawerlist}</div>}
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}
export default Room;