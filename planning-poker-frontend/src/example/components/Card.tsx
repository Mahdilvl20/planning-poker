import {Typography,Button} from "@mui/material"
// @ts-ignore
function ButtonLog({title, onClick}: { title: any, onClick:any }) {
    return (
        <Button sx={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            cursor:onclick?'pointer':'default',
            backgroundColor:'#fff',
            height:'30px',
        }} onClick={onClick}>
        <Typography variant={'caption'} fontSize={15} color={'#000'}>{title}</Typography>

        </Button>
    )
}
export default ButtonLog;