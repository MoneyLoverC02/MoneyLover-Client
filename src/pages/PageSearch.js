import NavbarSearch from "../components/navbars/NavbarSearch";
import Sidebar from "../components/layout/Sidebar";
import SearchCard from "../components/layout/searchCard";
import {useState} from "react";

export default function PageSearch() {
    const [isModalVisible, setModalVisible] = useState(false);
    const handleOpenModal = () => {
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <NavbarSearch/>
            <Sidebar/>
            <SearchCard openModal = {isModalVisible} closeModal={handleCloseModal}/>
        </>
    )
}