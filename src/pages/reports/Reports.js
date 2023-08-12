import { useState } from "react";
import NavBar from "../components/layout/NavBar";
import Sidebar from "../components/layout/Sidebar";

export default function Reports() {
    // const [isModalVisible, setModalVisible] = useState(false);
    // const handleOpenModal = () => {
    //     setModalVisible(true);
    // };
    // const handleCloseModal = () => {
    //     setModalVisible(false);
    // };
    return (
        <>
            {/* <NavBar onClickAddBtn={handleOpenModal} /> */}
            <div>
                <Sidebar />

                    {/* <TransactionCard openModal = {isModalVisible} closeModal={handleCloseModal}/> */}

            </div>
        </>
    )
}