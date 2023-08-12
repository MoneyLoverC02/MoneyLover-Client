import * as React from 'react';
import Button from '@mui/material/Button';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useNavigate} from 'react-router-dom';

export default function MyWallets() {
    const navigate = useNavigate();
    const handleClickOpen = () => {
        navigate('/my-wallets')
    };

    return (
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
    )
}