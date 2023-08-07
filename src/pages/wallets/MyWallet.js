import NavbarMyWallet from "../../components/layout/NavbarMyWallet";
import NestedModal from "../../components/modals/NestedModal";
import CardWallet from "../../components/layout/CardWallet";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyWallet() {
    const [showModal, setShowModal] = useState(false);
    let user = useSelector(state => state.auth.login.currentUser);
    let allWallet = useSelector(state => state.wallet.allWallet)
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else {
            setShowModal(allWallet.length === 0);
        }
    }, [user]);

    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleSubmitModal = () => {
        setShowModal(false);
    }
    return (
        <div className="bg-zinc-200 h-screen">
            {showModal &&
                <>
                    <NavbarMyWallet />
                    <NestedModal is isOpen={showModal} onClose={handleCloseModal} onSubmit={handleSubmitModal} />
                </>
            }
            {!showModal && <CardWallet />}
        </div>
    );
}