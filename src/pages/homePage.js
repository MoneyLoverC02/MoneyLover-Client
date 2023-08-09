import { useState } from "react";
import NavBar from "../components/layout/NavBar";
import Sidebar from "../components/layout/Sidebar";
import TransactionCard from "../components/transactions/TransactionCard";

export default function HomePage() {
    const [isModalVisible, setModalVisible] = useState(false);
    const handleOpenModal = () => {
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };
    return (
        <>
            <NavBar onClickAddBtn={handleOpenModal} />
            <div className="flex justify-start">
                <Sidebar />
                <TransactionCard openModal = {isModalVisible} closeModal={handleCloseModal}/>
            </div>
        </>
    )
}