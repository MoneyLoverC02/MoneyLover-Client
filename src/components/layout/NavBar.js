import { Button, IconButton, Slide } from "@mui/material";
import { Search } from '@mui/icons-material';
import SelectWallets from "./SelectWallets";
import ModalSearch from "../modals/ModalSearch";

export default function NavBar({onClickAddBtn}) {

    return (
        <>
            <Slide direction="down" in={true} mountOnEnter unmountOnExit>
                <div className="navbar">
                    <div style={{ float: "left", height: "66px", margin: "15px", }}>
                        <img src="logo.jpg" style={{ height: "66px", marginTop: "-15px" }} alt="" />
                    </div>
                    <div style={{ float: "left", height: "66px", }}>
                        <SelectWallets />
                    </div>
                    <div style={{ float: "right", height: "66px", margin: "15px" }}>
                        <ModalSearch/>
                        <Button onClick={onClickAddBtn} variant="contained" sx={{ backgroundColor: "#1aa333" }} disableElevation>
                            <b>ADD TRANSACTION</b>
                        </Button>
                    </div>
                </div>
            </Slide>
        </>
    )
}