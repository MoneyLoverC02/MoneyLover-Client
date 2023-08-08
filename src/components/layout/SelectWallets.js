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
import Typography from '@mui/material/Typography';
import {blue} from '@mui/material/colors';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';


function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const walletList = useSelector(state => state.wallet.allWallet);
    const user = useSelector(state => state.auth.login.currentUser);

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (<Dialog onClose={handleClose}  open={open}>
        <DialogTitle>Excluded from Total</DialogTitle>
        <List sx={{pt: 0}}>
            {walletList.length > 0 && walletList.map((wallet) => (<ListItem disableGutters>
                <ListItemButton onClick={() => handleListItemClick(wallet)} key={wallet.id}>
                    <ListItemAvatar>
                        <Avatar sx={{bgcolor: blue[100], color: blue[600]}}>
                            <PersonIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={wallet.name}/>
                </ListItemButton>
            </ListItem>))}
        </List>
    </Dialog>);
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired, open: PropTypes.bool.isRequired, selectedValue: PropTypes.string.isRequired,
};

export default function SelectWallets() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const allWallet = useSelector(state => state.wallet.allWallet);
    const walletSelect = useSelector(state => state.wallet.walletSelect)
    const [selectedName, setSelectedName] = React.useState(allWallet[0].name)
    const [selectedMoney, setSelectedMoney] = React.useState(allWallet[0].amountOfMoney);
    // const user = useSelector(state => state.auth.login.currentUser);


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

        <Button sx={{color: "black", justifyContent: "left", textTransform: 'lowercase'}} onClick={handleClickOpen}>
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