import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Loadable = () => (
    <Box
        sx={{
            position:'fixed',
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            margin: 0,
            padding: 0,
            background:'rgba(0, 0, 0, 0.3)',
            backdropFilter:'blur(15px)',
            webkitBackdropFilter:'blur(15px)',
        }}
    >
            <CircularProgress />
    </Box>
);

export default Loadable;
