import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ClearIcon from '@mui/icons-material/Clear';
import {Avatar, Stack} from "@mui/material";
import {Edit} from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import ModalDeleteUser from "../modals/ModalDeleteUser";
import { persistor } from '../../redux/store';

const style = {
    position: 'absolute',
    top: '50%',
    borderRadius: "10px",
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MyAccount() {
    const dispatch = useDispatch();
    const navigate =useNavigate()
    const user = useSelector(state => state.auth.login.currentUser)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSignOut = () => {
        localStorage.clear();
        dispatch(logout());
        persistor.purge();
        navigate('/login');
    }
    const handleClickEdit = () =>{

    }

    return (
        <div>
            <Button onClick={handleOpen}>
                <div style={{width: "364px", color: "#747474"}}>
                    <div style={{float: "left", marginRight: "40px"}}>
                        <PersonIcon sx={{fontSize: "40px", marginLeft: "20px"}}/>
                    </div>
                    <div style={{paddingTop: "9px", textAlign: "left"}}>
                        My Account
                        <ArrowForwardIosIcon sx={{fontSize: "14px", float: "right", marginRight: "10px"}}/>
                    </div>
                    <hr/>
                </div>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <Button sx={{color: "black"}} onClick={handleClose}><ClearIcon sx={{float: "left"}}/></Button>
                        <Stack direction="row" sx={{float: "right"}} spacing={2}>
                            <Button onClick={handleSignOut} color="success"><b>SIGN OUT</b></Button>
                        </Stack>
                        <b style={{marginLeft: "30px"}}>My Account</b>
                    </div>
                    <br/>
                    <hr/>
                    <br/>
                    <Avatar sx={{margin: "auto", width: 70, height: 70}} size="large">T</Avatar>
                    <p style={{color: "black", textAlign: "center"}}>{user.email} </p>
                    <div style={{marginTop:"100px"}}>
                        <Stack direction="row" sx={{float: "left"}} spacing={2}>
                            <Button variant="outlined" startIcon={<Edit/>} onClick={handleClickEdit}>
                                Edit
                            </Button>

                        </Stack>
                        <Stack direction="row-reverse" spacing={2}>
                            <ModalDeleteUser sx={{ height: "402px" }}/>
                        </Stack>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}