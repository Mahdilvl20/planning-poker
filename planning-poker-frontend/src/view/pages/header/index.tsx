import {Box,Typography,Card} from "@mui/material"
import LOGO from "../../../assets/LOGO.png"
import ButtonLog from "../../../example/components/Card.tsx"
import {useState} from "react";


const Header=()=>{
    //@ts-ignore
    const [open,setOpen]=useState(false)
    return(
            <Card sx={{display:'flex',
                justifyContent: {md:'space-between',xs:'center'},
                backgroundColor:'#50589C',
                borderBottomRightRadius:'10px',
                alignItems: 'center',
                position:'relative',
                width:'100%',
            }}>
                <Box sx={{
                        height:'9vh',
                }}>
                <img src={LOGO} style={{height:'10vh'}} alt={'logo'}/>
                </Box>
                <Box sx={{
                    display:{xs:'rows',md:'flex'}
                }}>
                    <Typography component="h1" variant="h5">Planning poKer</Typography>
                </Box>
                <Box sx={{
                    m:2,
                    display:{xs:'none',md:'flex'}
                }}>
                    <ButtonLog title={"login/signup"} onClick={()=>setOpen(true)}/>
                </Box>
            </Card>

    )
}
export default Header;