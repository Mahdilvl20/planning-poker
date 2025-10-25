import {Typography,Button} from "@mui/material"
// @ts-ignore
function Card({title, onClick, onClick}: { title: any, onClick:any }) {
    return (
        <Button sx={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            cursor:onclick?'pointer':'default',
            m:5,
            backgroundColor:'#fff'
        }} onClick={onClick}>
        <Typography fontSize={20}>{title}</Typography>

        </Button>
    )
}
export default Card;