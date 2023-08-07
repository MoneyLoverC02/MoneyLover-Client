import { useEffect } from "react";
import NavBar from "../components/layout/NavBar";
import Sidebar from "../components/layout/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function HomePage (){
    const user = useSelector(state => state.auth.login.currentUser);
    const navigate = useNavigate();
    useEffect(() => {
        if(!user){
            navigate('/login')
    }}, [user])
    return(
        <>
            <NavBar/>
            <Sidebar/>
        </>
    )
}