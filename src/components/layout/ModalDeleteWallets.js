import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { WalletService } from "../../services/wallet.service";
import { useDispatch, useSelector } from "react-redux";
import { getAllWallet} from "../../redux/walletSlice";


export default function ModalDeleteWallets({ idWallet, onClose }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const user = useSelector(state => state.auth.login.currentUser);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        const token = localStorage.getItem('token')
        WalletService.deleteWallet(user.id, idWallet).then((res) => {
            WalletService.getAllWallet(user.id, token).then(res => {
                dispatch(getAllWallet(res.data.walletList));
                handleClose();
                onClose();
            }).catch(err => console.log(err.message));
        }).catch(err => console.log(err.message));

    }

    return (<div>
        <Button color="error" onClick={handleClickOpen}>
            delete
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Bạn có chắc muốn xóa ví này?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Xóa không lấy lại được đâu.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="success" variant="outlined" onClick={handleClose} autoFocus>CANCEL</Button>
                <Button color="error" variant="contained" onClick={() => {
                    handleDelete()
                }}>
                    DELETE
                </Button>
            </DialogActions>
        </Dialog>
    </div>);
}