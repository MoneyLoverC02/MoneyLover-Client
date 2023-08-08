import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    AppBar, Box, Card, Checkbox, Container, FormControlLabel, Grid, IconButton, Slide, Stack, Toolbar, Typography
} from "@mui/material";
import {useDispatch, useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import ClearIcon from "@mui/icons-material/Clear";
import ModalDeleteWallets from './ModalDeleteWallets';
import { WalletService } from '../../services/wallet.service';
import { setWalletSelect } from '../../redux/walletSlice';
import UpdateModal from '../modals/UpdateModal';
import NestedModal from '../modals/NestedModal';
import {useNavigate} from 'react-router-dom';
import {useState} from "react";

export default function CardWallet() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checked, setChecked] = React.useState(false);
    const [openFormCreate, setOpenFormCreate] = React.useState(false);
    const [openFormUpdate, setOpenFormUpdate] = React.useState(false);
    const user = useSelector(state => state.auth.login.currentUser);
    const allWallet = useSelector(state => state.wallet.allWallet);
    const walletSelect = useSelector(state => state.wallet.walletSelect);
    const [isChecked, setIsChecked] = useState(false);

    const handleOpenSlide = (idWallet) => {
        WalletService.getInfoWallet(user.id, idWallet).then(res => {
            dispatch(setWalletSelect(res.data.wallet))
            setChecked(true);
        })
    };

    const handleCloseSlide = () => {
        setChecked(false);
    };
    const handleClose = () => {
        navigate('/')
    }

    const handleOpenFormCreate = () => {
        setOpenFormCreate(true)
    }
    const handleCloseFormCreate = () => {
        setOpenFormCreate(false)
    }
    const handleSubmitFormCreate = () => {
        handleCloseFormCreate()
    }
    const handleOpenFormUpdate = () => {
        setOpenFormUpdate(true)
    }
    const handleCloseFormUpdate = () => {
        setOpenFormUpdate(false)
    }
    const handleSubmitFormUpdate = () => {
        handleCloseFormUpdate()
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
        console.log(123)

    };

    return (<div>
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <div>
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
                        <Button onClick={handleOpenFormCreate} variant="contained" sx={{backgroundColor: "#1aa333"}}
                                disableElevation>
                            <b>ADD WALLET</b>
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        </Slide>
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <Container>
                <Box sx={{margin: " 50px auto"}}>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Card sx={{maxWidth: 578}} variant="outlined">
                                <Box sx={{
                                    position: 'relative', backgroundColor: "#f4f4f4", color: "black", height: "40px",
                                }}>
                                    <p style={{padding: "5px 10px"}}>Ví của tôi</p>
                                </Box>
                                <>
                                    {allWallet.length > 0 && allWallet.map(wallet => (
                                        <Button onClick={() => handleOpenSlide(wallet.id)} variant="outlined"
                                                fullWidth="575px" color="success"
                                                sx={{color: "black", justifyContent: "left", textAlign: "left"}}>
                                            <div>
                                                <img src={wallet.icon.icon}
                                                     style={{
                                                         width: "40px", height: "40px", margin: "15px", float: "left"
                                                     }} alt=""/>
                                                <div style={{float: "left", margin: "15px"}}>
                                                    <span className='lowercase'>{wallet.name}</span><br/>
                                                    <span className='lowercase'>{wallet.currency.sign} </span>
                                                    <span>{wallet.amountOfMoney} </span>
                                                </div>
                                            </div>
                                        </Button>))}
                                </>
                            </Card>
                        </Grid>
                        {walletSelect && checked && <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
                            < Grid item xs={8}>
                                <Card variant="outlined">
                                    <Box sx={{
                                        position: 'relative',
                                        color: "black",
                                        height: "50px",
                                        borderBottom: "1px solid #ececec"
                                    }}>
                                        <div style={{padding: "5px 10px",}}><Button sx={{color: "black"}}
                                                                                    onClick={handleCloseSlide}><ClearIcon
                                            sx={{float: "left"}}/></Button>
                                            <b style={{marginLeft: "30px"}}>Wallet details</b>
                                            <Stack direction="row" sx={{float: "right"}} spacing={2}>
                                                <ModalDeleteWallets sx={{height: "402px"}}
                                                                    idWallet={walletSelect.id}
                                                                    onClose={handleCloseSlide}/>
                                            </Stack>
                                        </div>
                                    </Box>
                                    <div fullWidth color="success"
                                         sx={{color: "black", justifyContent: "left", textAlign: "left"}}>
                                        <div>
                                            <img src={walletSelect.icon.icon}
                                                 style={{
                                                     width: "40px", height: "40px", margin: "15px", float: "left"
                                                 }} alt=""/>
                                            <div style={{textAlign: "left", margin: "15px"}}>
                                                <span className='lowercase'>{walletSelect.name}</span><br/>
                                                <span className='lowercase'>{walletSelect.currency.sign} </span>
                                                <span>{walletSelect.amountOfMoney} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{borderTop: "1px solid #ececec"}}>
                                        <Container>
                                            <Grid icon xs={4}>
                                                <FormControlLabel
                                                    control={<Checkbox style={{color: '#1aa333'}}
                                                                       checked={isChecked}
                                                                       onChange={handleCheckboxChange}/>}
                                                    label="lưu trữ"/>
                                            </Grid>
                                        </Container>
                                    </div>
                                    {isChecked === false ? (
                                        <>
                                            <Button onClick={handleOpenFormUpdate} fullWidth sx={{ borderTop: "1px solid #ececec" , color:"green" }}>
                                                <Grid item xs={12}>
                                                    <b>ĐIỀU CHỈNH SỐ DƯ</b>
                                                </Grid>
                                            </Button>
                                            <Button onClick={handleOpenFormUpdate} fullWidth sx={{ borderTop: "1px solid #ececec" , color:"green" }}>
                                                <Grid item xs={12}>
                                                    <b>SHARE VÍ</b>
                                                </Grid>
                                            </Button>
                                        </>
                                    ) : (
                                        <Button onClick={handleOpenFormUpdate} fullWidth sx={{ borderTop: "1px solid #ececec" , color:"green" }}>
                                            <Grid item xs={12}>
                                                <b>SHARE VÍ</b>
                                            </Grid>
                                        </Button>
                                    )}
                            </Card>
                        </Grid>
                            </Slide>}
                    </Grid>
                    <UpdateModal isOpen={openFormUpdate} onClose={handleCloseFormUpdate}
                                 onSubmit={handleSubmitFormUpdate}/>
                    <NestedModal isOpen={openFormCreate} onClose={handleCloseFormCreate}
                                 onSubmit={handleSubmitFormCreate}/>
                </Box>
            </Container>
        </Slide>
    </div>);
}