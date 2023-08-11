import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {UserService} from "../../services/user.service";
import {logout} from "../../redux/authSlice";
import {useNavigate} from "react-router-dom";
import { walletLogout } from '../../redux/walletSlice';

export default function ModalDeleteUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDeleteUser = () => {
        let token = localStorage.getItem('token')
        UserService.deleteUser(token)
            .then(response => {
                localStorage.removeItem('token');
                dispatch(logout());
                dispatch(walletLogout());
                // dispatch(transactionLogout());
                navigate('/login');
            });
    }
    return (
        <div>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon/>} onClick={handleClickOpen}>
            Delete
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Bạn có chắc muốn xóa tài khoản này?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Xóa không lấy lại được đâu ^^.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="success" variant="outlined" onClick={handleClose} autoFocus>CANCEL</Button>
                <Button color="error" variant="contained" onClick={() => {
                    handleDeleteUser()
                }}>
                    DELETE
                </Button>
            </DialogActions>
        </Dialog>
    </div>);
}