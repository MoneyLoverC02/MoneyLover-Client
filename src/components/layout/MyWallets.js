import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CardWallet from './CardWallet';
import NavbarHome from './NavBarHome';

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
                    <div onClick={handleClickOpen} style={{ width: "364px", color: "#747474" }}>
                        <div style={{ float: "left", marginRight: "40px" }}>
                            <AccountBalanceWalletIcon sx={{ fontSize: "40px", marginLeft: "20px" }} />
                        </div>
                        <div style={{ paddingTop: "9px", textAlign: "left" }}>
                            My Wallets
                            <ArrowForwardIosIcon sx={{ fontSize: "14px", float: "right", marginRight: "10px" }} />
                        </div>
                        <hr />
                    </div>
                </Button>

            </div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                sx={{ backgroundColor: "#e4e4e4" }}
            >
                <NavbarHome closeParent={handleClose} />

                <CardWallet/>
            </Dialog>
        </div>
    );
}