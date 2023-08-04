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

const emails = [{
    id: 1, name: "Ví 1", money: 33411412
}, {
    id: 2, name: "Ví 2", money: 3132764
}, {
    id: 3, name: "Ví 3", money: 342116
}, {
    id: 4, name: "Ví 4", money: 323131
},

];

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
        </List>
    </Dialog>);
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired, open: PropTypes.bool.isRequired, selectedValue: PropTypes.string.isRequired,
};

export default function SelectWallets() {
    const [open, setOpen] = React.useState(false);
    const [selectedName, setSelectedName] = React.useState(emails[1].name);
    const [selectedMoney, setSelectedMoney] = React.useState(emails[1].money);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        if (typeof value === 'object' && value !== null) {
            setSelectedName(value.name);
            setSelectedMoney(value.money);
        }
    };
    return (<div>

        <Button sx={{color:"black"}} onClick={handleClickOpen}>
            {selectedName}
        </Button>
        <Typography variant="subtitle1" component="div">
            {selectedMoney}
        </Typography>
        <SimpleDialog
            selectedValue={setSelectedName}
            open={open}
            onClose={handleClose}
        />
    </div>);
}