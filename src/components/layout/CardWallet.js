import * as React from 'react';
import { Box, Card } from "@mui/material";
import { useSelector } from 'react-redux';
import { WalletService } from '../../services/wallet.service';
import Button from '@mui/material/Button';

export default function CardWallet() {
    const [walletList, setWalletList] = React.useState([]);
    const user = useSelector(state => state.auth.login.currentUser);
    React.useEffect(() => {
        WalletService.getAllWallet(user.id).then(res => {
            setWalletList(res.data.walletList)
        })
    }, [])

    return (
        <div>
        <Box sx={{ maxWidth: 575, margin: " 50px auto" }}>

            <Card variant="outlined">
                <Box sx={{
                    position: 'relative',
                    backgroundColor: "#f4f4f4",
                    color: "black",
                    height: "40px",
                }}>
                    <p style={{ padding: "5px 10px" }}>Tổng số ví</p>
                </Box>
                {walletList.length > 0 && walletList.map(wallet => (
                    <Button variant="outlined" fullWidth="575px" color="success" sx={{ color: "black", justifyContent: "left", textAlign: "left" }}>
                        <div>
                            <img src= {wallet.icon.icon}
                                style={{ width: "40px", height: "40px", margin: "15px", float: "left" }} alt="" />
                            <div style={{ float: "left", margin: "15px" }}>
                                <span>{wallet.name}</span><br />
                                <span className='lowercase'>{wallet.currency.sign} </span>
                                <span>{wallet.amountOfMoney} </span>
                            </div>
                        </div>
                    </Button>
                ))}
            </Card>
        </Box>  
    </div>
    );
}