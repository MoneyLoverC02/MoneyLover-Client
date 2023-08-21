import { Button, IconButton, Slide } from "@mui/material";
import { Search } from '@mui/icons-material';
import SelectWallets from "./SelectWallets";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {setLanguage} from "../../redux/languageSice";
export default function NavBar({onClickAddBtn}) {
    const {i18n}= useTranslation()
    const language = useSelector(state=>state.lang.lang)
    const dispatch = useDispatch();

    const handleLanguageChange = (event) => {
        i18n.changeLanguage(event.target.value)
        if(event){
            dispatch(setLanguage(event.target.value))
        }
    };
 const {t}=useTranslation()
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
                        <select onChange={handleLanguageChange} value={language}>
                            <option  value={"Vi"} >Vi</option>
                            <option  value={"En"} >En</option>
                        </select>
                        <Link to="/search">
                            <IconButton  aria-label="delete" sx={{ color: "black", marginRight: "35px" }}>
                                <Search />
                            </IconButton>
                        </Link>
                        <Button onClick={onClickAddBtn} variant="contained" sx={{ backgroundColor: "#1aa333" }} disableElevation>
                            <b>{t("addTrasactions")}</b>
                        </Button>
                    </div>
                </div>
            </Slide>
        </>
    )
}