import { createSlice } from "@reduxjs/toolkit";
import { WalletService } from "../services/wallet.service";

const currencyList = await WalletService.getCurrency().then(res => {
    return res.data.currencyList
})
const iconList = await WalletService.getIcon().then(res => {
    return res.data.iconWalletList
});

const initialState = {
    icons: iconList,
    currencies: currencyList,
    walletSelect: null,
    allWallet: [],
    iconSelect: iconList[0],
    currencySelect: null,
}

export const walletSlice = createSlice ({
    name:'wallet',
    initialState,
    reducers: {
        selectIcon: (state, action) => {
            state.iconSelect = action.payload
        },
        selectCurrency: (state, action) => {
            state.currencySelect = action.payload
        },
        setWalletSelect: (state, action) => {
            state.walletSelect = action.payload
        },
        getAllWallet:(state, action) => {
            state.allWallet =action.payload
        }
    }
})

export const { selectIcon, selectCurrency, setWalletSelect, getAllWallet } = walletSlice.actions;
export default walletSlice.reducer;

