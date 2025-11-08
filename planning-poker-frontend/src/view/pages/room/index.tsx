import {Chip,Box,useMediaQuery} from '@mui/material';
import {useState} from "react";
//*******icons
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DehazeIcon from '@mui/icons-material/Dehaze';
import PersonIcon from '@mui/icons-material/Person';

//*******Drawer
import MobileDrawer from "../drawers/MobileDrawer";
import DesktopDrawer from "../drawers/DesktopDrawer";
import NumberPad from "../numberPad";

function Room() {
    const [openDrawerDesktop, setOpenDrawerDesktop] = useState(true);
    const [openDrawerMobile, setOpenDrawerMobile] = useState(true);
    const [opentest,setOpentest]=useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");
    const drawerWidth = 230;
    const members=['mahdi','ali','ehsan','asqar','akbar','soqra','kobra','mahdi','ali','ehsan','asqar','akbar','soqra','kobra'];

//@ts-ignore
    const handleExitClick = () => {

    }
    const handleSideBarClick = () => {
        if (!openDrawerDesktop && !openDrawerMobile) {
            setOpenDrawerDesktop(true);
            setOpenDrawerMobile(true);
        } else
        {setOpenDrawerDesktop(false)
            setOpenDrawerMobile(false)}
    }
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
                height: 'content'
            }} label={'EXIT'} variant={'filled'} icon={<HighlightOffIcon color={'error'} fontSize={'large'}/>}
                  onClick={()=>setOpentest(true)} />
            <Chip sx={{
                position: 'absolute',
                right: 10,
                mt: 2,
                pt: 0.5,
                height: 'content'
            }} label={<DehazeIcon fontSize={'large'}/>} onClick={handleSideBarClick}/>
            <Chip sx={{
                position: 'absolute',
                left: 10,
                mt: 2,
                height: 'content',
                fontWeight: 'bolder',
                fontSize: 17
            }} label={'welcome TEST'}/>
            {isMobile ? (
                <MobileDrawer open={openDrawerMobile} onClose={()=>setOpenDrawerMobile(false)}/>
             ) : (
                 <DesktopDrawer open={openDrawerDesktop} onClose={()=>setOpenDrawerDesktop(false)}/>
            )}

            <Box
                sx={{
                    position:'absolute',
                    flexWrap:'wrap',
                    display:'flex',
                    maxWidth:'1900px',
                    top:'7vh',
                    borderRadius:'20px',
                    p:2,
                    m:2,
                    gap:2,
                    mr:{sm:openDrawerDesktop?`${drawerWidth}px`:0},

                }}>
                {members.map((index,key)=>(
                    <Box key={key} sx={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'#636CCB',
                        borderRadius:'10px',
                        p:2,
                        width:{xs:'120px',sm:'190px'},
                        height:{xs:'12vh',sm:'19vh'}
                    }}>
                        <PersonIcon fontSize={'large'}/>
                        {index}
                    </Box>
                ))}
            </Box>
            <NumberPad open={opentest} onClose={()=>setOpentest(false)}/>
        </Box>
    )
}
export default Room;