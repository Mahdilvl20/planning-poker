import {Card} from "@mui/material"

const Header=()=>{
    return(
        <Card sx={{
            backgroundColor:"red",
            display:'flex',
            height:'100%',
            width:'100%',
            alignItems: 'center',

        }}>
            <header>
                <h1>Plant Poker</h1>
            </header>

        </Card>
    )
}
export default Header;