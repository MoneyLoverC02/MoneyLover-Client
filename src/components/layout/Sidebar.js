import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import ReorderIcon from '@mui/icons-material/Reorder';
import {Avatar} from "@mui/material";
import MyAccount from "./MyAccount";
import MyWallets from "./MyWallets";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TollIcon from '@mui/icons-material/Toll';

import { useSelector } from 'react-redux';


export default function Sidebar() {
    const user = useSelector(state => state.auth.login.currentUser)
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

        <div style={{width: "364px" }}>
            <div style={{textAlign: "center", marginBottom:"20px"}}>
                <Avatar sx={{margin: "auto", marginTop: "50px"}}>T</Avatar>
                <h4>{user.email}</h4>
            </div>
            <hr/>
            <MyAccount/>
            <MyWallets/>

        </div>);
    return (
        <div className="sidebar">
            <div>

                <React.Fragment key={"left"}>
                    <Button onClick={toggleDrawer("left", true)}><ReorderIcon sx={{color: "#282828"}}/></Button>
                    <SwipeableDrawer
                        anchor={"left"}
                        open={state["left"]}
                        onClose={toggleDrawer("left", false)}
                        onOpen={toggleDrawer("left", true)}
                    >
                        {list("left")}
                    </SwipeableDrawer>
                </React.Fragment>
                <div className="iconSideBar">
                    <Button><AccountBalanceWalletIcon className="colorIcon"/></Button>
                    <span className="colorIcon">Trasactions</span>
                </div>
                <div className="iconSideBar">
                    <Button><AnalyticsIcon className="colorIcon"/></Button>
                    <span className="colorIcon">Report</span>
                </div>
                <div className="iconSideBar">
                    <Button><TollIcon   className="colorIcon"/></Button>
                    <span className="colorIcon">Budget</span>
                </div>
                <hr style={{
                    margin: "10px -10px",
                    border: "none",
                    height: "2px",
                    backgroundColor: "rgba(0,0,0,.12)"
                }}/>
            </div>

        </div>
    )
}