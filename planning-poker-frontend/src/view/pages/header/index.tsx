import {Box,Typography} from "@mui/material"

const Header=()=>{
    return(

            <Box sx={{display:'flex',justifyContent:'center',backgroundColor:'#fff',borderBottomRightRadius:'10px',borderBottomLeftRadius:'10px'}}>
                <Typography variant={'caption'} fontSize={'larger'}>Planning Poker</Typography>
            </Box>

    )
}
export default Header;