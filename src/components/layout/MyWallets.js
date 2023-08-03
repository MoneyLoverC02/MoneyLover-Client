import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MyWallets() {


    return (
        <div>
            <Button >
                <div style={{width: "364px", color:"black"}}>
                    <div style={{float: "left", marginRight: "40px"}}>
                        <AccountBalanceWalletIcon sx={{fontSize: "40px", marginLeft: "20px"}}/>
                    </div>
                    <div style={{paddingTop: "9px" , textAlign:"left"}}>
                        My Wallets
                        <ArrowForwardIosIcon sx={{fontSize:"14px", float:"right", marginRight:"10px"}}/>
                    </div>
                    <hr/>
                </div>
            </Button>

        </div>
    );
}