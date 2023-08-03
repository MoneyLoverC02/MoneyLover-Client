
import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import ReorderIcon from '@mui/icons-material/Reorder';
import {Avatar} from "@mui/material";
import MyAccount from "./MyAccount";
import MyWallets from "./MyWallets";


export default function Sidebar() {
    const [state, setState] = React.useState({
        left: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({...state, [anchor]: open});
    };
    const list = (anchor) => (

        <div style={{width: "364px"}}>
            <div style={{textAlign: "center"}}>
                <Avatar sx={{margin: "auto", marginTop: "50px"}}>T</Avatar>
                <h4>tên người dùng</h4>
            </div>
            <hr/>
            <MyAccount/>
           <MyWallets/>

        </div>);
    return (<div className="sidebar">

        <React.Fragment key={"left"}>
            <Button onClick={toggleDrawer("left", true)}><ReorderIcon sx={{color: "black"}}/></Button>
            <SwipeableDrawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
            >
                {list("left")}
            </SwipeableDrawer>
        </React.Fragment>


    </div>);
}