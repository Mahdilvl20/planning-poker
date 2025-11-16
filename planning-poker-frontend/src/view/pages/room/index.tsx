import {Chip,Box,useMediaQuery, Snackbar, Alert} from '@mui/material';
import {useEffect, useState, useRef} from "react";
//*******icons
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DehazeIcon from '@mui/icons-material/Dehaze';
import PersonIcon from '@mui/icons-material/Person';

//*******Drawer
import MobileDrawer from "../drawers/MobileDrawer";
import DesktopDrawer from "../drawers/DesktopDrawer";
import NumberPad from "../numberPad";
import {getSocket} from "../socket/index.ts";
import {useNavigate, useParams} from "react-router-dom";

function Room() {
    const [openDrawerDesktop, setOpenDrawerDesktop] = useState(true);
    const [openDrawerMobile, setOpenDrawerMobile] = useState(true);
    const [opentest, setOpentest] = useState(false);
    const isMobile = useMediaQuery("(max-width:600px)");
    const drawerWidth = 230;
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [alertMessage, setAlertMessage] = useState<{username: string, open: boolean, type: 'join' | 'leave'}>({username: '', open: false, type: 'join'});
    const previousUsersRef = useRef<string[]>([]);
    const name=localStorage.getItem('name');
    const {slug} =useParams();
    const savedSlug=localStorage.getItem('roomLink');
    const navigate=useNavigate();
    useEffect(() => {
        if (slug!==savedSlug){
            window.location.reload();
            navigate('*');
        }
    }, [slug,savedSlug,navigate]);
    useEffect(() => {
        const s = getSocket();
        if (!s) {
            console.error("Socket is null. Cannot join room.");
            return;
        }

        const connectHandler = () => {
            const roomId = localStorage.getItem("roomLink");
            const name = localStorage.getItem("name");

            if (!roomId || !name) {
                console.error("roomLink or name missing in localStorage");
                return;
            }

            console.log("Emitting join-room:", { roomId, name });
            s.emit('join-room', { roomId, name });
        };

        if (s.connected) {
            connectHandler();
        } else {
            s.once('connect', connectHandler);
        }

        s.on('roomUsers', (users: string[]) => {
            console.log("Received roomUsers:", users);
            
            const previousUsers = previousUsersRef.current;
            
            // Check if a user left the room
            if(previousUsers.length > 0 && users.length < previousUsers.length){
                // Find which user left
                const leftUser = previousUsers.find(user => !users.includes(user));
                if(leftUser && leftUser !== name){
                    // Show alert for user who left
                    setAlertMessage({username: leftUser, open: true, type: 'leave'});
                }
            }
            
            // Check if a user joined the room
            if(previousUsers.length > 0 && users.length > previousUsers.length){
                // Find which user joined
                const joinedUser = users.find(user => !previousUsers.includes(user));
                if(joinedUser && joinedUser !== name){
                    // Show alert for user who joined
                    setAlertMessage({username: joinedUser, open: true, type: 'join'});
                }
            }
            
            previousUsersRef.current = users;
            setOnlineUsers(users);
        });

        return () => {
            s.off('connect', connectHandler);
            s.off('roomUsers');
        };
    }, []);
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
            }} label={`welcome ${name}`}/>
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
                {onlineUsers.map((index,key)=>(
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
            
            <Snackbar
                open={alertMessage.open}
                autoHideDuration={3000}
                onClose={() => setAlertMessage({username: '', open: false, type: 'join'})}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={() => setAlertMessage({username: '', open: false, type: 'join'})} 
                    severity={alertMessage.type === 'join' ? 'success' : 'info'}
                    sx={{ width: '100%' }}
                >
                    {alertMessage.username} {alertMessage.type === 'join' ? 'joined' : 'left'} the room
                </Alert>
            </Snackbar>
        </Box>
    )
}
export default Room;