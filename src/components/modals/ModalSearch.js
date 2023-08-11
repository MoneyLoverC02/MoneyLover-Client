import {Search} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useState} from "react";

export default function ModalSearch (){
    const [check , setCheck]=useState(false)
    const openSearch = () => {
        console.log(check)
      setCheck(true)
    }

    return(
        <>
            <IconButton onClick={openSearch} aria-label="delete" sx={{ color: "black", marginRight: "35px" }}>
                <Search />
            </IconButton>
        </>
    )
}