import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';

export default function NavbarMyWallet () {
    const navigate = useNavigate();
    const handleClose = () => {
        navigate('/')
    }
    return (
        <AppBar sx={{position: 'relative', backgroundColor: "white", color: "black"}}>
        <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
            >
                <ArrowBackIcon/>
            </IconButton>
            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                My Wallets
            </Typography>
        </Toolbar>
    </AppBar>
    );
}
