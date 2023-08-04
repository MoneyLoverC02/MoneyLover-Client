

import NavbarMyWallet from "../../components/layout/NavbarMyWallet";
import NestedModal from "../../components/modals/NestedModal";
import CardWallet from "../../components/layout/CardWallet";
import { useEffect, useState } from "react";
import { WalletService } from "../../services/wallet.service";
import { useSelector } from "react-redux";

export default function MyWallet() {
    let [listWallet, setListWallet] = useState([]);
    let user = useSelector(state => state.auth.login.currentUser)
    useEffect(() => {
        WalletService.getAllWallet(user.id).then((res) => {
            setListWallet(res.data.walletList)
        })
    })
    return (
        <div className="bg-zinc-200 h-screen">
            <NavbarMyWallet/>
            <NestedModal/>
            {listWallet.length > 0 ? <CardWallet/>: null}
        </div>
    );
}