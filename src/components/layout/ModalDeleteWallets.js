import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {WalletService} from "../../services/wallet.service";

export default function ModalDeleteWallets() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () =>{
        setOpen(false)
        // WalletService.deleteWallet()
    }

    return (
        <div>
            <Button color="error" onClick={handleClickOpen}>
                Delete
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
                    <Button color="error" variant="contained" onClick={handleDelete} >
                        DELETE
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}