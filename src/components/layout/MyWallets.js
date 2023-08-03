import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Box, Card} from "@mui/material";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function MyWallets() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div>
                <Button>
                    <div onClick={handleClickOpen} style={{width: "364px", color: "#747474"}}>
                        <div style={{float: "left", marginRight: "40px"}}>
                            <AccountBalanceWalletIcon sx={{fontSize: "40px", marginLeft: "20px"}}/>
                        </div>
                        <div style={{paddingTop: "9px", textAlign: "left"}}>
                            My Wallets
                            <ArrowForwardIosIcon sx={{fontSize: "14px", float: "right", marginRight: "10px"}}/>
                        </div>
                        <hr/>
                    </div>
                </Button>

            </div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                sx={{backgroundColor: "#e4e4e4"}}
            >
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
                <div>
                    <Box sx={{maxWidth: 575, margin: " 50px auto"}}>

                        <Card variant="outlined">
                            <Box sx={{
                                position: 'relative',
                                backgroundColor: "#f4f4f4",
                                color: "black",
                                height: "40px",
                                marginTop: "-15px"
                            }}>
                                <p style={{padding: "5px 10px"}}>Tổng số ví</p>
                            </Box>

                            <Button variant="outlined" fullWidth="575px" color="success"  sx={{color: "black",justifyContent: "left",textAlign:"left"}}>
                                <div>
                                    <img src="https://static.moneylover.me/img/icon/icon.png"
                                         style={{width: "40px", height: "40px", margin: "15px", float: "left"}} alt=""/>
                                    <div style={{float: "left", margin: "15px"}}>
                                        <span>Ví 1</span><br/>
                                        <span>số tiền trong tài khoản </span>
                                    </div>
                                </div>
                            </Button>
                            <Button variant="outlined" fullWidth="575px" color="success" sx={{color: "black",justifyContent: "left",textAlign:"left"}}>
                                <img src="https://static.moneylover.me/img/icon/icon.png"
                                     style={{width: "40px", height: "40px", margin: "15px", float: "left"}} alt=""/>
                                <div style={{float: "left", margin: "15px"}}>
                                    <span>Ví 2</span><br/>
                                    <span>số tiền trong tài khoản </span>
                                </div>
                            </Button>
                            <Button variant="outlined" fullWidth="575px" color="success" sx={{color: "black",justifyContent: "left",textAlign:"left"}}>
                                <img src="https://static.moneylover.me/img/icon/icon.png"
                                     style={{width: "40px", height: "40px", margin: "15px", float: "left"}} alt=""/>
                                <div style={{float: "left", margin: "15px"}}>
                                    <span>Ví 3</span><br/>
                                    <span>số tiền trong tài khoản </span>
                                </div>
                            </Button>

                        </Card>

                    </Box>
                </div>
            </Dialog>
        </div>
    );
}