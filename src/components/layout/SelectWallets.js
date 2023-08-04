import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { WalletService } from '../../services/wallet.service';


function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const [walletList, setWalletList] = React.useState([]);
    const user = useSelector(state => state.auth.login.currentUser);
    React.useEffect(() => {
        WalletService.getAllWallet(user.id).then(res => {
            setWalletList(res.data.walletList)
        })
    }, [])

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (<Dialog onClose={handleClose} open={open}>
        <DialogTitle>Set backup account</DialogTitle>
        <List sx={{ pt: 0 }}>
            {walletList.map((wallet) => (
                <ListItem disableGutters>
                    <ListItemButton onClick={() => handleListItemClick(wallet)} key={wallet.id}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={wallet.name} />
                    </ListItemButton>
                </ListItem>))}
        </List>
    </Dialog>);
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired, open: PropTypes.bool.isRequired, selectedValue: PropTypes.string.isRequired,
};

export default function SelectWallets() {
    const [open, setOpen] = React.useState(false);
    const [walletList, setWalletList] = React.useState([]);
    const [selectedName, setSelectedName] = React.useState('');
    const [selectedMoney, setSelectedMoney] = React.useState("");
    const user = useSelector(state => state.auth.login.currentUser);
    React.useEffect(() => {
        WalletService.getAllWallet(user.id).then(res => {
            const wallets = res.data.walletList
            setWalletList(wallets);
            setSelectedName(wallets[0].name);
            setSelectedMoney(wallets[0].amountOfMoney);
        })
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        console.log(value);
        if (typeof value !== 'function' && value !== null) {
            setSelectedName(value.name);
            setSelectedMoney(value.amountOfMoney);
        }
    };

    return (<div>

        <Button sx={{ color: "black", justifyContent: "left" }} onClick={handleClickOpen}>
            {selectedName}
        </Button>
        <Typography variant="subtitle1" component="div">
            + {selectedMoney} đ
        </Typography>
        <SimpleDialog
            selectedValue={setSelectedName}
            open={open}
            onClose={handleClose}
        />
    </div>);
}