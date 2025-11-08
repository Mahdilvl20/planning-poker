import {Box,Typography,Chip} from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {useNavigate} from "react-router-dom";


export default function NotFound(){
    const Navigate=useNavigate();
    const handeleMainPage=()=>{
        Navigate('/');
    }
    return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p:15
        }}>
            <ReportProblemIcon sx={{fontSize:'20rem'}}/>
            <Typography sx={{fontSize:'30px'}}>{'Not Found'}</Typography>
            <Chip onClick={handeleMainPage}  label={'Main Page'} sx={{
                fontSize:18,
                "&:hover": { backgroundColor: 'white'},
                m:2,
            }}/>
        </Box>
    )

}