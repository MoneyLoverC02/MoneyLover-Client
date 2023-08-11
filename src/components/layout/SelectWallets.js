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
import Typography from '@mui/material/Typography';
import {blue} from '@mui/material/colors';
import {useDispatch, useSelector} from 'react-redux';
import {setWalletSelect} from '../../redux/walletSlice';

function SimpleDialog(props) {
    const {onClose, selectedValue, open} = props;
    const walletList = useSelector(state => state.wallet.allWallet);

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        if (value) {
            onClose(value);
        }
    };

    return (<Dialog onClose={handleClose} open={open}>
        <DialogTitle>Excluded from Total</DialogTitle>
        <List sx={{pt: 0, width: "500px"}}>
            {walletList?.length > 0 && walletList.map((wallet) => (<ListItem disableGutters>
                <ListItemButton onClick={() => handleListItemClick(wallet)} key={wallet.id}>
                    <ListItemAvatar>
                        <Avatar sx={{bgcolor: blue[100], color: blue[600]}}>
                            <img src={wallet.icon.icon} alt=""/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={wallet.name}
                        secondary={
                            <React.Fragment>
                                <Typography variant="body2" color="text.secondary">
                                    {wallet.amountOfMoney} {wallet.currency.sign}
                                </Typography>
                            </React.Fragment>
                        }
                    />
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
    const walletSelect = useSelector(state => state.wallet.walletSelect);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        if (typeof value === "object" && value !== null) {
            dispatch(setWalletSelect(value))
        }
    };

    return (
        <div>
            <Button sx={{color: "black", justifyContent: "left", textTransform: 'lowercase'}} onClick={handleClickOpen}>
                {walletSelect?.name}
            </Button>
            <Typography variant="subtitle1" component="div">
                {walletSelect?.amountOfMoney > 0 ? "+" : null} {walletSelect?.amountOfMoney} {walletSelect?.currency.sign}
            </Typography>
            <SimpleDialog
                selectedValue={walletSelect?.name}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}