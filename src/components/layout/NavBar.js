import {Box, Button, IconButton} from "@mui/material";
import {Search} from '@mui/icons-material';

export default function NavBar() {

    return (
        <div className="navbar">
            <div style={{float: "left", height: "66px", margin: "15px",}}>
                <img src="logo.jpg" style={{height:"66px", marginTop:"-15px" }} alt=""/>
            </div>

            <div style={{float: "right", height: "66px", margin: "15px"}}>


                <IconButton aria-label="delete" sx={{color: "black", marginRight: "35px"}}>
                    <Search />
                </IconButton>
                <Button variant="contained" sx={{backgroundColor: "#1aa333"}} disableElevation>
                    <b>ADD TRANSACTION</b>
                </Button>
            </div>
        </div>
    )
}