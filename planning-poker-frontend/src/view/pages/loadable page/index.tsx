import { Card } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Loadable = () => (
    <Card
        sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
        }}
    >
            <CircularProgress />
    </Card>
);

export default Loadable;
