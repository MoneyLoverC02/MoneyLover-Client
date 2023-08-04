import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CardWallet from './CardWallet';
import NavbarHome from './NavBarHome';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {AppBar, Box, Card, Checkbox, Container, FormControlLabel, Grid, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import ModalDeleteWallets from "./ModalDeleteWallets";
import ClearIcon from "@mui/icons-material/Clear";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function MyWallets() {
    const [checked, setChecked] = React.useState(true);

    const [open, setOpen] = React.useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<div>
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
                <Container>
                    <Box sx={{margin: " 50px auto"}}>

                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Card sx={{maxWidth: 578}} variant="outlined">
                                    <Box sx={{
                                        position: 'relative',
                                        backgroundColor: "#f4f4f4",
                                        color: "black",
                                        height: "40px",
                                    }}>
                                        <p style={{padding: "5px 10px"}}>Tổng số ví</p>
                                    </Box>

                                    <Button variant="outlined" fullWidth="575px" color="success"
                                            sx={{color: "black", justifyContent: "left", textAlign: "left"}}>
                                        <div>
                                            <img src="https://static.moneylover.me/img/icon/icon.png"
                                                 style={{
                                                     width: "40px", height: "40px", margin: "15px", float: "left"
                                                 }} alt=""/>
                                            <div style={{float: "left", margin: "15px"}}>
                                                <span>Ví 1</span><br/>
                                                <span>số tiền trong tài khoản </span>
                                            </div>
                                        </div>
                                    </Button>

                                </Card>
                            </Grid>
                            <Grid item xs={8}>
                                <Card variant="outlined">
                                    <Box sx={{
                                        position: 'relative',
                                        color: "black",
                                        height: "50px",
                                        borderBottom: "1px solid #ececec"
                                    }}>
                                        <div style={{padding: "5px 10px",}}><Button sx={{color: "black"}}
                                            onClick={handleClose}><ClearIcon
                                            sx={{float: "left"}}/></Button>
                                            <b style={{marginLeft: "30px"}}>Wallet details</b>
                                            <Stack direction="row" sx={{float: "right"}} spacing={2}>
                                                <ModalDeleteWallets sx={{height: "402px"}}/>
                                            </Stack>
                                        </div>

                                    </Box>

                                    <div  fullWidth="575px" color="success"
                                         sx={{color: "black", justifyContent: "left", textAlign: "left"}}>
                                        <div>
                                            <img src="https://static.moneylover.me/img/icon/icon.png"
                                                 style={{
                                                     width: "40px", height: "40px", margin: "15px", float: "left"
                                                 }} alt=""/>
                                            <div style={{float: "left", margin: "15px"}}>
                                                <span>Ví 1</span><br/>
                                                <span>số tiền trong tài khoản </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{borderTop:"1px solid #ececec"}}>
                                        <Container>
                                            <Grid  icon xs={4}>
                                                <FormControlLabel
                                                    control={<Checkbox defaultChecked style={{color: '#1aa333'}}/>}
                                                    label="lưu trữ"/>
                                            </Grid>
                                        </Container>
                                    </div>
                                    <Button fullWidth sx={{borderTop: "1px solid #ececec"}}><Grid
                                        item xs={12}>ĐIỀU CHỈNH SỐ DƯ</Grid></Button>
                                </Card>

                            </Grid>


                        </Grid>

                    </Box>
                </Container>
            </div>
        </Dialog>
    </div>);
}