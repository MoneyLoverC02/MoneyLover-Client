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
import {blue} from '@mui/material/colors';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import {Stack} from "@mui/material";

const emails = [{
    id: 1, name: "Ví 1", money: 154433
}, {
    id: 2, name: "Ví 2", money: 204852
}, {
    id: 3, name: "Ví 3", money: 144435
}];

function SimpleDialog(props) {
    const {onClose, selectedValue, open} = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (<Dialog onClose={handleClose} open={open}>
        <DialogTitle>Set backup account</DialogTitle>
        <List sx={{pt: 0}}>
            {emails.map((email) => (<ListItem disableGutters>
                <ListItemButton onClick={() => handleListItemClick(email)} key={email.id}>
                    <ListItemAvatar>
                        <Avatar sx={{bgcolor: blue[100], color: blue[600]}}>
                            <PersonIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={email.name}/>
                </ListItemButton>
            </ListItem>))}
            <ListItem disableGutters>

            </ListItem>
        </List>
    </Dialog>);
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired, open: PropTypes.bool.isRequired, selectedValue: PropTypes.string.isRequired,
};

export default function ListWallets() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[0].name);
    const [selectedMoney, setSelectedMoney] = React.useState(emails[0].money);

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = (value) => {
        setOpen(false);
        if(typeof value === 'object' && value !== null){
            console.log("ngu", value)
            setSelectedValue(value.name);
            setSelectedMoney(value.money);
        }
    };

    return (<div>
        <Stack direction="row" spacing={2}>
        <Button sx={{color:"black"}} onClick={handleClickOpen}>
            {selectedValue} ▼
        </Button>
        </Stack>
        <Typography variant="subtitle1" component="div">
            <b> +{selectedMoney} đ </b>
        </Typography>
        <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
        />
    </div>);
}